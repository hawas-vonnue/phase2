import request from "supertest";
// import { server } from "../server";
const server = "http://localhost:8080";
describe("Testing the api ", () => {
    test("get tasks", async () => {
        const response = await request(server).get("/tasks");
        expect(response.statusCode).toEqual(200);
    });
    test("delete id missing", async () => {
        const response = await request(server).delete("/tasks/101");
        expect(response.statusCode).toBe(404);
    });
    test("post task", async () => {
        const response = await request(server)
            .post("/tasks")
            .send({ description: "task added through post 33" });
        expect(response.body).toBe("Success");
    });
    test("get specific task", async () => {
        const response = await request(server).get("/tasks/1");
        expect(response.body.id).toBe(1);
    });
    test("patch", async () => {
        const response = await request(server)
            .patch("/tasks/1")
            .send({ description: "this is task updated" });
        expect(response.body).toBe("updated Successfully");
    });
    test("delete", async () => {
        const response = await request(server).delete("/tasks/1");
        expect(response.statusCode).toBe(200);
    });
});
