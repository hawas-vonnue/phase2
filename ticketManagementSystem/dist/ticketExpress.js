import express from "express";
// import {
//     createTicket,
//     list,
//     view,
//     updateStatus,
//     assign,
//     deleteTicket,
// } from "./fileManaging.js";
import { createTicket, list, view, updateStatus, assign, deleteTicket, createCustomer, createUser, createCategory, } from "./database.js";
import { isValidCustomerInput, isValidTaskInput, isValidUserInput, } from "./utils.js";
const app = express();
//to parse as json
app.use(express.json());
app.post("/tickets/create", createHandler);
app.get("/tickets", listHandler);
app.get("/tickets/:id", viewHandler);
app.patch("/tickets/status/:id", updateStatusHandler);
app.patch("/tickets/assign/:id", assignHandler);
app.delete("/tickets/:id", deleteHandler);
//additional handlers for db
app.post("/customers/create", createCustomerHandler);
app.post("/users/create", createUserHandler);
app.post("/categories/create", createCategoriesHandler);
//common handlers
app.use(notFoundHandler);
app.use(errorHandler);
app.listen(8080);
async function createHandler(req, res, next) {
    const body = req.body;
    if (isValidTaskInput(req)) {
        const ticket = await createTicket(body);
        if (ticket === false) {
            next("Creating ticket failed");
        }
        else
            res.status(200).json({ status: "Success", ticket });
    }
    else {
        //bad request
        res.status(400).send("Bad request");
    }
}
async function listHandler(req, res, next) {
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
    else
        res.status(200).json(tickets);
}
async function viewHandler(req, res, next) {
    const id = Number(req.params.id);
    const ticket = await view(id);
    if (ticket === false)
        next();
    else
        res.status(200).json(ticket);
}
async function updateStatusHandler(req, res, next) {
    const id = Number(req.params.id);
    if ("newStatus" in req.body && typeof req.body.newStatus === "string") {
        const ticket = await updateStatus(id, req.body.newStatus);
        if (ticket === false)
            next();
        else
            res.status(200).json({ status: "Success", ticket });
    }
    else {
        res.status(400).send("Bad Request");
    }
}
// uncomment to use this for file management
// async function assignHandler(req: Request, res: Response, next: NextFunction) {
//     const id = Number(req.params.id);
//     if ("assignee" in req.body && typeof req.body.assignee === "string") {
//         const ticket = await assign(id, req.body.assignee);
//         if (ticket === false) next();
//         res.status(200).json({ status: "Success", ticket });
//     } else res.status(400).send("Bad Request");
// }
// use this for database based - assignee is the userId so it is number
async function assignHandler(req, res, next) {
    const id = Number(req.params.id);
    if ("assignee" in req.body && typeof req.body.assignee === "number") {
        const ticket = await assign(id, req.body.assignee);
        if (ticket === false)
            next();
        else
            res.status(200).json({ status: "Success", ticket });
    }
    else
        res.status(400).send("Bad Request");
}
async function deleteHandler(req, res, next) {
    const id = Number(req.params.id);
    const ticket = await deleteTicket(id);
    // console.log(ticket);
    if (ticket === false) {
        next();
    }
    else {
        res.status(200).json({ status: "Success", ticket });
    }
}
async function createCustomerHandler(req, res, next) {
    if (isValidCustomerInput(req)) {
        const customer = await createCustomer(req.body);
        res.status(200).json({ status: "Success", customer });
    }
    else
        res.status(400).send("Bad Request");
}
async function createUserHandler(req, res, next) {
    if (isValidUserInput(req)) {
        const user = await createUser(req.body);
        res.status(200).json({ status: "Success", user });
    }
    else
        res.status(400).send("Bad Request");
}
async function createCategoriesHandler(req, res) {
    if ("category" in req.body && typeof req.body.category === "string") {
        const category = await createCategory(req.body.category);
        res.status(200).json({ status: "Success", category });
    }
    else
        res.status(400).send("Bad Request");
}
function notFoundHandler(req, res, next) {
    res.status(404).send("Not Found");
}
function errorHandler(err, req, res, next) {
    console.log(err);
    res.status(500).send(`${err}.Internal server error`);
}
