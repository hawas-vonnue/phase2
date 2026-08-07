import { stdin, stdout } from "node:process";
import readline from "node:readline/promises";
import { addToList, complete, deleteTask, filterTasks, list } from "./tasks.js";

export const rl = readline.createInterface({
    input: stdin,
    output: stdout,
});

function displayCommands() {
    console.log("help: shows this page");
    console.log("add: to add a task (give task description too)");
    console.log("list: lists all tasks");
    console.log("complete: to complete the task with given id");
    console.log("delete: to delete the task with given id");
    console.log("filter: display tasks as completed and as pending");
    console.log("Exit: to exit the CLI");
}

async function parseInput() {
    let commandLine = (await rl.question("command:")).trim();
    let [command, option] = commandLine.split(/\s+(.*)/);
    if (command === "Exit") {
        rl.close();

        return;
    } else {
        await parseCommand(command, option);
        parseInput();
    }
}

export async function parseCommand(command: string, option: string) {
    switch (command) {
        case "add": {
            if (option === undefined) {
                console.log("Task description is empty");
                break;
            }
            await addToList(option);

            break;
        }
        case "list":
            await list();

            break;
        case "complete": {
            if (option === undefined) {
                console.log("Task id is empty");
                break;
            }
            let id = Number(option);
            await complete(id);

            break;
        }
        case "delete":
            if (option === undefined) {
                console.log("Task id is empty");
                break;
            }
            let id = Number(option);
            await deleteTask(id);

            break;
        case "filter":
            await filterTasks();

            break;
        case "help":
            displayCommands();
            break;
        default:
            console.log("invalid command.type Help to see commands available");

            break;
    }
}

parseInput();
