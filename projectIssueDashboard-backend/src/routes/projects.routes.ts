import { Router } from "express";
import { type Response, type Request, type NextFunction } from "express";
import { getProjects } from "../controllers/project.controller.ts";
import { authenticate } from "../middleware/auth.ts";

export const projectRouter = Router();

projectRouter.use(authenticate);

projectRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
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
