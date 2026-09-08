import { Router } from "express";
import express, {
    type NextFunction,
    type Request,
    type Response,
} from "express";
import {
    createIssue,
    getIssue,
    getIssues,
} from "../controllers/issue.controller.ts";
import { authenticate } from "../middleware/auth.ts";

export const issueRouter = Router();

issueRouter.use(authenticate);

issueRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
    setTimeout(async () => {
        try {
            //to simulate error
            // const isError = Math.floor(Math.random() * 2) % 2 === 0;
            // if (isError) return res.send();

            const issueList = await getIssues();

            res.status(200).json(issueList);
        } catch (error) {
            next(error);
        }
    }, 1000);
});

issueRouter.get(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            //to simulate error
            // const isError = Math.floor(Math.random() * 2) % 2 === 0;
            // if (isError) return res.send();

            const issue = await getIssue(Number(req.params.id));

            if (!issue) return res.status(404).send("not found");

            res.status(200).json(issue);
        } catch (error) {
            next(error);
        }
    }
);

issueRouter.post(
    "/create",
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
