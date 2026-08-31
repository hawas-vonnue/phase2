interface project {
    name: string;
    text: string;
    status: string;
}

export const projectList: project[] = [
    {
        name: "First project",
        text: "This is the description of first project",
        status: "Pending",
    },

    {
        name: "Second project",
        text: "This is the description of second project",
        status: "completed",
    },

    {
        name: "third project",
        text: "This is the description of third project",
        status: "completed",
    },

    {
        name: "fourth project",
        text: "This is the description of fourth project",
        status: "pending",
    },
];
