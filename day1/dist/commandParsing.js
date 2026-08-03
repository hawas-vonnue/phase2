import readline from "node:readline";
import { displayCommands, findEnvironment, findMemoryDetails, findOS, findPWD, findVersion, } from "./dataCollection.js";
export function parseCommand(command, option) {
    switch (command) {
        case "os":
            let osType = findOS();
            if (option === "--json")
                console.log({ osType: osType });
            else
                console.log(osType);
            break;
        case "version":
            let kernelVersion = findVersion();
            if (option === "--json")
                console.log({ kernelVersion });
            else
                console.log(kernelVersion);
            break;
        case "memory":
            // no need for separate --json flag it is already in machine-readable form
            console.log(findMemoryDetails());
            break;
        case "pwd":
            let pwd = findPWD();
            if (option === "--json")
                console.log({ current_directory: pwd });
            if (option === "--json")
                console.log({ current_directory: pwd });
            else
                console.log(pwd);
            break;
        case "env":
            // no need for separate --json flag it is already in machine-readable form
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
        rl.question("Command(type exit to exit):", function (commandLine) {
            if (commandLine === "exit") {
                rl.close();
            }
            else {
                const commandLineArray = commandLine.split(/\s+/);
                const command = commandLineArray[0];
                const option = commandLineArray[1];
                parseCommand(command, option);
                waitForUserInput();
            }
        });
    }
    waitForUserInput();
    // to use the commands as command line arguments
    // instead of inputing commands to standard input
    // function getCommandLineArguments() {
    //     if (process.argv.length < 3) return;
    //     parseCommand(process.argv[2], process.argv[3]);
    //     rl.close();
    // }
    // getCommandLineArguments();
}
