import React, { useState } from "react";
import type { FormValues, Issue } from "../../../types/issues";
import "./CreateIssueModal.css";
import { type IssueFormValues } from "../../../types/issues";
import { IssueFormValuesZod } from "../../../types/issues";
import * as z from "zod";

type FormErrors = ReturnType<typeof z.treeifyError<IssueFormValues>>;

export default function CreateIssueModal({
    updateIssuesList,
    issuesList,
    formValues,
    updateFormValues,
    editStatus,
    updateEditStatus,
}: {
    updateIssuesList: (newIssue: Issue[]) => void;
    issuesList: Issue[];
    formValues: FormValues;
    updateFormValues: (arg: FormValues) => void;
    editStatus: { isEdit: boolean; id: number };
    updateEditStatus: (arg: { isEdit: boolean; id: number }) => void;
}) {
    const [errorObject, updateErrorObject] = useState<FormErrors | null>(null);

    function validate(formValue: IssueFormValues) {
        const result = IssueFormValuesZod.safeParse(formValue);

        if (!result.success) {
            const tree = z.treeifyError(result.error);
            console.log(tree);

            // updateErrorObject(result.error.flatten().fieldErrors);
            updateErrorObject(tree);
        }

        return result;
    }

    function createIssue(event: React.SubmitEvent, issuesList: Issue[]) {
        let max = 0;
        issuesList.map((issue) => (max = Math.max(max, issue.id)));

        const form = event.currentTarget as HTMLFormElement;

        const formData = new FormData(form);

        const formValues = Object.fromEntries(
            formData.entries()
        ) as unknown as IssueFormValues;

        const result = validate(formValues);
        if (!result.success) return undefined;

        const id = max + 1;
        const tags = formValues.tags.split(",");
        const issue: Issue = {
            id: id,
            date: String(formValues.date),
            status: formValues.status,
            priority: formValues.priority,
            title: formValues.title,
            project: formValues.project,
            assignee: formValues.assignee,
            description: formValues.description,
            tags: tags,
        };

        return issue;
    }

    function clickEventHandler() {
        const modal = document.querySelector(
            ".createIssueModal"
        ) as HTMLElement;
        modal!.style.display = "none";
        document.body.style.overflow = "revert";
        updateEditStatus({ isEdit: false, id: -1 });
        updateFormValues({
            status: "",
            title: "",
            tags: "",
            priority: "",
            date: "",
            assignee: "",
            description: "",
            project: "",
        });
    }

    function submit(event: React.SubmitEvent) {
        event?.preventDefault();

        const newIssue = createIssue(event, issuesList);
        if (newIssue === undefined) return;
        let list = structuredClone(issuesList);
        if (editStatus.isEdit) {
            list = list.map((issue) => {
                if (issue.id === editStatus.id) {
                    issue.assignee = newIssue.assignee;
                    issue.date = newIssue.date;
                    issue.description = newIssue.description;
                    issue.id = newIssue.id;
                    issue.priority = newIssue.priority;
                    issue.project = newIssue.project;
                    issue.status = newIssue.status;
                    issue.tags = newIssue.tags;
                    issue.title = newIssue.title;
                }

                return issue;
            });
        } else list.push(newIssue);

        updateIssuesList(list);
        updateEditStatus({ isEdit: false, id: -1 });
        updateErrorObject(null);

        clickEventHandler();
    }

    function changeHandler(type: string, value: string) {
        updateFormValues({
            ...formValues,
            [type]: value,
        });
    }

    return (
        <div className="createIssueModal">
            <button className="closeButton" onClick={clickEventHandler}>
                <img
                    src="https://img.icons8.com/?size=100&id=71200&format=png&color=ffffffff"
                    alt="close button"
                />
            </button>
            <form onSubmit={submit}>
                <div className="field">
                    <label htmlFor="issue">Title:</label>
                    <input
                        type="text"
                        id="issue"
                        name="title"
                        value={formValues.title}
                        onChange={(e) => changeHandler("title", e.target.value)}
                    />
                </div>
                {errorObject?.properties?.title && (
                    <span className="error">
                        {errorObject.properties.title.errors[0]}
                    </span>
                )}
                <div className="field">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        name="description"
                        id="description"
                        value={formValues.description}
                        onChange={(e) =>
                            changeHandler("description", e.target.value)
                        }
                    ></textarea>
                </div>
                {errorObject?.properties?.description && (
                    <span className="error">
                        {errorObject?.properties?.description.errors[0]}
                    </span>
                )}
                <div className="field">
                    <label htmlFor="project">Project:</label>
                    <input
                        type="text"
                        id="project"
                        name="project"
                        value={formValues.project}
                        onChange={(e) =>
                            changeHandler("project", e.target.value)
                        }
                    />
                </div>
                {errorObject?.properties?.project && (
                    <span className="error">
                        {errorObject.properties.project.errors[0]}
                    </span>
                )}
                <div className="field">
                    <label htmlFor="assignee">Assignee:</label>
                    <input
                        type="text"
                        id="assignee"
                        name="assignee"
                        value={formValues.assignee}
                        onChange={(e) =>
                            changeHandler("assignee", e.target.value)
                        }
                    />
                </div>
                {errorObject?.properties?.assignee && (
                    <span className="error">
                        {errorObject.properties.assignee.errors[0]}
                    </span>
                )}
                <div className="field">
                    <label htmlFor="status">status:</label>
                    <select
                        name="status"
                        id="status"
                        value={formValues.status}
                        onChange={(e) =>
                            changeHandler("status", e.target.value)
                        }
                    >
                        <option value="">Select a Status</option>
                        <option value="active">Active</option>
                        <option value="completed">completed</option>
                    </select>
                </div>
                {errorObject?.properties?.status && (
                    <span className="error">
                        {errorObject.properties.status.errors[0]}
                    </span>
                )}
                <div className="field">
                    <label htmlFor="priority">Priority:</label>
                    <select
                        name="priority"
                        id="priority"
                        value={formValues.priority}
                        onChange={(e) =>
                            changeHandler("priority", e.target.value)
                        }
                    >
                        <option value="">Select a priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                {errorObject?.properties?.priority && (
                    <span className="error">
                        {errorObject.properties.priority.errors[0]}
                    </span>
                )}
                <div className="field">
                    <label htmlFor="date">Last date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formValues.date}
                        // value={formValues.date.toISOString().split("T")[0]}
                        onChange={(e) => changeHandler("date", e.target.value)}
                    />
                </div>
                {errorObject?.properties?.date && (
                    <span className="error">
                        {errorObject.properties.date.errors[0]}
                    </span>
                )}
                <div className="field tags">
                    <label htmlFor="tags">
                        Tags(comma separate, no more than three):
                    </label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        value={formValues.tags}
                        onChange={(e) => changeHandler("tags", e.target.value)}
                    />
                </div>
                {errorObject?.properties?.tags && (
                    <span className="error">
                        {errorObject.properties.tags.errors[0]}
                    </span>
                )}
                <button type="submit">
                    {editStatus.isEdit ? "Edit" : "Create"} Issue
                </button>
            </form>
        </div>
    );
}
