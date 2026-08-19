import express from "express";
import {
    notFoundHandler,
    errorHandler,
    loginHandler,
} from "./ticketController.js";
import { ticketRouter } from "./routes/ticket.routes.js";
import { categoryRouter } from "./routes/categories.routes.js";
import { customerRouter } from "./routes/customer.routes.js";
import { userRouter } from "./routes/users.routes.js";

const app = express();

//to parse as json
app.use(express.json());

app.post("/users/login", loginHandler);

app.use("/tickets", ticketRouter);
app.use("/categories", categoryRouter);
app.use("/users", userRouter);
app.use("/customers", customerRouter);

//common handlers
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(8080);
