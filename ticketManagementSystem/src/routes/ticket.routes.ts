import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import {
    createHandler,
    enhanchedGetHandler,
    viewHandler,
    updateStatusHandler,
    assignHandler,
    deleteHandler,
} from "../ticketController.js";
// import debugModule from "debug";

// const debug = debugModule("ticketSupport:ticket");
export const ticketRouter = Router();

ticketRouter.use(authenticate);

ticketRouter.post(
    "/create",
    // (req, res, next) => {
    //     // debug(`create ticket request`);
    //     next();
    // },
    createHandler
);

//enhanced get tickets
ticketRouter.get(
    "/",
    // (req, res, next) => {
    //     // debug(`get tickets request`);
    //     next();
    // },
    enhanchedGetHandler
);

ticketRouter.get(
    "/:id",
    // (req, res, next) => {
    //     debug(`view ticket by id request`);
    //     next();
    // },
    viewHandler
);

ticketRouter.patch(
    "/status/:id",
    // (req, res, next) => {
    //     debug(`update status request`);
    //     next();
    // },
    updateStatusHandler
);

//patch for file managed and post for db and prisma
// ticketRouter.patch("/assign/:id", assignHandler);
ticketRouter.post(
    "/assign/:id",
    // (req, res, next) => {
    //     debug(`assign to a user request`);
    //     next();
    // },
    assignHandler
);

ticketRouter.delete(
    "/:id",
    // (req, res, next) => {
    //     debug(`delete ticket handler`);
    //     next();
    // },
    deleteHandler
);
