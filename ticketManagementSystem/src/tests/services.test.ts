import { prisma } from "../lib/prisma.js";
import {
    updateStatus,
    assign,
    createTicket,
    list,
    view,
    deleteTicket,
} from "../prismaData.js";

// run this file using
//NODE_OPTIONS="--experimental-vm-modules" npx dotenv -e .env jest tests/services.test.ts

afterAll(() => {
    prisma.$disconnect();
});

test("test to see if createTicket works", async () => {
    const ticketExample = {
        title: "title - service",
        description: "description service",
        priority: "Medium",
        status: "Pending",
        customerid: 1,
        categoryid: 1,
    };
    const ticket = await createTicket({
        title: "title - service",
        description: "description service",
        priority: "Medium",
        customerId: 1,
        categoryId: 1,
    });
    console.log(ticket);
    expect(ticket).toMatchObject(ticketExample);
});

test("test list", async () => {
    const ticket = await createTicket({
        title: "title - list",
        description: "description list",
        priority: "Medium",
        customerId: 1,
        categoryId: 1,
    });
    if (ticket !== false) {
        const result = await list();
        expect(result).toContainEqual(ticket);
    }
});

test("test view", async () => {
    const ticket = await createTicket({
        title: "title - view",
        description: "description view",
        priority: "Medium",
        customerId: 1,
        categoryId: 1,
    });
    if (ticket !== false) {
        const result = await view(ticket.ticketid);
        expect(result).toEqual(ticket);
    }
});

test("update status:", async () => {
    const ticket = await createTicket({
        title: "title - status",
        description: "description status",
        priority: "Medium",
        customerId: 1,
        categoryId: 1,
    });
    if (ticket !== false) {
        const result = await updateStatus(ticket.ticketid, "Completed");
        if (result !== false) expect(result.status).toBe("Completed");
    }
});

test("assign", async () => {
    const ticket = await createTicket({
        title: "title - assign",
        description: "description assign",
        priority: "Medium",
        customerId: 1,
        categoryId: 1,
    });
    if (ticket !== false) {
        const result = await assign(ticket.ticketid, 1);
        if (result !== false) expect(result.userid).toBe(1);
    }
});

test("delete", async () => {
    const ticket = await createTicket({
        title: "title - delete",
        description: "description delete",
        priority: "Medium",
        customerId: 1,
        categoryId: 1,
    });
    if (ticket !== false) {
        const result = await deleteTicket(ticket.ticketid);
        if (result !== false) expect(result).toEqual(ticket);
    }
});
