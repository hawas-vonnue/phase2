import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { createUserHandler, getUserHandler } from "../ticketController.js";
// import debugModule from "debug";

// const debug = debugModule("ticketSupport:users");
export const userRouter = Router();

userRouter.use(authenticate);
userRouter.post(
    "/register",
    // (req, res, next) => {
    //     debug(`create user request`);
    //     next();
    // },
    createUserHandler
);
userRouter.get(
    "/",
    // (req, res, next) => {
    //     debug(`get user request`);
    //     next();
    // },
    getUserHandler
);
