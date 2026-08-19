export interface AuthenticatedUser {
    id: number;
    name: string;
    email: string;
    role: string;
}

// export interface User {
//     userid: number;
//     name: string;
//     email: string;
//     password: string;
//     role: string;
// }

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
