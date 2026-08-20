export interface AuthenticatedUser {
    id: number;
    name: string;
    email: string;
    role: string;
    type: "user" | "customer";
}

// export interface User {
//     userid: number;
//     name: string;
//     email: string;
//     password: string;
//     role: string;
// }

export interface Ticket {
    ticketid: number;
    categoryid: number;
    created_at: Date | null;
    customerid: number;
    description: string | null;
    priority: string | null;
    status: string | null;
    title: string | null;
}

interface baseUser {
    name: string;
    email: string;
    password: string;
}
interface Customer extends baseUser {
    type: "customer";
    customerid: number;
}
interface User extends baseUser {
    type: "user";
    userid: number;
    role: string;
}

export type customerOrUser = Customer | User;
