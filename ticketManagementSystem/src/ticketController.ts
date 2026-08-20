import express, { type Request, type Response, NextFunction } from "express";
import bcrypt from "bcrypt";

// for file based
// import {
//     createTicket,
//     list,
//     view,
//     updateStatus,
//     assign,
//     deleteTicket,
// } from "./fileManaging.js";

// for db based
// import {
//     createTicket,
//     list,
//     view,
//     updateStatus,
//     assign,
//     deleteTicket,
//     createCustomer,
//     createUser,
//     createCategory,
// } from "./database.js";

//for prisma based
import {
    createTicket,
    list,
    view,
    updateStatus,
    assign,
    deleteTicket,
    createCustomer,
    createUser,
    createCategory,
    filterGET,
    getPassword,
} from "./prismaData.js";

import {
    isValidCustomerInput,
    isValidTaskInput,
    isValidUserInput,
    isValidQueryParameters,
    createWhereClause,
    createJwtToken,
} from "./utils.js";
import { emit } from "node:cluster";

export async function createHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const body = req.body;
    if (isValidTaskInput(req)) {
        const ticket = await createTicket(body);
        if (ticket === false) {
            next("Creating ticket failed");
        } else res.status(200).json({ status: "Success", ticket });
    } else {
        //bad request
        res.status(400).send("Bad request");
    }
}

export async function listHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const tickets = await list();
    if (tickets === false) {
        next("Couldnt read from file");
    }

    //if no tickets string is needed
    //  else {
    //     if (tickets.length === 0) {
    //         res.status(200).json("No Tickets")
    //     }
    // }
    else res.status(200).json(tickets);
}

export async function viewHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const id = Number(req.params.id);
    const ticket = await view(id);
    if (ticket === false) next();
    else res.status(200).json(ticket);
}

export async function updateStatusHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const id = Number(req.params.id);
    if ("newStatus" in req.body && typeof req.body.newStatus === "string") {
        const ticket = await updateStatus(id, req.body.newStatus);
        if (ticket === false) next();
        else res.status(200).json({ status: "Success", ticket });
    } else {
        res.status(400).send("Bad Request");
    }
}

// uncomment to use this for file management
//export async function assignHandler(req: Request, res: Response, next: NextFunction) {
//     const id = Number(req.params.id);
//     if ("assignee" in req.body && typeof req.body.assignee === "string") {
//         const ticket = await assign(id, req.body.assignee);
//         if (ticket === false) next();

//         res.status(200).json({ status: "Success", ticket });
//     } else res.status(400).send("Bad Request");
// }

// use this for database based - assignee is the userId so it is number
export async function assignHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const id = Number(req.params.id);
    if ("assignee" in req.body && typeof req.body.assignee === "number") {
        const ticket = await assign(id, req.body.assignee);
        if (ticket === false) next();
        else res.status(200).json({ status: "Success", ticket });
    } else res.status(400).send("Bad Request");
}

export async function deleteHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const id = Number(req.params.id);
    const ticket = await deleteTicket(id);
    if (ticket === false) {
        next();
    } else {
        res.status(200).json({ status: "Success", ticket });
    }
}

export async function createCustomerHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (isValidCustomerInput(req)) {
        const password = await bcrypt.hash(req.body.password, 10);
        const customer = await createCustomer({
            name: req.body.name,
            email: req.body.email,
            password,
        });

        res.status(200).json({
            status: "Success",
            customer: {
                name: customer.name,
                email: customer.email,
                id: customer.customerid,
            },
        });
    } else res.status(400).send("Bad Request");
}

export async function createUserHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (isValidUserInput(req)) {
        const password = await bcrypt.hash(req.body.password, 10);
        const user = await createUser({
            name: req.body.name,
            email: req.body.email,
            password,
        });

        res.status(200).json({
            status: "Success",
            user: { name: user.name, email: user.email, userid: user.userid },
        });
    } else res.status(400).send("Bad Request");
}

export async function createCategoriesHandler(req: Request, res: Response) {
    if ("category" in req.body && typeof req.body.category === "string") {
        const category = await createCategory(req.body.category);

        res.status(200).json({ status: "Success", category });
    } else res.status(400).send("Bad Request");
}

export async function enhanchedGetHandler(req: Request, res: Response) {
    const maxPageSize = 100;

    const page = Number(req.query.page) || 1;
    let pageSize = Number(req.query.pageSize) || 10;
    let sortField: string;

    if (req.query.sortField) sortField = String(req.query.sortField);
    else sortField = "ticketid";

    const sortDirectionRecieved = String(req.query.sortDirection);
    let sortDirection: "asc" | "desc";

    if (
        !(sortDirectionRecieved === "asc" || sortDirectionRecieved === "desc")
    ) {
        //apply default sortDirection
        sortDirection = "asc";
    } else sortDirection = sortDirectionRecieved;

    if (!isValidQueryParameters(sortField, req))
        res.status(400).send("Bad Request");
    else {
        const whereClause = createWhereClause(req);

        if (pageSize > maxPageSize) pageSize = maxPageSize;

        const result = await filterGET(
            whereClause,
            page,
            pageSize,
            sortField,
            sortDirection
        );
        const response = {
            pageMetadata: {
                count: result.count,
                page,
                pageSize,
                totalPages: Math.ceil(result.count / pageSize),
            },
            result: result.tickets,
        };

        res.status(200).json(response);
    }
}

export async function loginHandler(req: Request, res: Response) {
    const validInput =
        "email" in req.body &&
        "password" in req.body &&
        "type" in req.body &&
        typeof req.body.email === "string" &&
        typeof req.body.password === "string" &&
        typeof req.body.type === "string";

    if (validInput) {
        const inputPassword = req.body.password;
        const user = await getPassword(req.body.type, req.body.email);
        if (user === null || user === undefined)
            return res.status(403).send("Account doesnt exit");
        const storedHashPassword = user.password;
        const result = await bcrypt.compare(inputPassword, storedHashPassword);
        if (result) {
            const { password, ...userWithoutPass } = user;
            let token = createJwtToken(userWithoutPass);
            return res.status(200).json({
                status: "Success",
                token: token,
                [req.body.type]: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                },
            });
        }
        return res
            .status(403)
            .json({ status: "Fail", message: "Invalid email or Password" });
    }
    res.status(400).send("Bad Request");
}

export async function getUserHandler(req: Request, res: Response) {
    res.status(200).json(req.user);
}

export function notFoundHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    res.status(404).send("Not Found");
}

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(err);

    res.status(500).send(`${err}.Internal server error`);
}
