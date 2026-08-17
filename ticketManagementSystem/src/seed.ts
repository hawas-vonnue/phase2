import { prisma } from "./lib/prisma.js";

export async function seedDB() {
    await prisma.categories.createMany({
        data: [{ category: "category 1" }, { category: "Category 2" }],
    });

    await prisma.customers.createMany({
        data: [
            { name: "customer 1", email: "email1@gmail.com" },
            { name: "customer 2", email: "email2@gmail.com" },
        ],
    });

    await prisma.tickets.createMany({
        data: [
            {
                title: "title 1",
                description: "description 1",
                priority: "High",
                status: "pending",
                customerid: 1,
                categoryid: 1,
            },
            {
                title: "title 2",
                description: "description 2",
                priority: "Low",
                status: "pending",
                customerid: 1,
                categoryid: 2,
            },
            {
                title: "title 3",
                description: "description 3",
                priority: "Low",
                status: "pending",
                customerid: 2,
                categoryid: 1,
            },
            {
                title: "title 4",
                description: "description 4",
                priority: "Medium",
                status: "pending",
                customerid: 2,
                categoryid: 1,
            },
            {
                title: "title 5",
                description: "description 5",
                priority: "Low",
                status: "pending",
                customerid: 2,
                categoryid: 2,
            },
            {
                title: "title 6",
                description: "description 6",
                priority: "Low",
                status: "pending",
                customerid: 2,
                categoryid: 1,
            },
            {
                title: "title 7",
                description: "description 7",
                priority: "High",
                status: "pending",
                customerid: 2,
                categoryid: 1,
            },
            {
                title: "title 8",
                description: "description 8",
                priority: "Medium",
                status: "pending",
                customerid: 2,
                categoryid: 1,
            },
            {
                title: "title 9",
                description: "description 9",
                priority: "Low",
                status: "pending",
                customerid: 2,
                categoryid: 1,
            },
            {
                title: "title 10",
                description: "description 10",
                priority: "Low",
                status: "pending",
                customerid: 2,
                categoryid: 1,
            },
            {
                title: "title 11",
                description: "description 11",
                priority: "High",
                status: "pending",
                customerid: 1,
                categoryid: 1,
            },
            {
                title: "title 12",
                description: "description 12",
                priority: "Medium",
                status: "pending",
                customerid: 2,
                categoryid: 1,
            },
            {
                title: "title 13",
                description: "description 13",
                priority: "Low",
                status: "pending",
                customerid: 2,
                categoryid: 1,
            },
            {
                title: "title 14",
                description: "description 14",
                priority: "High",
                status: "pending",
                customerid: 2,
                categoryid: 1,
            },
        ],
    });

    await prisma.users.createMany({
        data: [
            { name: "user 1", email: "user1@gmail.com" },
            { name: "user 2", email: "user2@gmail.com" },
            { name: "user 3", email: "user3@gmail.com" },
        ],
    });

    await prisma.comments.createMany({
        data: [
            { ticketid: 1, text: "This is comment on ticket 1" },
            { ticketid: 1, text: "This is comment on ticket 2" },
        ],
    });

    await prisma.assignments.createMany({
        data: [
            {
                ticketid: 1,
                userid: 1,
            },
            {
                ticketid: 1,
                userid: 2,
            },
            {
                ticketid: 2,
                userid: 3,
            },
        ],
    });

    await prisma.status_history.createMany({
        data: [
            {
                ticketid: 1,
                currentstatus: "Completed",
                previousstatus: "Pending",
                updatedby: 2,
            },
        ],
    });

    await prisma.$disconnect();
}

if (process.env.NODE_ENV !== "test") {
    await seedDB();
}
