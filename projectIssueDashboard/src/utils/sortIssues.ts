import { type Issue } from "../types/issues";

export function sortIssues(
    issues: Issue[],
    sortValues: { field: string; direction: string }
) {
    const priorities = ["Low", "Medium", "High"];

    if (sortValues.field === "") return issues;
    let sortedIssues = issues;
    switch (sortValues.field) {
        case "id":
            if (sortValues.direction === "desc")
                sortedIssues = issues.sort((a, b) => b.id - a.id);
            else sortedIssues = issues.sort((a, b) => a.id - b.id);
            break;
        case "date":
            if (sortValues.direction === "desc")
                sortedIssues = issues.sort(
                    (a, b) => +new Date(b.date) - +new Date(a.date)
                );
            else
                sortedIssues = issues.sort(
                    (a, b) => +new Date(a.date) - +new Date(b.date)
                );
            break;
        case "priority":
            if (sortValues.direction === "desc")
                sortedIssues = issues.sort(
                    (a, b) =>
                        priorities.indexOf(b.priority) -
                        priorities.indexOf(a.priority)
                );
            else
                sortedIssues = issues.sort(
                    (a, b) =>
                        priorities.indexOf(a.priority) -
                        priorities.indexOf(b.priority)
                );
            break;
    }

    return sortedIssues;
}
