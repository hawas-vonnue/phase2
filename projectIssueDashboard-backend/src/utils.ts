import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface User {
    name: string;
    email: string;
    username: string;
    bio: string;
    avatar: string;
}

export async function hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return hashedPassword;
}

export function createJwtToken(user: User) {
    const JWT_SECRET = process.env.JWT_SECRET;

    if (JWT_SECRET === undefined) {
        console.log("error in getting JWT_SECRET");

        return;
    }

    const token = jwt.sign(user, JWT_SECRET);

    return token;
}
