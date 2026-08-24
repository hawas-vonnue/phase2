import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { createCategoriesHandler } from "../ticketController.js";
// import debugModule from "debug";

export const categoryRouter = Router();
// const debug = debugModule("ticketSupport:categories");

categoryRouter.use(authenticate);
categoryRouter.post(
    "/create",
    // (req, res, next) => {
    //     // debug(`create category request`);
    //     next();
    // },
    createCategoriesHandler
);
