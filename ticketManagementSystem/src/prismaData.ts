import { prisma } from "./lib/prisma.js";
import { AuthenticatedUser, customerOrUser } from "./types.js";

export type Ticket = {
    id: number;
    title: string;
    description: string;
    priority: "High" | "Medium" | "Low";
    status: "Pending" | "Completed";
    categoryId: number;
    customerId: number;
};
type ticketInput = Omit<Ticket, "id" | "status">;

export async function createTicket(ticket: ticketInput) {
    try {
        const returnTicket = await prisma.tickets.create({
            data: {
                title: ticket.title,
                description: ticket.description,
                priority: ticket.priority,
                status: "Pending",
                customerid: ticket.customerId,
                categoryid: ticket.categoryId,
            },
        });

        return returnTicket;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function list(user: AuthenticatedUser) {
    try {
        let tickets;
        if (user.type === "customer")
            tickets = await prisma.tickets.findMany({
                where: { customerid: user.id },
            });
        else {
            if (user.role === "agent")
                tickets = await prisma.tickets.findMany({
                    include: {
                        assignments: true,
                    },
                    where: {
                        assignments: {
                            some: {
                                userid: user.id,
                            },
                        },
                    },
                });
            //user role admin
            else {
                tickets = await prisma.tickets.findMany();
            }
        }

        return tickets;
    } catch (error) {
        console.log(error);

        return false;
    }
}

export async function view(id: number) {
    try {
        const ticket = await prisma.tickets.findUnique({
            where: { ticketid: id },
        });
        if (ticket === null) return false;

        return ticket;
    } catch (error) {
        console.log(error);

        return false;
    }
}

export async function updateStatus(
    id: number,
    newStatus: "Pending" | "Completed"
) {
    try {
        const ticket = await prisma.tickets.update({
            where: { ticketid: id },
            data: { status: newStatus },
        });

        if (ticket === null) return false;

        return ticket;
    } catch (error) {
        console.log(error);

        return false;
    }
}

export async function assign(ticketId: number, userId: number) {
    try {
        const returnValue = await prisma.assignments.create({
            data: { ticketid: ticketId, userid: userId },
        });

        return returnValue;
    } catch (error) {
        console.log(error);

        return false;
    }
}

export async function deleteTicket(id: number) {
    try {
        const ticket = await prisma.tickets.delete({ where: { ticketid: id } });

        if (ticket === null) return false;

        return ticket;
    } catch (error) {
        console.log(error);

        return false;
    }
}

export async function createCustomer(customer: {
    name: string;
    email: string;
    password: string;
}) {
    try {
        const newCustomer = await prisma.customers.create({
            data: {
                name: customer.name,
                email: customer.email,
                password: customer.password,
            },
        });

        return newCustomer;
    } catch (error) {
        console.log(error);
        throw new Error("error in creating customer");
    }
}

export async function createUser(user: {
    name: string;
    email: string;
    password: string;
}) {
    try {
        const newUser = await prisma.users.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
                role: "USER",
            },
        });

        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error("Error in creating user");
    }
}

export async function createCategory(categoryName: string) {
    try {
        const category = await prisma.categories.create({
            data: { category: categoryName },
        });

        return category;
    } catch (error) {
        throw new Error("Error in creating category");
    }
}

export async function filterGET(
    whereClause: Object,
    page: number,
    pageSize: number,
    sortField: string,
    sortDirection: "asc" | "desc"
) {
    const tickets = await prisma.tickets.findMany({
        where: whereClause,
        orderBy: { [sortField]: sortDirection },
        take: pageSize,
        skip: (page - 1) * pageSize,
        include: { assignments: true },
    });

    const count = await prisma.tickets.count({
        where: whereClause,
    });

    return { count, tickets };
}

export async function getPassword(type: "user" | "customer", email: string) {
    let user;
    let mapped;
    if (type === "user") {
        user = await prisma.users.findUnique({
            where: { email: email },
        });
        if (user) mapped = map({ ...user, type: type });
    } else {
        user = await prisma.customers.findUnique({
            where: { email: email },
        });
        if (user) mapped = map({ ...user, type: type });
    }

    if (!user) return user;

    return mapped;
}

export function map(person: customerOrUser) {
    if (person.type === "customer")
        return {
            id: person.customerid,
            name: person.name,
            email: person.email,
            type: person.type,
            password: person.password,
        };
    else {
        return {
            id: person.userid,
            name: person.name,
            email: person.email,
            role: person.role,
            type: person.type,
            password: person.password,
        };
    }
}

export async function findUser(id: number) {
    const user = await prisma.users.findUnique({ where: { userid: id } });

    return user;
}

export async function getAssignedIds(id: number) {
    const userIds = await prisma.assignments.findMany({
        select: {
            userid: true,
        },
        where: { ticketid: id },
    });
    return userIds;
}

//-------------------------Test----------------------------

// await createTicket({
//     title: "title of new one",
//     description: "description of new",
//     priority: "High",
//     categoryId: 1,
//     customerId: 1,
// });

// await list();

// await view(12);

// await updateStatus(1, "Completed");

// await assign(1, 2);

// await deleteTicket(2);
