// for file based
// function isValidTaskInput(req: Request) {
//     if (
//         "title" in req.body &&
//         "description" in req.body &&
//         "priority" in req.body &&
//         typeof req.body.title === "string" &&
//         typeof req.body.description === "string" &&
//         (req.body.priority === "High" ||
//             req.body.priority === "Low" ||
//             req.body.priority === "Medium")
//     )
//         return true;
//     else false;
// }
// for db based
export function isValidTaskInput(req) {
    if ("title" in req.body &&
        "description" in req.body &&
        "priority" in req.body &&
        "customerId" in req.body &&
        "categoryId" in req.body &&
        typeof req.body.title === "string" &&
        typeof req.body.description === "string" &&
        (req.body.priority === "High" ||
            req.body.priority === "Low" ||
            req.body.priority === "Medium") &&
        typeof req.body.customerId === "number" &&
        typeof req.body.categoryId === "number")
        return true;
    else
        false;
}
export function isValidCustomerInput(req) {
    if ("name" in req.body &&
        "email" in req.body &&
        typeof req.body.name === "string" &&
        typeof req.body.email === "string")
        return true;
    else
        return false;
}
export function isValidUserInput(req) {
    if ("name" in req.body &&
        "email" in req.body &&
        typeof req.body.name === "string" &&
        typeof req.body.email === "string")
        return true;
    else
        return false;
}
