import os from "node:os";
import { cwd, memoryUsage } from "node:process";

export function findOS() {
    let osType = os.type();
    if (osType === "Darwin") return "macOS";
    else if (osType === "Windows_NT") return "Windows";
    else return osType;
}

export function findVersion() {
    return os.version();
}

export function findMemoryDetails() {
    return memoryUsage();
}

export function findPWD() {
    return cwd();
}

export function findEnvironment() {
    return process.env;
}

export function displayCommands() {
    console.log("help - to show this page");
    console.log("os - to see the operating system");
    console.log("version - to display kernel version");
    console.log("memory - to display memory");
    console.log("pwd - to display current directory");
    console.log("env - to display environment");
}
