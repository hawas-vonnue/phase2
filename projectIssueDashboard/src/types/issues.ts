export interface Issue {
    id: number;
    date: string;
    status: string;
    priority: string;
    text: string;
    tag: string;
}

export interface IssueFormValues {
    date: Date;
    status: string;
    priority: string;
    text: string;
    tag: string;
}
