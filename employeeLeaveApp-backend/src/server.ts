import express, { type NextFunction } from "express";
import { type Request, type Response } from "express";
import { leaveList } from "./data/leaveList";
import cors from "cors";

function getHandler(req: Request, res: Response, next: NextFunction) {
    setTimeout(() => {
        res.status(200).json(leaveList);

        //to simulate error
        // res.send();
    }, 300);
}

interface LeaveType {
    type: string;
    startDate: string;
    endDate: string;
    reason: string;
    status: string;
    totalDays: number;
}

function postHandler(req: Request, res: Response, next: NextFunction) {
    const leave: LeaveType = req.body;

    leaveList.push(leave);
}

const app = express();

app.use(cors());
app.use(express.json());

app.get("/leaves", getHandler);
app.post("/leaves", postHandler);

app.listen(8080);
