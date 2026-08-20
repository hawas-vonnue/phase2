import request from "supertest";
import { assign, createTicket } from "../prismaData.js";
import { prisma } from "../lib/prisma.js";
import { view } from "../database.js";
import { createJwtToken } from "../utils.js";

type Ticket = {
    ticketid: number;
    title: string;
    description: string;
    priority: "High" | "Medium" | "Low";
    status: "pending" | "completed";
    assignments?: [];
};
const baseUrl = "http://localhost:8080";

afterAll(() => {
    prisma.$disconnect();
});

describe("Test endpoints with admin access", () => {
    let ticket: Ticket;
    let token: string;

    let newTicket: {
        ticketid: number;
        title: string;
        description: string;
        priority: "High" | "Medium" | "Low";
        status: "pending" | "completed";
        assignments?: any[];
    };
    beforeEach(async () => {
        //user(admin) with email admin@gmail.com and password default exists
        const result = await request(baseUrl).post("/users/login").send({
            email: "admin@gmail.com",
            password: "default",
            type: "user",
        });
        token = result.body.token;
        const response = await request(baseUrl)
            .post("/tickets/create")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "second Ticket",
                description: "This is the second ticket created.",
                priority: "Low",
                categoryId: 1,
                customerId: 1,
            });
        ticket = response.body.ticket;
        newTicket = structuredClone(ticket);
        newTicket.assignments = [];
    });

    test("list", async () => {
        const response = await request(baseUrl)
            .get("/tickets?pageSize=100")
            .set("Authorization", `Bearer ${token}`);
        expect(response.body.result).toContainEqual(newTicket);
    });

    test("view", async () => {
        const response = await request(baseUrl)
            .get(`/tickets/${ticket.ticketid}`)
            .set("Authorization", `Bearer ${token}`);
        expect(response.body).toEqual(ticket);
    });

    test("update status", async () => {
        const response = await request(baseUrl)
            .patch(`/tickets/status/${ticket.ticketid}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ newStatus: "completed" });
        ticket = response.body.ticket;
        expect(ticket.status).toBe("completed");
    });

    test("assign", async () => {
        const response = await request(baseUrl)
            .post(`/tickets/assign/${ticket.ticketid}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                assignee: 2,
            });
        expect(response.body.ticket.userid).toBe(2);
    });

    // pagination and filtering
    test("testing enhanced get", async () => {
        await request(baseUrl)
            .patch(`/tickets/status/${ticket.ticketid}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ newStatus: "completed" });
        const assignmentResponse = await request(baseUrl)
            .post(`/tickets/assign/${ticket.ticketid}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                assignee: 2,
            });
        newTicket.assignments?.push(assignmentResponse.body.ticket);
        newTicket.status = "completed";
        const response = await request(baseUrl)
            .get("/tickets?status=completed&assignee=2&pageSize=100&page=1")
            .set("Authorization", `Bearer ${token}`);
        expect(response.body.result).toContainEqual(newTicket);
    });

    test("delete", async () => {
        const response = await request(baseUrl)
            .delete(`/tickets/${ticket.ticketid}`)
            .set("Authorization", `Bearer ${token}`);
        expect(response.body.ticket).toEqual(ticket);
    });

    // not found
    test("missing id in view", async () => {
        const response = await request(baseUrl)
            .get(`/tickets/100000000`)
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(404);
    });

    test("missing id in delete", async () => {
        const response = await request(baseUrl)
            .delete(`/tickets/100000000`)
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(404);
    });

    test("missing id in status update", async () => {
        const response = await request(baseUrl)
            .patch("/tickets/status/100000000")
            .set("Authorization", `Bearer ${token}`)
            .send({ newStatus: "Completed" });

        expect(response.status).toBe(404);
    });

    // database error
    test("missing id in assign", async () => {
        const response = await request(baseUrl)
            .post("/tickets/assign/10000000")
            .set("Authorization", `Bearer ${token}`)
            .send({
                assignee: 2,
            });
        expect(response.status).toBe(404);
    });

    //test validation
    test("validation", async () => {
        const response = await request(baseUrl)
            .get("/tickets?status=hello")
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(400);
    });
});
describe("checking access for customer", () => {
    let token: string;
    let customer1: {
        id: number;
        email: string;
        name: string;
    };
    let customer2: {
        id: number;
        email: string;
        name: string;
    };
    let ticket1: {
        ticketid: number;
    };

    //default customer values
    // customer1@gmail.com and customer2@gmail.com
    beforeEach(async () => {
        const result = await request(baseUrl).post("/users/login").send({
            email: "customer1@gmail.com",
            password: "default",
            type: "customer",
        });
        token = result.body.token;
        customer1 = result.body.customer;
        const result2 = await request(baseUrl).post("/users/login").send({
            email: "customer2@gmail.com",
            password: "default",
            type: "customer",
        });
        customer2 = result2.body.customer;

        const response = await request(baseUrl)
            .post("/tickets/create")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "second Ticket",
                description: "This is the ticket created.",
                priority: "Low",
                categoryId: 1,
                customerId: 1,
            });
        ticket1 = response.body.ticket;
    });
    test("can view created ticket", async () => {
        const ticket = await createTicket({
            title: "Title of customer",
            description: "customer created this ticket",
            priority: "High",
            categoryId: 1,
            customerId: customer1.id,
        });
        if (ticket !== false) {
            const viewedTicket = await request(baseUrl)
                .get(`/tickets/${ticket.ticketid}`)
                .set("Authorization", `Bearer ${token}`);
            viewedTicket.body.created_at = new Date(
                viewedTicket.body.created_at
            );
            expect(viewedTicket.body).toMatchObject(ticket);
        }
    });
    test("cannot view task created by other user", async () => {
        const ticket = await createTicket({
            title: "Title of customer",
            description: "customer created this ticket",
            priority: "High",
            categoryId: 1,
            customerId: customer2.id,
        });
        if (ticket !== false) {
            const response = await request(baseUrl)
                .get(`/tickets/${ticket.ticketid}`)
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(403);
        }
    });

    test("update status", async () => {
        const response = await request(baseUrl)
            .patch(`/tickets/status/${ticket1.ticketid}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ newStatus: "completed" });
        expect(response.status).toBe(403);
    });

    test("assign", async () => {
        const response = await request(baseUrl)
            .post(`/tickets/assign/${ticket1.ticketid}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                assignee: 2,
            });
        expect(response.status).toBe(403);
    });
});

describe("checking access for agent", () => {
    let agent1: { id: number }, agent2;
    let token: string,
        ticket: {
            ticketid: number;
        };
    //default two user with agent role -
    // user1@gmail.com
    //user2@gmail.com
    beforeEach(async () => {
        const result = await request(baseUrl).post("/users/login").send({
            email: "user1@gmail.com",
            password: "default",
            type: "user",
        });
        token = result.body.token;
        agent1 = result.body.user;
        const response = await createTicket({
            title: "Title of customer",
            description: "customer created this ticket",
            priority: "High",
            categoryId: 1,
            customerId: 1,
        });
        if (response !== false) ticket = response;
    });
    test("agent cant access a ticket without getting assigned to it", async () => {
        const result = await request(baseUrl)
            .get(`/tickets/${ticket.ticketid}`)
            .set("Authorization", `Bearer ${token}`);
        expect(result.status).toBe(403);
    });
    test("agent can access assigned ticket", async () => {
        await assign(ticket.ticketid, agent1.id);
        const result = await request(baseUrl)
            .get(`/tickets/${ticket.ticketid}`)
            .set("Authorization", `Bearer ${token}`);
        expect(result.status).toBe(200);
    });

    test("update status of not assigned", async () => {
        const response = await request(baseUrl)
            .patch(`/tickets/status/${ticket.ticketid}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ newStatus: "completed" });
        expect(response.status).toBe(403);
    });

    test("update status of assigned", async () => {
        await assign(ticket.ticketid, agent1.id);
        const response = await request(baseUrl)
            .patch(`/tickets/status/${ticket.ticketid}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ newStatus: "completed" });
        expect(response.status).toBe(200);
    });

    test("assign", async () => {
        const response = await request(baseUrl)
            .post(`/tickets/assign/${ticket.ticketid}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                assignee: 2,
            });
        expect(response.status).toBe(403);
    });
});
