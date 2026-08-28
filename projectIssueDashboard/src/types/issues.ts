import * as z from "zod";
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

export interface IssueFormValues {
    date: Date;
    status: string;
    priority: string;
    title: string;
    description: string;
    project: string;
    assignee: string;
    tags: string;
}

export interface FormValues {
    date: string;
    status: string;
    priority: string;
    title: string;
    description: string;
    project: string;
    assignee: string;
    tags: string;
}

export const IssueFormValuesZod = z.object({
    date: z.string().nonempty(),
    status: z.string().nonempty(),
    priority: z.string().nonempty(),
    title: z.string().nonempty(),
    description: z.string().nonempty(),
    project: z.string().nonempty(),
    assignee: z.string().nonempty(),
    tags: z.string().nonempty(),
});
