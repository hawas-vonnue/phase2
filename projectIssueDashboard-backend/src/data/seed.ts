import { prisma } from "../../lib/prisma";
import { issueList } from "./issueList";
import { projectList } from "./projectList";
import { userList } from "./userList";

async function seedProjects() {
    await prisma.project.deleteMany();

    const result = await prisma.project.createManyAndReturn({
        data: projectList,
    });
    console.log(result);
}

async function seedIssues() {
    await prisma.issue.deleteMany();

    const result = await prisma.issue.createManyAndReturn({ data: issueList });
    console.log(result);
}

async function seedUsers() {
    await prisma.user.deleteMany();

    const result = await prisma.user.createManyAndReturn({ data: userList });
    console.log(result);
}

seedIssues();
seedProjects();
seedUsers();
