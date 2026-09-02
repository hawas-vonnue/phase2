import { type Request, type Response } from "express";
import bcryt from "bcrypt";
import { prisma } from "../../lib/prisma";
import { createJwtToken, type User } from "../utils";

export async function getHashedPassword(email: string) {
    const hashedPassword = await prisma.user.findUnique({
        where: { email: email },
        // select: { password: true },
    });

    return hashedPassword;
}

export async function loginHandler(req: Request, res: Response) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await getHashedPassword(email);
    if (user === null)
        return res
            .status(403)
            .json({ status: "Failed", message: "Invalid password or email" });

    console.log(email, password);

    const hashedPassword = user.password;
    const isSame = await bcryt.compare(password, hashedPassword);

    if (isSame) {
        const token = createJwtToken({
            bio: user.bio,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            username: user.userName,
        });

        return res.status(200).json({
            status: "success",
            token,
            user: {
                bio: user.bio,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                username: user.userName,
            },
        });
    }
    return res
        .status(403)
        .json({ status: "Failed", message: "Invalid password or email" });
}

export function userHandler(req: Request, res: Response) {
    console.log(req.user);
    return res.status(200).json(req.user);
}
