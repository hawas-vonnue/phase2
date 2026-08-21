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

describe("test query parameter is validated", () => {
    test("two values for same query parameter", async () => {
        const result = await request(baseUrl)
            .get("/tickets/?page=2&page=3")
            .set("authorization", `Bearer ${token}`);
        expect(result.body.pageMetadata.page).toBe(3);
    });
});

describe("test size limiter", () => {
    test("size limit of json body", async () => {
        const largeString = "string".repeat(3000);
        const data = {
            email: "test@gmail.com",
            password: "test",
            extra: largeString,
        };

        const response = await request(baseUrl)
            .post("/login")
            .set("Authorization", `Bearer ${token}`)
            .send(data);

        expect(response.status).toBe(413);
    });
});
