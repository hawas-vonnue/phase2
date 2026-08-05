import request from "supertest";
const baseUrl = "http://localhost:8080";
describe("Test endpoints", () => {
    let ticket;
    test("create", async () => {
        const response = await request(baseUrl).post("/tickets/create").send({
            title: "second Ticket",
            description: "This is the second ticket created.",
            priority: "Low",
        });
        ticket = response.body.ticket;
        expect(response.body.ticket.title).toBe("second Ticket");
    });
    test("list", async () => {
        const response = await request(baseUrl).get("/tickets");
        expect(response.body).toContainEqual(ticket);
    });
    test("view", async () => {
        const response = await request(baseUrl).get(`/tickets/${ticket.id}`);
        expect(response.body).toEqual(ticket);
    });
    test("update status", async () => {
        const response = await request(baseUrl)
            .patch(`/tickets/status/${ticket.id}`)
            .send({ newStatus: "Completed" });
        expect(response.body.ticket.status).toBe("Completed");
    });
    test("assign", async () => {
        const response = await request(baseUrl)
            .patch(`/tickets/assign/${ticket.id}`)
            .send({
            assignee: "Employee 2",
        });
        ticket = response.body.ticket;
        expect(response.body.ticket.assignee).toBe("Employee 2");
    });
    test("delete", async () => {
        const response = await request(baseUrl).delete(`/tickets/${ticket.id}`);
        expect(response.body.ticket).toEqual(ticket);
    });
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
    test("missing id in assign", async () => {
        const response = await request(baseUrl)
            .patch("/tickets/assign/10000000")
            .send({
            assignee: "Employee 2",
        });
        expect(response.status).toBe(404);
    });
});
