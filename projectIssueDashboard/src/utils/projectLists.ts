interface project {
    id: number;
    name: string;
    text: string;
    status: string;
}

export const projects: project[] = [
    {
        name: "First project",
        id: 4,
        text: "This is the description of first project",
        status: "Pending",
    },

    {
        name: "Second project",
        id: 5,
        text: "This is the description of second project",
        status: "completed",
    },
];
