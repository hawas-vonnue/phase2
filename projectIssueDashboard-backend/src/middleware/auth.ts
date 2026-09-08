import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedUser {
    name: string;
    email: string;
    avatar: string;
    bio: string;
    userName: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: AuthenticatedUser;
        }
    }
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const JWT_SECRET = process.env.JWT_SECRET;

    if (JWT_SECRET === undefined) return next("Error in reading jwt secret");

    const authorization = req.headers.authorization;
    if (authorization === undefined)
        return res.status(401).send("Invalid token");
    const token = authorization.split("Bearer ")[1];

    try {
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user as AuthenticatedUser;
        next();
    } catch (error) {
        return res.status(401).send("Invalid token");
    }
}
