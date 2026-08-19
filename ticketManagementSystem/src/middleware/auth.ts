import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AuthenticatedUser } from "../types.js";
import { findUser } from "../prismaData.js";
import { mapToUser } from "../utils.js";

declare global {
    namespace Express {
        interface Request {
            user?: AuthenticatedUser;
        }
    }
}

export async function authenticate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authorization = req.headers.authorization;
    if (authorization === undefined)
        return res.status(401).send("Invalid user");
    const token = authorization.split("Bearer ")[1];
    try {
        const decoded = jwt.verify(token, String(process.env.JWT_SECRET));
        console.log(decoded);

        req.user = decoded as AuthenticatedUser;
    } catch (error) {
        console.log(error);
        return res.status(401).send("Invalid token");
    }
    next();
}
