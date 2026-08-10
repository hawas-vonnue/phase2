import express, {
    type Response,
    type Request,
    NextFunction,
    response,
} from "express";
import {
    addToList,
    deleteTask,
    getSpecificTask,
    getTasks,
    updateTask,
    filterTasks,
} from "./modified_tasks.js";

const app = express();
let requestId = 0;

//parse json bodies
app.use(express.json());

//request logging
app.use((req, res, next) => {
    requestId++;
    console.log("request Id:", requestId);
    console.log("method:", req.method);
    console.log("params", req.params);
    console.log("body:", req.body);
    next();
});

//setting header for all responses
app.use((req: Request, res: Response, next: NextFunction) => {
    res.set("Content-Type", "application/json");
    next();
});

//health endpoint
app.get("/health", (req: Request, res: Response) => {
    res.status(200).send({ requestId, response: "Ok" });
});

app.get("/tasks/filter/:query", filterResponder);
app.get("/tasks", getTasksResponder);
app.get("/tasks/:id", getTaskResponder);
app.post("/tasks", postResponder);
app.patch("/tasks/:id", patchResponder);
app.delete("/tasks/:id", deleteTaskResponder);

app.use(notFoundHandler);

//centralised errorHandler
app.use(errorHandler);

app.listen(8080);

function notFoundHandler(req: Request, res: Response) {
    res.status(404).json({ requestId, response: "Not Found" });
}

function errorHandler(err: Error, req: Request, res: Response) {
    res.status(500);
    res.send({ requestId, response: `error ${err}` });
}

async function getTasksResponder(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const tasks = await getTasks();
    response.status(200).json({ requestId, response: tasks });
}

async function getTaskResponder(
    request: Request<{ id: string }>,
    response: Response,
    next: NextFunction
) {
    const id = Number(request.params.id);
    let task = await getSpecificTask(id);

    if (task === false) {
        next();
    } else {
        response.status(200).json({ requestId, response: task });
    }
}

async function deleteTaskResponder(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const id = Number(request.params.id);
    let task = await deleteTask(id);

    response.setHeader("content-type", "applicaton/json");
    if (task === false) {
        next();
    } else {
        response.status(200).json({ requestId, response: task });
    }
}

async function postResponder(
    request: Request,
    response: Response,
    next: NextFunction
) {
    try {
        let body = request.body;
        if (
            body &&
            typeof body === "object" &&
            "description" in body &&
            typeof body.description === "string"
        ) {
            let flag = await addToList(body.description);
            if (flag) {
                response.status(200).json({ requestId, response: "Success" });
            } else {
                response.status(500).json({ requestId, response: "Failure" });
            }
        } else {
            response
                .status(400)
                .json({ requestId, response: "Failure due to bad request" });
        }
    } catch (error) {
        next(error);
    }
}

async function patchResponder(
    request: Request,
    response: Response,
    next: NextFunction
) {
    let id = Number(request.params.id);
    try {
        const body = request.body;
        if (
            body &&
            typeof body === "object" &&
            "description" in body &&
            typeof body.description === "string"
        ) {
            if (await updateTask(id, body.description)) {
                response
                    .status(200)
                    .json({ requestId, response: "updated Successfully" });
            } else {
                next();
            }
        } else {
            response.status(400).json({ requestId, response: "Bad Request" });
        }
    } catch (error) {
        next(error);
    }
}

async function filterResponder(request: Request, response: Response) {
    const query = String(request.params.query);
    const result = await filterTasks(query);
    response.statusCode = 200;
    response.end(JSON.stringify({ requestId, response: result }));
}
