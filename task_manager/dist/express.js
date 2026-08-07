import express from "express";
import { addToList, deleteTask, getSpecificTask, getTasks, updateTask, filterTasks, } from "./modified_tasks.js";
const app = express();
//parse json bodies
app.use(express.json());
//request logging
app.use((req, res, next) => {
    console.log("method:", req.method);
    console.log("params", req.params);
    console.log("body:", req.body);
    next();
});
//setting header for all responses
app.use((req, res, next) => {
    res.set("Content-Type", "application/json");
    next();
});
//health endpoint
app.get("/health", (req, res) => {
    res.status(200).send("Ok");
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
function notFoundHandler(req, res) {
    res.status(404).json("Not Found");
}
function errorHandler(err, req, res) {
    res.status(500);
    res.send(`error ${err}`);
}
async function getTasksResponder(request, response, next) {
    const tasks = await getTasks();
    response.status(200).json(tasks);
}
async function getTaskResponder(request, response, next) {
    const id = Number(request.params.id);
    let task = await getSpecificTask(id);
    if (task === false) {
        next();
    }
    else {
        response.status(200).json(task);
    }
}
async function deleteTaskResponder(request, response, next) {
    const id = Number(request.params.id);
    let task = await deleteTask(id);
    response.setHeader("content-type", "applicaton/json");
    if (task === false) {
        next();
    }
    else {
        response.status(200).json(task);
    }
}
async function postResponder(request, response, next) {
    try {
        let body = request.body;
        if (body &&
            typeof body === "object" &&
            "description" in body &&
            typeof body.description === "string") {
            let flag = await addToList(body.description);
            if (flag) {
                response.status(200).json("Success");
            }
            else {
                response.status(500).json("Failure");
            }
        }
        else {
            response.status(400).json("Failure due to bad request");
        }
    }
    catch (error) {
        next(error);
    }
}
async function patchResponder(request, response, next) {
    let id = Number(request.params.id);
    try {
        const body = request.body;
        if (body &&
            typeof body === "object" &&
            "description" in body &&
            typeof body.description === "string") {
            if (await updateTask(id, body.description)) {
                response.status(200).json("updated Successfully");
            }
            else {
                next();
            }
        }
        else {
            response.status(400).json("Bad Request");
        }
    }
    catch (error) {
        next(error);
    }
}
async function filterResponder(request, response) {
    const query = String(request.params.query);
    const result = await filterTasks(query);
    response.statusCode = 200;
    response.end(JSON.stringify(result));
}
