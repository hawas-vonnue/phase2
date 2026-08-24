import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { createCustomerHandler } from "../ticketController.js";
// import debugModule from "debug";

// const debug = debugModule("ticketSupport:customer");
export const customerRouter = Router();

customerRouter.post(
    "/register",
    // (req, res, next) => {
    //     debug(`Customer registeration request`);
    //     next();
    // },
    createCustomerHandler
);
