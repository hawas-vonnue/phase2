import request from "supertest";

type Ticket = {
    ticketid: number;
    title: string;
    description: string;
    priority: "High" | "Medium" | "Low";
    status: "pending" | "completed";
    assignments?: [];
};
const baseUrl = "http://localhost:8080";

describe("Test endpoints", () => {
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
        const response = await request(baseUrl).post("/tickets/create").send({
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
        const response = await request(baseUrl).get("/tickets?pageSize=100");
        expect(response.body.result).toContainEqual(newTicket);
    });

    test("view", async () => {
        const response = await request(baseUrl).get(
            `/tickets/${ticket.ticketid}`
        );
        expect(response.body).toEqual(ticket);
    });

    test("update status", async () => {
        const response = await request(baseUrl)
            .patch(`/tickets/status/${ticket.ticketid}`)
            .send({ newStatus: "completed" });
        ticket = response.body.ticket;
        expect(ticket.status).toBe("completed");
    });

    test("assign", async () => {
        const response = await request(baseUrl)
            .post(`/tickets/assign/${ticket.ticketid}`)
            .send({
                assignee: 2,
            });
        expect(response.body.ticket.userid).toBe(2);
    });

    // pagination and filtering
    test("testing enhanced get", async () => {
        await request(baseUrl)
            .patch(`/tickets/status/${ticket.ticketid}`)
            .send({ newStatus: "completed" });
        const assignmentResponse = await request(baseUrl)
            .post(`/tickets/assign/${ticket.ticketid}`)
            .send({
                assignee: 2,
            });
        newTicket.assignments?.push(assignmentResponse.body.ticket);
        newTicket.status = "completed";
        const response = await request(baseUrl).get(
            "/tickets?status=completed&assignee=2&pageSize=100&page=1"
        );
        expect(response.body.result).toContainEqual(newTicket);
    });

    test("delete", async () => {
        const response = await request(baseUrl).delete(
            `/tickets/${ticket.ticketid}`
        );
        expect(response.body.ticket).toEqual(ticket);
    });

    // not found
    test("missing id in view", async () => {
        const response = await request(baseUrl).get(`/tickets/100000000`);
        expect(response.status).toBe(404);
    });

    test("missing id in delete", async () => {
        const response = await request(baseUrl).delete(`/tickets/100000000`);
        expect(response.status).toBe(404);
    });

    test("missing id in status update", async () => {
        const response = await request(baseUrl)
            .patch("/tickets/status/100000000")
            .send({ newStatus: "Completed" });

        expect(response.status).toBe(404);
    });

    // database error
    test("missing id in assign", async () => {
        const response = await request(baseUrl)
            .post("/tickets/assign/10000000")
            .send({
                assignee: 2,
            });
        expect(response.status).toBe(404);
    });

    //test validation
    test("validation", async () => {
        const response = await request(baseUrl).get("/tickets?status=hello");
        expect(response.status).toBe(400);
    });
});
