import { type Issue } from "../types/issues";

function search(filteredList: Issue[], searchTerm: string) {
    return filteredList.filter((issue) =>
        issue.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
}

export function filterIssues(
    issuesList: Issue[],
    filterValues: {
        search: string;
        status: string;
        priority: string;
    }
) {
    let filteredList: Issue[] = structuredClone(issuesList);

    if (filterValues.search !== "") {
        filteredList = search(filteredList, filterValues.search);
    }
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
