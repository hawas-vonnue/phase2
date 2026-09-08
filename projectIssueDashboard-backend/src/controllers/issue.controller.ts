import { prisma } from "../../lib/prisma";

export interface Issue {
    id: number;
    date: string;
    status: string;
    priority: string;
    title: string;
    description: string;
    project: string;
    assignee: string;
    tags: string[];
}

export async function getIssues() {
    try {
        const issues = await prisma.issue.findMany();

        return issues;
    } catch (err) {
        throw new Error("Error in getting issues");
    }
}

export async function getIssue(id: number) {
    try {
        const issue = await prisma.issue.findUnique({ where: { id: id } });

        return issue;
    } catch (error) {
        throw new Error("error in getting issue");
    }
}

export async function createIssue(issue: Issue) {
    try {
        const result = await prisma.issue.upsert({
            create: {
                id: issue.id,
                title: issue.title,
                tags: issue.tags,
                assignee: issue.assignee,
                date: issue.date,
                description: issue.description,
                status: issue.status,
                priority: issue.priority,
                project: issue.project,
            },
            update: {
                title: issue.title,
                tags: issue.tags,
                assignee: issue.assignee,
                date: issue.date,
                description: issue.description,
                status: issue.status,
                priority: issue.priority,
                project: issue.project,
            },
            where: {
                id: issue.id,
            },
        });

        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error in creating issue");
    }
}
