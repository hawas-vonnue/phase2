import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { createCategoriesHandler } from "../ticketController.js";

export const categoryRouter = Router();

categoryRouter.use(authenticate);
categoryRouter.post("/create", createCategoriesHandler);
