import express, { type Request, type Response, NextFunction } from "express";
import {
    createTicket,
    list,
    view,
    updateStatus,
    assign,
    deleteTicket,
} from "./fileManaging.js";

const app = express();

//to parse as json
app.use(express.json());

app.post("/tickets/create", createHandler);
app.get("/tickets", listHandler);
app.get("/tickets/:id", viewHandler);
app.patch("/tickets/status/:id", updateStatusHandler);
app.patch("/tickets/assign/:id", assignHandler);
app.delete("/tickets/:id", deleteHandler);

//common handlers
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(8080);

function isValidTaskInput(req: Request) {
    if (
        "title" in req.body &&
        "description" in req.body &&
        "priority" in req.body &&
        typeof req.body.title === "string" &&
        typeof req.body.description === "string" &&
        (req.body.priority === "High" ||
            req.body.priority === "Low" ||
            req.body.priority === "Medium")
    )
        return true;
    else false;
}

async function createHandler(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    if (isValidTaskInput(req)) {
        const ticket = await createTicket(body);
        if (ticket === false) {
            next("Creating ticket failed");
        }
        res.status(200).json({ status: "Success", ticket });
    } else {
        //bad request
        res.status(400).send("Bad request");
    }
}

async function listHandler(req: Request, res: Response, next: NextFunction) {
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

    res.status(200).json(tickets);
}

async function viewHandler(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    const ticket = await view(id);
    if (ticket === false) next();

    res.status(200).json(ticket);
}

async function updateStatusHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const id = Number(req.params.id);
    if ("newStatus" in req.body && typeof req.body.newStatus === "string") {
        const ticket = await updateStatus(id, req.body.newStatus);
        if (ticket === false) next();

        res.status(200).json({ status: "Success", ticket });
    } else {
        res.status(400).send("Bad Request");
    }
}

async function assignHandler(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    if ("assignee" in req.body && typeof req.body.assignee === "string") {
        const ticket = await assign(id, req.body.assignee);
        if (ticket === false) next();

        res.status(200).json({ status: "Success", ticket });
    } else res.status(400).send("Bad Request");
}

async function deleteHandler(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    const ticket = await deleteTicket(id);
    if (ticket === false) next();
    res.send(200).json({ status: "Success", ticket });
}

function notFoundHandler(req: Request, res: Response, next: NextFunction) {
    res.status(404).send("Not Found");
}

function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(err);
    res.status(500).send(`${err}.Internal server error`);
}
