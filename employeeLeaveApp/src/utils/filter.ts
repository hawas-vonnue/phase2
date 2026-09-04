import { type LeaveType } from "../types/types";

export default function filter(
    leaves: LeaveType[],
    filterValues: { search: string; status: string; type: string }
) {
    let filteredLeaves = leaves;
    if (filterValues.search !== "")
        filteredLeaves = filteredLeaves.filter((element) =>
            element.reason
                .toLocaleLowerCase()
                .includes(filterValues.search.toLocaleLowerCase())
        );
    if (filterValues.status !== "")
        filteredLeaves = filteredLeaves.filter(
            (element) => element.status === filterValues.status
        );
    if (filterValues.type !== "")
        filteredLeaves = filteredLeaves.filter(
            (element) => element.type === filterValues.type
        );

    return filteredLeaves;
}
