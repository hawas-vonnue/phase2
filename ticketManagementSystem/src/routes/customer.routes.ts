import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { createCustomerHandler } from "../ticketController.js";

export const customerRouter = Router();

customerRouter.post("/register", createCustomerHandler);
