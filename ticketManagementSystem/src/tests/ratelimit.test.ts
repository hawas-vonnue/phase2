import request from "supertest";

const baseUrl = "http://localhost:8080";

let token: string;

beforeAll(async () => {
    const response = await request(baseUrl).post("/login").send({
        email: "admin@gmail.com",
        password: "default",
        type: "user",
    });
    token = response.body.token;
});

describe("security test", () => {
    test("rate limit of login", async () => {
        let status;
        // rate limit for login is 10
        // default admin user with admin@gmail.com
        for (let i = 0; i < 11; i++) {
            const result = await request(baseUrl).post("/login").send({
                email: "admin@gmail.com",
                password: "default",
                type: "user",
            });
            status = result.status;
        }

        expect(status).toBe(429);
    });

    test("rate limit of other endpoints", async () => {
        let status;
        for (let i = 0; i < 51; i++) {
            const result = await request(baseUrl)
                .get("/tickets")
                .set("Authorization", `Bearer ${token}`);
            status = result.status;
        }
        expect(status).toBe(429);
    });
});
