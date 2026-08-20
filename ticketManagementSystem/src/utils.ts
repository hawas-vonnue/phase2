import { type Request } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AuthenticatedUser, Ticket } from "./types.js";
import { getAssignedIds } from "./prismaData.js";
dotenv.config();

// for file based
// function isValidTaskInput(req: Request) {
//     if (
//         "title" in req.body &&
//         "description" in req.body &&
//         "priority" in req.body &&
//         typeof req.body.title === "string" &&
//         typeof req.body.description === "string" &&
//         (req.body.priority === "High" ||
//             req.body.priority === "Low" ||
//             req.body.priority === "Medium")
//     )
//         return true;
//     else false;
// }

// for db based
export function isValidTaskInput(req: Request) {
    if (
        "title" in req.body &&
        "description" in req.body &&
        "priority" in req.body &&
        "customerId" in req.body &&
        "categoryId" in req.body &&
        typeof req.body.title === "string" &&
        typeof req.body.description === "string" &&
        (req.body.priority === "High" ||
            req.body.priority === "Low" ||
            req.body.priority === "Medium") &&
        typeof req.body.customerId === "number" &&
        typeof req.body.categoryId === "number"
    )
        return true;
    else false;
}

export function isValidCustomerInput(req: Request) {
    if (
        "name" in req.body &&
        "email" in req.body &&
        typeof req.body.name === "string" &&
        typeof req.body.email === "string"
    )
        return true;
    else return false;
}

export function isValidUserInput(req: Request) {
    if (
        "name" in req.body &&
        "email" in req.body &&
        "password" in req.body &&
        typeof req.body.name === "string" &&
        typeof req.body.email === "string" &&
        typeof req.body.password === "string"
    )
        return true;
    else return false;
}

function isValidField(sortField: string) {
    if (!sortField) return false;
    const sortableFields = [
        "ticketid",
        "title",
        "priority",
        "status",
        "customerid",
        "categoryid",
        "created_at",
    ];
    if (sortableFields.includes(sortField)) return true;
    else return false;
}

function isValidPriority(priority: any) {
    //no prioriy mentioned
    if (!priority) return true;

    const priorities = ["High", "Medium", "Low"];

    priority = String(priority);
    if (priorities.includes(priority)) return true;
    else false;
}

function isValidStatus(status: any) {
    // no status mentioned is valid input
    if (!status) return true;

    const statuses = ["pending", "completed"];

    status = String(status);
    if (statuses.includes(status)) return true;
    else return false;
}

export function isValidQueryParameters(sortField: string, req: Request) {
    if (
        isValidField(sortField) &&
        isValidPriority(req.query.priority) &&
        isValidStatus(req.query.status)
    ) {
        return true;
    }

    return false;
}

export function createWhereClause(req: Request) {
    const whereClause: {
        status?: string;
        priority?: string;
        assignments?: object;
        title?: object;
        customerid?: number;
    } = {};

    const user = req.user;
    if (user!.type === "customer") whereClause.customerid = user?.id;
    if (req.query.status) whereClause.status = String(req.query.status);
    if (req.query.priority) whereClause.priority = String(req.query.priority);
    if (req.query.assignee)
        whereClause.assignments = {
            some: { userid: Number(req.query.assignee) },
        };
    if (req.query.search)
        whereClause.title = {
            contains: String(req.query.search),
            mode: "insensitive",
        };

    if (user!.type === "user" && user!.role === "agent")
        whereClause.assignments = {
            some: { userid: Number(user!.id) },
        };

    return whereClause;
}

export function createJwtToken(user: {
    id: number;
    name: string;
    email: string;
    type: string;
    role?: string;
}) {
    const JWT_SECRET: string = process.env.JWT_SECRET || "secret";
    const JWT_EXPIRY: number = Number(process.env.JWT_EXPIRTY) || 60 * 60;

    console.log(JWT_SECRET);
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRY });

    return token;
}

export function mapToUser(user: {
    id: number;
    name: string;
    email: string;
    type: string;
    role?: string;
}) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        type: user.type,
    };
}

export async function canView(user: AuthenticatedUser, ticket: Ticket | false) {
    if (ticket === false) return;

    if (user.type === "customer")
        return user.id === ticket.customerid ? true : false;
    if (user.role === "admin") return true;
    const assigned = await getAssignedIds(ticket.ticketid);
    for (let assignedId of assigned) {
        if (assignedId.userid === user.id) return true;
    }

    return false;
}

export function canCreateTicket(user: AuthenticatedUser) {
    if (user.type === "customer") return true;
    return false;
}

export async function canUpdate(
    user: AuthenticatedUser,
    ticket: Ticket | false
) {
    if (ticket === false) return;

    if (user.type === "customer") return false;
    if (user.role === "admin") return true;
    const assigned = await getAssignedIds(ticket.ticketid);
    for (let assignedId of assigned) {
        if (assignedId.userid === user.id) return true;
    }
    return false;
}

export function isAdmin(user: AuthenticatedUser) {
    if (user.type === "user" && user.role === "admin") return true;
    return false;
}
