import express, { Request, NextFunction } from "express";
import {
    notFoundHandler,
    errorHandler,
    loginHandler,
    largeSizeHandler,
} from "./ticketController.js";
import { ticketRouter } from "./routes/ticket.routes.js";
import { categoryRouter } from "./routes/categories.routes.js";
import { customerRouter } from "./routes/customer.routes.js";
import { userRouter } from "./routes/users.routes.js";
import hpp from "hpp";
import qs from "qs";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
declare global {
    namespace Express {
        interface Request {
            sanitizedQuery: qs.ParsedQs;
        }
    }
}
const limiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 50,
});

const loginLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 10,
});

const app = express();
app.use(cors());
app.use(helmet());

//to parse as json
app.use(express.json({ limit: "1kb" }), largeSizeHandler);

app.use((req, res, next) => {
    const queryCopy = qs.parse(qs.stringify(req.query));
    const dummyReq = { query: queryCopy } as Request;

    hpp()(dummyReq, res, () => {
        req.sanitizedQuery = dummyReq.query;
        next();
    });
});

app.post("/login", loginLimiter, loginHandler);

app.use("/tickets", limiter, ticketRouter);
app.use("/categories", limiter, categoryRouter);
app.use("/users", limiter, userRouter);
app.use("/customers", limiter, customerRouter);

//common handlers
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(8080);
