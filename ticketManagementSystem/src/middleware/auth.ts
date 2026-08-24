import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AuthenticatedUser } from "../types.js";
import logger from "../logger.js";
// import debugModule from "debug";

declare global {
    namespace Express {
        interface Request {
            user?: AuthenticatedUser;
        }
    }
}

// const debug = debugModule("ticketSupport:auth");

export async function authenticate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authorization = req.headers.authorization;
    if (authorization === undefined)
        return res.status(401).send("Invalid token");
    const token = authorization.split("Bearer ")[1];
    try {
        const decoded = jwt.verify(token, String(process.env.JWT_SECRET));

        // if (typeof decoded !== "string") debug(`logined as:`, decoded.id);
        logger.info("user details", { decoded });
        req.user = decoded as AuthenticatedUser;
    } catch (error) {
        // debug(error);
        logger.error("token invalid", {
            requestId: req.requestId,
            url: req.url,
            method: req.method,
            message: "Invalid token",
        });
        return res.status(401).send("Invalid token");
    }
    next();
}
