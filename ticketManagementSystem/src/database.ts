import dotenv from "dotenv";
import { Client, DatabaseError, Pool } from "pg";

dotenv.config();
const client = new Client();
const pool = new Pool();

pool.on("connect", (client) => {
    client.query("SET search_path TO support_ticket,public");
});

export type Ticket = {
    id: number;
    title: string;
    description: string;
    priority: "High" | "Medium" | "Low";
    status: "Pending" | "Completed";
    categoryId: number;
    customerId: number;
};
type ticketInput = Omit<Ticket, "id" | "status">;

export async function createTicket(ticket: ticketInput) {
    try {
        const query = {
            text: "INSERT INTO tickets(title,description,priority,status,customerId,categoryId) VALUES  ($1,$2,$3,$4,$5,$6) RETURNING *;",
            values: [
                ticket.title,
                ticket.description,
                ticket.priority,
                "Pending",
                ticket.customerId,
                ticket.categoryId,
            ],
        };
        const result = await pool.query(query);
        const returnTicket = result.rows[0];

        return returnTicket;
    } catch (error) {
        if (error instanceof DatabaseError) throw new Error(error.detail);
    }
}

export async function list() {
    try {
        const result = await pool.query("SELECT * FROM tickets");
        const tickets = result.rows;

        return tickets;
    } catch (error) {
        console.log(error);

        return false;
    }
}

export async function view(id: number) {
    try {
        const query = {
            text: "SELECT * FROM tickets where ticketId = $1",
            values: [id],
        };
        const result = await pool.query(query);
        const ticket = result.rows[0];
        if (ticket === undefined) return false;

        return ticket;
    } catch (error) {
        console.log(error);

        return false;
    }
}

export async function updateStatus(
    id: number,
    newStatus: "Pending" | "Completed"
) {
    try {
        const query = {
            text: "UPDATE tickets set status = $1 WHERE ticketId = $2 RETURNING *",
            values: [newStatus, id],
        };
        const result = await pool.query(query);
        const ticket = result.rows[0];

        if (ticket === undefined) return false;

        return ticket;
    } catch (error) {
        console.log(error);

        return false;
    }
}

export async function assign(ticketId: number, userId: number) {
    try {
        const query = {
            text: "INSERT INTO assignments(ticketId,userId) VALUES($1,$2) RETURNING *",
            values: [ticketId, userId],
        };
        const result = await pool.query(query);
        const returnValue = result.rows[0];

        return returnValue;
    } catch (error) {
        console.log(error);

        return false;
    }
}

export async function deleteTicket(id: number) {
    try {
        const query = {
            text: "DELETE FROM tickets WHERE ticketId = $1 RETURNING *",
            values: [id],
        };
        const result = await pool.query(query);
        const ticket = result.rows[0];
        if (ticket === undefined) return false;

        return ticket;
    } catch (error) {
        console.log(error);

        return false;
    }
}

export async function createCustomer(customer: {
    name: string;
    email: string;
}) {
    try {
        const query = {
            text: "INSERT INTO customers(name,email) VALUES($1,$2) RETURNING *",
            values: [customer.name, customer.email],
        };
        const result = await pool.query(query);
        const newCustomer = result.rows[0];

        return newCustomer;
    } catch (error) {
        if (error instanceof DatabaseError) throw new Error(error.detail);
    }
}

export async function createUser(user: { name: string; email: string }) {
    try {
        const query = {
            text: "INSERT INTO users(name,email) VALUES($1,$2) RETURNING *",
            values: [user.name, user.email],
        };

        const result = await pool.query(query);
        const newUser = result.rows[0];

        return newUser;
    } catch (error) {
        if (error instanceof DatabaseError) throw new Error(error.detail);
    }
}

export async function createCategory(categoryName: string) {
    try {
        const query = {
            text: "INSERT INTO categories(category) VALUES($1) RETURNING *",
            values: [categoryName],
        };
        const result = await pool.query(query);
        const category = result.rows[0];

        return category;
    } catch (error) {
        if (error instanceof DatabaseError) throw new Error(error.detail);
    }
}

//-------------------------Test----------------------------

// await createTicket({
//     title: "title of new",
//     description: "description of new",
//     priority: "High",
//     categoryId: 1,
//     customerId: 1,
// });

// await list();

// await view(1);

// await updateStatus(1, "Completed");

// await assign(1, 2);

// await deleteTicket(2);
