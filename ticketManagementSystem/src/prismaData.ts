import { prisma } from "./lib/prisma";

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

export async function list() {
    try {
        const tickets = await prisma.tickets.findMany();

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
}) {
    try {
        const newCustomer = await prisma.customers.create({
            data: { name: customer.name, email: customer.email },
        });

        return newCustomer;
    } catch (error) {
        throw new Error("error in creating customer");
    }
}

export async function createUser(user: { name: string; email: string }) {
    try {
        const newUser = await prisma.users.create({
            data: { name: user.name, email: user.email },
        });

        return newUser;
    } catch (error) {
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

//-------------------------Test----------------------------

// await createTicket({
//     title: "title of new",
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
