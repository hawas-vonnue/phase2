import { readFile } from "node:fs/promises";
import { writeFile } from "node:fs/promises";

type Ticket = {
    id: number;
    title: string;
    description: string;
    priority: "High" | "Medium" | "Low";
    status: "Pending" | "Completed";
    assignee: string | null;
};
type ticketInput = Omit<Ticket, "id" | "status" | "assignee">;

const filepath = "ticket.json";

async function writeToFile(tickets: Ticket[], path = filepath) {
    try {
        await writeFile(path, JSON.stringify({ tickets: tickets }), "utf-8");
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function readFromFile(path = filepath): Promise<Ticket[] | false> {
    try {
        const dataJSON = await readFile(path, "utf-8");
        const data = JSON.parse(dataJSON);

        if ("tickets" in data) return data.tickets;
        else return false;
    } catch (error) {
        console.log(error);
        if (typeof error === "object" && error && "code" in error) {
            if (error.code === "ENOENT") {
                if ((await writeToFile([])) !== false) return [];
            }
        }

        return false;
    }
}

export async function createTicket(partialTicket: ticketInput) {
    const tickets = await readFromFile();
    if (tickets === false) return false;

    let maxId = 0;
    tickets.map((element) => (maxId = Math.max(maxId, element.id)));
    const id = maxId + 1;

    const ticket: Ticket = {
        ...partialTicket,
        status: "Pending",
        id: id,
        assignee: null,
    };
    tickets.push(ticket);

    if ((await writeToFile(tickets)) !== false) return ticket;
    else return false;
}

export async function list() {
    const tickets = await readFromFile();
    if (tickets === false) return false;
    tickets.forEach((ticket) => console.log(ticket));

    return tickets;
}

export async function view(id: number) {
    const tickets = await readFromFile();
    if (tickets === false) return false;

    const ticket = tickets.find((ticket) => ticket.id === id);
    if (ticket === undefined) return false;
    console.log(ticket);

    return ticket;
}

export async function updateStatus(
    id: number,
    newStatus: "Pending" | "Completed"
) {
    const tickets = await readFromFile();
    if (tickets === false) return false;

    const ticket = tickets.find((ticket) => ticket.id === id);
    if (ticket === undefined) return false;
    ticket.status = newStatus;

    console.log(tickets);

    if ((await writeToFile(tickets)) !== false) return ticket;
    else return false;
}

export async function assign(id: number, assignee: string) {
    const tickets = await readFromFile();
    if (tickets === false) return false;

    const ticket = tickets.find((ticket) => ticket.id === id);
    if (ticket === undefined) return false;
    ticket.assignee = assignee;

    console.log(tickets);
    if ((await writeToFile(tickets)) !== false) return ticket;
    else return false;
}

export async function deleteTicket(id: number) {
    const tickets = await readFromFile();
    if (tickets === false) return false;

    const ticket = tickets.find((ticket) => ticket.id === id);
    if (ticket === undefined) return false;
    const index = tickets.indexOf(ticket);
    tickets.splice(index, 1);

    console.log(tickets);
    if ((await writeToFile(tickets)) !== false) return ticket;
    else return false;
}

//helper function for testing
export async function clear() {
    await writeToFile([]);
}

//------------------------------------Test--------------------------------------

await clear();

await createTicket({
    title: "First title",
    description: "First description",
    priority: "High",
});

await createTicket({
    title: "Second title",
    description: "second description",
    priority: "Low",
});

await list();

console.log("-------------------------------------------------------------");
await view(2);

console.log("-------------------------------------------------------------");
await updateStatus(1, "Completed");

console.log("-------------------------------------------------------------");
await assign(1, "myself");

console.log("-------------------------------------------------------------");
await deleteTicket(2);

await clear();
