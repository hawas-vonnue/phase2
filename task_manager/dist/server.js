import http from "node:http";
import { addToList, deleteTask, getSpecificTask, getTasks, updateTask, } from "./modified_tasks.js";
export const server = http.createServer(async (request, response) => {
    request.on("error", (err) => {
        console.error(err);
    });
    const method = request.method;
    const url = request.url;
    if (method === "GET" && url === "/tasks") {
        await getTasksResponder(request, response);
    }
    else if (method === "GET" && url?.includes("/tasks/:")) {
        await getTaskResponder(request, response, url);
    }
    else if (method === "DELETE" && url?.includes("/tasks/:")) {
        await deleteTaskResponder(request, response, url);
    }
    else if (method === "POST") {
        await postResponder(request, response);
    }
    else if (method === "PATCH" && url?.includes("/tasks/:")) {
        await patchResponder(request, response, url);
    }
    else {
        response.statusCode = 400;
        response.end(JSON.stringify("Error: Bad request"));
    }
});
if (process.env.NODE_ENV !== "test")
    server.listen(8080);
async function getTasksResponder(request, response) {
    const tasks = await getTasks();
    response.setHeader("content-type", "application/json");
    response.statusCode = 200;
    response.end(JSON.stringify(tasks));
}
async function getTaskResponder(request, response, url) {
    const id = Number(url.split(":")[1]);
    let task = await getSpecificTask(id);
    response.setHeader("content-type", "application/json");
    if (task === false) {
        response.statusCode = 404;
        response.end();
    }
    else {
        response.statusCode = 200;
        response.end(JSON.stringify(task));
    }
}
async function deleteTaskResponder(request, response, url) {
    const id = Number(url.split(":")[1]);
    let task = await deleteTask(id);
    response.setHeader("content-type", "applicaton/json");
    if (task === false) {
        response.statusCode = 404;
        response.end();
    }
    else {
        response.statusCode = 200;
        response.end(JSON.stringify(task));
    }
}
async function postResponder(request, response) {
    let bodyArray = [];
    let bodyJSON;
    request
        .on("data", (chunk) => {
        bodyArray.push(chunk);
    })
        .on("end", async () => {
        try {
            bodyJSON = Buffer.concat(bodyArray).toString();
            const body = JSON.parse(bodyJSON);
            response.setHeader("content-type", "application/json");
            let responseText;
            if (body &&
                typeof body === "object" &&
                "description" in body &&
                typeof body.description === "string") {
                let flag = await addToList(body.description);
                if (flag) {
                    responseText = "Success";
                    response.statusCode = 200;
                }
                else {
                    responseText = "Failure";
                    response.statusCode = 500;
                }
            }
            else {
                responseText = "Failure due to bad request";
                response.statusCode = 400;
            }
            response.end(JSON.stringify(responseText));
        }
        catch (error) {
            response.setHeader("content-type", "application/json");
            let responseText = "Failure due to bad request";
            response.statusCode = 400;
            response.end(responseText);
        }
    });
}
async function patchResponder(request, response, url) {
    let id = Number(url.split(":")[1]);
    let bodyArray = [];
    let bodyJSON;
    response.setHeader("content-type", "application/json");
    try {
        request
            .on("data", (chunk) => {
            bodyArray.push(chunk);
        })
            .on("end", async () => {
            bodyJSON = Buffer.concat(bodyArray).toString();
            const body = JSON.parse(bodyJSON);
            let responseText;
            if (body &&
                typeof body === "object" &&
                "description" in body &&
                typeof body.description === "string") {
                if (await updateTask(id, body.description)) {
                    responseText = "updated Successfully";
                    response.statusCode = 200;
                    response.end(JSON.stringify(responseText));
                }
                else {
                    responseText = "Couldnt find the task";
                    response.statusCode = 404;
                    response.end(JSON.stringify(responseText));
                }
            }
            else {
                responseText = "Bad Request";
                response.statusCode = 400;
                response.end(JSON.stringify(responseText));
            }
        });
    }
    catch (error) {
        response.statusCode = 400;
        let status = "Failure due to bad request";
        response.end(JSON.stringify(status));
    }
}
