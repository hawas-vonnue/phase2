import request from "supertest";
import { assign, createTicket } from "../prismaData.js";
import { prisma } from "../lib/prisma.js";

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

let adminToken: string;
let agentToken: string;
let customerToken: string;
let agent1: { id: number };
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
beforeAll(async () => {
    //user(admin) with email admin@gmail.com and password default exists
    let result = await request(baseUrl).post("/login").send({
        email: "admin@gmail.com",
        password: "default",
        type: "user",
    });
    adminToken = result.body.token;

    //default customer values
    // customer1@gmail.com and customer2@gmail.com
    result = await request(baseUrl).post("/login").send({
        email: "customer1@gmail.com",
        password: "default",
        type: "customer",
    });
    customerToken = result.body.token;

    //default two user with agent role -
    // user1@gmail.com
    result = await request(baseUrl).post("/login").send({
        email: "user1@gmail.com",
        password: "default",
        type: "user",
    });
    agentToken = result.body.token;

    result = await request(baseUrl).post("/login").send({
        email: "customer1@gmail.com",
        password: "default",
        type: "customer",
    });
    customer1 = result.body.customer;

    result = await request(baseUrl).post("/login").send({
        email: "customer2@gmail.com",
        password: "default",
        type: "customer",
    });
    customer2 = result.body.customer;

    result = await request(baseUrl).post("/login").send({
        email: "user1@gmail.com",
        password: "default",
        type: "user",
    });
    agent1 = result.body.user;
});

describe("Test endpoints with admin access", () => {
    let ticket: Ticket;
    let newTicket: {
        ticketid: number;
        title: string;
        description: string;
        priority: "High" | "Medium" | "Low";
        status: "pending" | "completed";
        assignments?: any[];
    };

    beforeEach(async () => {
        const response = await request(baseUrl)
            .post("/tickets/create")
            .set("Authorization", `Bearer ${adminToken}`)
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
            .set("Authorization", `Bearer ${adminToken}`);
        expect(response.body.result).toContainEqual(newTicket);
    });

    test("view", async () => {
        const response = await request(baseUrl)
            .get(`/tickets/${ticket.ticketid}`)
            .set("Authorization", `Bearer ${adminToken}`);
        expect(response.body).toEqual(ticket);
    });

    test("update status", async () => {
        const response = await request(baseUrl)
            .patch(`/tickets/status/${ticket.ticketid}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send({ newStatus: "completed" });
        ticket = response.body.ticket;
        expect(ticket.status).toBe("completed");
    });

    test("assign", async () => {
        const response = await request(baseUrl)
            .post(`/tickets/assign/${ticket.ticketid}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                assignee: 2,
            });
        expect(response.body.ticket.userid).toBe(2);
    });

    // pagination and filtering
    test("testing enhanced get", async () => {
        await request(baseUrl)
            .patch(`/tickets/status/${ticket.ticketid}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send({ newStatus: "completed" });

        const assignmentResponse = await request(baseUrl)
            .post(`/tickets/assign/${ticket.ticketid}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                assignee: 2,
            });
        newTicket.assignments?.push(assignmentResponse.body.ticket);
        newTicket.status = "completed";
        const response = await request(baseUrl)
            .get("/tickets?status=completed&assignee=2&pageSize=100&page=1")
            .set("Authorization", `Bearer ${adminToken}`);
        expect(response.body.result).toContainEqual(newTicket);
    });

    test("delete", async () => {
        const response = await request(baseUrl)
            .delete(`/tickets/${ticket.ticketid}`)
            .set("Authorization", `Bearer ${adminToken}`);
        expect(response.body.ticket).toEqual(ticket);
    });

    // not found
    test("missing id in view", async () => {
        const response = await request(baseUrl)
            .get(`/tickets/100000000`)
            .set("Authorization", `Bearer ${adminToken}`);
        expect(response.status).toBe(404);
    });

    test("missing id in delete", async () => {
        const response = await request(baseUrl)
            .delete(`/tickets/100000000`)
            .set("Authorization", `Bearer ${adminToken}`);
        expect(response.status).toBe(404);
    });

    test("missing id in status update", async () => {
        const response = await request(baseUrl)
            .patch("/tickets/status/100000000")
            .set("Authorization", `Bearer ${adminToken}`)
            .send({ newStatus: "Completed" });

        expect(response.status).toBe(404);
    });

    // database error
    test("missing id in assign", async () => {
        const response = await request(baseUrl)
            .post("/tickets/assign/10000000")
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                assignee: 2,
            });
        expect(response.status).toBe(404);
    });

    //test validation
    test("validation", async () => {
        const response = await request(baseUrl)
            .get("/tickets?status=hello")
            .set("Authorization", `Bearer ${adminToken}`);
        expect(response.status).toBe(400);
    });
});
describe("checking access for customer", () => {
    let ticket1: {
        ticketid: number;
    };

    beforeEach(async () => {
        const response = await request(baseUrl)
            .post("/tickets/create")
            .set("Authorization", `Bearer ${customerToken}`)
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
        console.log("customer 1", customer1);
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
                .set("Authorization", `Bearer ${customerToken}`);
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
                .set("Authorization", `Bearer ${customerToken}`);
            expect(response.status).toBe(403);
        }
    });

    test("update status", async () => {
        const response = await request(baseUrl)
            .patch(`/tickets/status/${ticket1.ticketid}`)
            .set("Authorization", `Bearer ${customerToken}`)
            .send({ newStatus: "completed" });
        expect(response.status).toBe(403);
    });

    test("assign", async () => {
        const response = await request(baseUrl)
            .post(`/tickets/assign/${ticket1.ticketid}`)
            .set("Authorization", `Bearer ${customerToken}`)
            .send({
                assignee: 2,
            });
        expect(response.status).toBe(403);
    });
});

describe("checking access for agent", () => {
    let ticket: {
        ticketid: number;
    };

    beforeEach(async () => {
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
            .set("Authorization", `Bearer ${agentToken}`);
        expect(result.status).toBe(403);
    });

    test("agent can access assigned ticket", async () => {
        await assign(ticket.ticketid, agent1.id);
        const result = await request(baseUrl)
            .get(`/tickets/${ticket.ticketid}`)
            .set("Authorization", `Bearer ${agentToken}`);
        expect(result.status).toBe(200);
    });

    test("update status of not assigned", async () => {
        const response = await request(baseUrl)
            .patch(`/tickets/status/${ticket.ticketid}`)
            .set("Authorization", `Bearer ${agentToken}`)
            .send({ newStatus: "completed" });
        expect(response.status).toBe(403);
    });

    test("update status of assigned", async () => {
        await assign(ticket.ticketid, agent1.id);
        const response = await request(baseUrl)
            .patch(`/tickets/status/${ticket.ticketid}`)
            .set("Authorization", `Bearer ${agentToken}`)
            .send({ newStatus: "completed" });
        expect(response.status).toBe(200);
    });

    test("assign", async () => {
        const response = await request(baseUrl)
            .post(`/tickets/assign/${ticket.ticketid}`)
            .set("Authorization", `Bearer ${agentToken}`)
            .send({
                assignee: 2,
            });
        expect(response.status).toBe(403);
    });
});
