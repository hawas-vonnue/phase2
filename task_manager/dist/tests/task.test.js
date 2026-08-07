import { parseCommand } from "../parseCommands";
import { rl } from "../parseCommands";
import { addToList, deleteTask, complete } from "../tasks";
jest.mock("../tasks", () => {
    const originalModule = jest.requireActual("../tasks");
    return {
        __esModule: true,
        ...originalModule,
        addToList: jest.fn(),
    };
});
test("adding data", async () => {
    await parseCommand("add", "1111");
    expect(addToList).toHaveBeenCalledWith("1111");
});
test("malformed data", async () => {
    //can't test without any data because typescript throws error
    await parseCommand("add", "");
    expect(addToList).toHaveBeenCalledWith("");
});
test("delete missing IDs", async () => {
    let flag = await deleteTask(145);
    expect(flag).toBeFalsy();
});
test("complete missing id", async () => {
    let flag = await complete(145);
    expect(flag).toBeFalsy();
});
rl.close();
