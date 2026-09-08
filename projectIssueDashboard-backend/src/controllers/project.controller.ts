import { prisma } from "../../lib/prisma";

export async function getProjects() {
    try {
        const projects = await prisma.project.findMany();

        return projects;
    } catch (error) {
        throw new Error("error in getting projects");
    }
}
