import { readFile } from "node:fs/promises";
import { writeFile } from "node:fs/promises";
const filepath = "tasks.json";
export async function readFromFile(path = filepath) {
    try {
        const jsonData = await readFile(path, "utf-8");
        const data = JSON.parse(jsonData);
        if (data.tasks)
            return data.tasks;
        else
            return [];
    }
    catch (error) {
        if (typeof error === "object" && error && "code" in error) {
            if (error.code === "ENOENT") {
                await writeToFile([]);
                return [];
            }
        }
    }
}
export async function writeToFile(arr, path = filepath) {
    try {
        const data = { tasks: arr };
        const jsonData = JSON.stringify(data);
        await writeFile(path, jsonData, "utf-8");
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
export async function getTasks(path = filepath) {
    const data = await readFromFile();
    return data;
}
export async function getSpecificTask(id, path = filepath) {
    const data = await readFromFile();
    let task = data?.find((element) => element.id === id);
    if (task !== undefined) {
        return task;
    }
    else
        return false;
}
export async function deleteTask(id) {
    const data = await readFromFile();
    const task = data?.find((task) => task.id === id);
    if (!data || !task) {
        return false;
    }
    const index = data.indexOf(task);
    data.splice(index, 1);
    if ((await writeToFile(data)) !== false)
        return task;
    else
        return false;
}
export async function addToList(task) {
    let data = await readFromFile();
    if (!data)
        return;
    let maxId = 0;
    data?.map((element) => (maxId = Math.max(maxId, element.id)));
    let id = maxId + 1;
    data.push({ id: id, description: task, type: "pending" });
    if ((await writeToFile(data)) !== false)
        return true;
    else
        return false;
}
export async function updateTask(id, task) {
    let data = await readFromFile();
    if (!data || data.length === 0)
        return false;
    const taskToUpdate = data.find((element) => element.id === id);
    if (taskToUpdate === undefined)
        return false;
    const index = data.indexOf(taskToUpdate);
    taskToUpdate.description = task;
    data.splice(index, 1, taskToUpdate);
    await writeToFile(data);
    return true;
}
export async function filterTasks(query) {
    const data = await readFromFile();
    if (!data)
        return;
    if (query === "completed") {
        const completed = data.filter((task) => task.type === "completed");
        return completed;
    }
    if (query === "pending") {
        const pending = data.filter((task) => task.type === "pending");
        return pending;
    }
}
