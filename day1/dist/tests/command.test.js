import { parseCommand } from "../commandParsing";
import { findEnvironment, findMemoryDetails, findOS, findPWD, findVersion, } from "../dataCollection";
jest.mock("../dataCollection");
test("test os", () => {
    parseCommand("os", "");
    expect(findOS).toHaveBeenCalled();
});
test("test memory", () => {
    parseCommand("memory", "");
    expect(findMemoryDetails).toHaveBeenCalled();
});
test("testing version", () => {
    parseCommand("version", "");
    expect(findVersion).toHaveBeenCalled();
});
test("testing current directory", () => {
    parseCommand("pwd", "");
    expect(findPWD).toHaveBeenCalled();
});
test("testing environment", () => {
    parseCommand("env", "");
    expect(findEnvironment).toHaveBeenCalled();
});
