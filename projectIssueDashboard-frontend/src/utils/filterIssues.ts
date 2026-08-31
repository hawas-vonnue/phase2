import { type Issue } from "../types/issues";

export function filterIssues(
    issuesList: Issue[],
    filterValues: {
        search: string;
        status: string;
        priority: string;
    }
) {
    let filteredList: Issue[] = structuredClone(issuesList);

    if (filterValues.search !== "")
        filteredList = filteredList.filter((issue) =>
            issue.title
                .toLocaleLowerCase()
                .includes(filterValues.search.toLocaleLowerCase())
        );
    if (filterValues.status !== "") {
        filteredList = filteredList.filter(
            (issue) => issue.status === filterValues.status
        );
    }
    if (filterValues.priority !== "")
        filteredList = filteredList.filter(
            (issue) => issue.priority === filterValues.priority
        );

    return filteredList;
}
