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

export const ticketRouter = Router();

ticketRouter.use(authenticate);

ticketRouter.post("/create", createHandler);

//enhanced get tickets
ticketRouter.get("/", enhanchedGetHandler);

ticketRouter.get("/:id", viewHandler);

ticketRouter.patch("/status/:id", updateStatusHandler);

//patch for file managed and post for db and prisma
// ticketRouter.patch("/assign/:id", assignHandler);
ticketRouter.post("/assign/:id", assignHandler);

ticketRouter.delete("/:id", deleteHandler);
