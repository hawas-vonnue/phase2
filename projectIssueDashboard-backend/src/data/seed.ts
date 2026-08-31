import { prisma } from "../../lib/prisma";
import { issueList } from "./issueList";
import { projectList } from "./projectList";

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
seedIssues();
seedProjects();
