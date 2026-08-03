import readline from "node:readline";
import {
    displayCommands,
    findEnvironment,
    findMemoryDetails,
    findOS,
    findPWD,
    findVersion,
} from "./dataCollection.js";

export function parseCommand(command: string) {
    switch (command) {
        case "os":
            console.log(findOS());
            break;
        case "version":
            console.log("kernel version:", findVersion());
            break;
        case "memory":
            console.log(findMemoryDetails());
            break;
        case "pwd":
            console.log(findPWD());
            break;
        case "env":
            console.log(findEnvironment());
            break;
        case "help":
            displayCommands();
            break;
        default:
            console.log("Invalid command type help to see supported commands");
            break;
    }
}

if (process.env.NODE_ENV !== "test") {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    function waitForUserInput() {
        rl.question("Command(type exit to exit):", function (command) {
            if (command === "exit") {
                rl.close();
            } else {
                parseCommand(command);
                waitForUserInput();
            }
        });
    }

    waitForUserInput();

    // to use the commands as command line arguments
    // instead of inputing commands to standard input

    // function getCommandLineArguments() {
    //     if (process.argv.length < 3) return;
    //     for (let i = 2; i < process.argv.length; i++) {
    //         parseCommand(process.argv[i]);
    //     }
    //     rl.close();
    // }

    // getCommandLineArguments();
}
