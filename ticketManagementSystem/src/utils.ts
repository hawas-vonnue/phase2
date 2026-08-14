import { type Request } from "express";

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
        typeof req.body.name === "string" &&
        typeof req.body.email === "string"
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
    } = {};

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

    return whereClause;
}
