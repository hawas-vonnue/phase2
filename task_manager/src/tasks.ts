import { writeFile } from "node:fs/promises";
import { readFile } from "node:fs/promises";

export type Task = {
    id: number;
    type: "completed" | "pending";
    description: string;
};

const filepath = "tasks.json";

export async function readFromFile(
    path: string = filepath
): Promise<Array<Task> | undefined> {
    try {
        const jsonData = await readFile(path, "utf-8");
        const data = JSON.parse(jsonData);
        if (data.tasks) return data.tasks;
        else return [];
    } catch (error) {
        if (error instanceof Error && error && "code" in error) {
            if (error.code === "ENOENT") {
                await writeToFile([]);
                return [];
            }
        }
    }
}

export async function writeToFile(arr: Array<Task>, path: string = filepath) {
    try {
        const data = { tasks: arr };
        const jsonData = JSON.stringify(data);
        await writeFile(path, jsonData, "utf-8");
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function addToList(task: string) {
    let data = await readFromFile();
    if (!data) return;
    let maxId = 0;
    data?.map((element) => (maxId = Math.max(maxId, element.id)));
    let id = maxId + 1;
    data.push({ id: id, description: task, type: "pending" });
    await writeToFile(data);
}

export async function list() {
    let data = await readFromFile();
    if (data) {
        if (data.length === 0) {
            console.log("No tasks");
            return;
        }
        console.log("tasks are:");
        data.forEach((element) => {
            console.log(element);
        });
    }
}

export async function complete(id: number) {
    const data = await readFromFile();
    const task = data?.find((element) => element.id === id);
    if (!data || !task) {
        console.log(`task with id ${id} not found.`);

        return false;
    }
    const index = data.indexOf(task);
    task.type = "completed";
    data.splice(index, 1, task);
    if (await writeToFile(data)) return true;
    else return false;
}

export async function deleteTask(id: number) {
    const data = await readFromFile();
    const task = data?.find((task) => task.id === id);
    if (!data || !task) {
        console.log(`task with id ${id} not found.`);

        return false;
    }
    const index = data.indexOf(task);
    console.log(data.splice(index, 1), "Deleted");
    if (await writeToFile(data)) return true;
    else return false;
}

export async function filterTasks() {
    const data = await readFromFile();
    if (!data) return;
    const completed: Task[] = data.filter((task) => task.type === "completed");
    const pending: Task[] = data.filter((task) => task.type === "pending");
    console.log("completed tasks:", completed);
    console.log("pending tasks:", pending);
}

//----------------------------------------------Test----------------------------

// await addToList({
//     id: 101,
//     type: "pending",
//     description: "this is what it is",
// });

// await addToList({
//     id: 121,
//     type: "pending",
//     description: "this task is completed",
// });

// await list();

// filterTasks();

// await complete(101);

// await list();

// await deleteTask(101);

// await list();
