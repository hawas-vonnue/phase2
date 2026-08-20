import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { createUserHandler, getUserHandler } from "../ticketController.js";

export const userRouter = Router();

userRouter.use(authenticate);
userRouter.post("/register", createUserHandler);
userRouter.get("/", getUserHandler);
