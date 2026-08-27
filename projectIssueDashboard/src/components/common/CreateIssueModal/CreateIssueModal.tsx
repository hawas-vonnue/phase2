import React from "react";
import type { Issue } from "../../../types/issues";
import "./CreateIssueModal.css";
import { type IssueFormValues } from "../../../types/issues";

function clickEventHandler() {
    const modal = document.querySelector(".createIssueModal") as HTMLElement;
    modal!.style.display = "none";
    document.body.style.overflow = "revert";
}

function createIssue(event: React.SubmitEvent, issuesList: Issue[]) {
    let max = 0;
    issuesList.map((issue) => (max = Math.max(max, issue.id)));

    const form = event.currentTarget as HTMLFormElement;

    const formData = new FormData(form);

    const formValues = Object.fromEntries(
        formData.entries()
    ) as unknown as IssueFormValues;

    console.log(formValues);

    const id = max + 1;
    const issue: Issue = {
        id: id,
        date: String(formValues.date),
        status: formValues.status,
        priority: formValues.priority,
        tag: formValues.tag,
        text: formValues.text,
    };

    return issue;
}

export default function CreateIssueModal({
    updateIssuesList,
    issuesList,
}: {
    updateIssuesList: (newIssue: Issue[]) => void;
    issuesList: Issue[];
}) {
    function submit(event: React.SubmitEvent) {
        event?.preventDefault();

        const newIssue = createIssue(event, issuesList);
        const list = structuredClone(issuesList);
        list.push(newIssue);

        updateIssuesList(list);

        clickEventHandler();
    }
    return (
        <div className="createIssueModal">
            <button className="closeButton" onClick={clickEventHandler}>
                Close
            </button>
            <form onSubmit={submit}>
                <div className="field">
                    <label htmlFor="issue">Issue:</label>
                    <input type="text" id="issue" name="text" />
                </div>
                <div className="field">
                    <label htmlFor="status">status:</label>
                    <select name="status" id="status">
                        <option value="active">Active</option>
                        <option value="completed">completed</option>
                    </select>
                </div>
                <div className="field">
                    <label htmlFor="priority">Priority:</label>
                    <select name="priority" id="priority">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div className="field">
                    <label htmlFor="date">Last date:</label>
                    <input type="date" id="date" name="date" />
                </div>
                <button type="submit">Create issue</button>
            </form>
        </div>
    );
}

// id: number;
// status: string;
// text: string;
// tag: string;
// priority: string;
// date: string;
// overdue: boolean;
