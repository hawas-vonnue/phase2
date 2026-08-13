import dotenv from "dotenv";
import { Client, DatabaseError, Pool } from "pg";
dotenv.config();
const client = new Client();
const pool = new Pool();
// {
// user: process.env.PGUSER,
// password: process.env.PGPASSWORD,
// host: process.env.PGHOST,
// port: Number(process.env.PGPORT),
// database: process.env.PGDATABASE,
// }
pool.on("connect", (client) => {
    client.query("SET search_path TO support_ticket,public");
});
export async function createTicket(ticket) {
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
    }
    catch (error) {
        if (error instanceof DatabaseError)
            throw new Error(error.detail);
    }
}
export async function list() {
    try {
        const result = await pool.query("SELECT * FROM tickets");
        const tickets = result.rows;
        // console.log(tickets);
        return tickets;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
export async function view(id) {
    try {
        const query = {
            text: "SELECT * FROM tickets where ticketId = $1",
            values: [id],
        };
        const result = await pool.query(query);
        const ticket = result.rows[0];
        if (ticket === undefined)
            return false;
        // console.log(ticket);
        return ticket;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
export async function updateStatus(id, newStatus) {
    try {
        const query = {
            text: "UPDATE tickets set status = $1 WHERE ticketId = $2 RETURNING *",
            values: [newStatus, id],
        };
        const result = await pool.query(query);
        const ticket = result.rows[0];
        // console.log(ticket);
        if (ticket === undefined)
            return false;
        return ticket;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
export async function assign(ticketId, userId) {
    try {
        const query = {
            text: "INSERT INTO assignments(ticketId,userId) VALUES($1,$2) RETURNING *",
            values: [ticketId, userId],
        };
        const result = await pool.query(query);
        const returnValue = result.rows[0];
        console.log(returnValue);
        return returnValue;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
export async function deleteTicket(id) {
    try {
        const query = {
            text: "DELETE FROM tickets WHERE ticketId = $1 RETURNING *",
            values: [id],
        };
        const result = await pool.query(query);
        const ticket = result.rows[0];
        // console.log(ticket);
        if (ticket === undefined)
            return false;
        return ticket;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
export async function createCustomer(customer) {
    try {
        const query = {
            text: "INSERT INTO customers(name,email) VALUES($1,$2) RETURNING *",
            values: [customer.name, customer.email],
        };
        const result = await pool.query(query);
        const newCustomer = result.rows[0];
        return newCustomer;
    }
    catch (error) {
        if (error instanceof DatabaseError)
            throw new Error(error.detail);
    }
}
export async function createUser(user) {
    try {
        const query = {
            text: "INSERT INTO users(name,email) VALUES($1,$2) RETURNING *",
            values: [user.name, user.email],
        };
        const result = await pool.query(query);
        const newUser = result.rows[0];
        return newUser;
    }
    catch (error) {
        if (error instanceof DatabaseError)
            throw new Error(error.detail);
    }
}
export async function createCategory(categoryName) {
    try {
        const query = {
            text: "INSERT INTO categories(category) VALUES($1) RETURNING *",
            values: [categoryName],
        };
        const result = await pool.query(query);
        const category = result.rows[0];
        return category;
    }
    catch (error) {
        if (error instanceof DatabaseError)
            throw new Error(error.detail);
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
