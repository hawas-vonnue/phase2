import express, {
    type Express,
    type NextFunction,
    type Request,
    type Response,
} from "express";
// import { issueList } from "./data/issueList.ts";
// import { projectList } from "./data/projectList.ts";
import cors from "cors";
import { createIssue, getIssue, getIssues } from "./issue.controller.ts";
import { getProjects } from "./project.controller.ts";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.get("/issues", (req: Request, res: Response, next: NextFunction) => {
    setTimeout(async () => {
        try {
            //to simulate error
            const isError = Math.floor(Math.random() * 2) % 2 === 0;
            if (isError) return res.send();

            const issueList = await getIssues();

            res.status(200).json(issueList);
        } catch (error) {
            next(error);
        }
    }, 1000);
});

app.get(
    "/issues/:id",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            //to simulate error
            const isError = Math.floor(Math.random() * 2) % 2 === 0;
            if (isError) return res.send();

            const issue = await getIssue(Number(req.params.id));

            if (!issue) return res.status(404).send("not found");

            res.status(200).json(issue);
        } catch (error) {
            next(error);
        }
    }
);

app.post(
    "/issues/create",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const issue = req.body;

            const createdIssue = await createIssue(issue);

            res.status(200).json(createdIssue);
        } catch (error) {
            next(error);
        }
    }
);

app.get("/projects", (req: Request, res: Response, next: NextFunction) => {
    setTimeout(async () => {
        try {
            //to simulate error
            const isError = Math.floor(Math.random() * 2) % 2 === 0;
            if (isError) return res.send();

            const projectList = await getProjects();

            res.status(200).json(projectList);
        } catch (error) {
            next(error);
        }
    }, 1000);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    res.status(500).send("Internal server error");
});

app.listen(3000);
