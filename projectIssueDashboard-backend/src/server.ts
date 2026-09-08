import express, {
    type Express,
    type NextFunction,
    type Request,
    type Response,
} from "express";
import cors from "cors";
import { loginHandler, userHandler } from "./controllers/user.controller.ts";
import { issueRouter } from "./routes/issues.routes.ts";
import { projectRouter } from "./routes/projects.routes.ts";
import { authenticate } from "./middleware/auth.ts";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/issues", issueRouter);
app.use("/projects", projectRouter);

app.get("/user", authenticate, userHandler);
app.post("/login", loginHandler);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    res.status(500).send("Internal server error");
});

app.listen(3000);
