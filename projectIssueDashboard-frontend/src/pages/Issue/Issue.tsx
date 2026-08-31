import { useParams } from "react-router";
import "./Issue.css";
import { type Issue } from "../../types/issues";
import Badge from "../../components/common/Badge";
import Tag from "../../components/common/Tag";
import { useEffect, useState } from "react";

function isOverdue(date: string) {
    const currentDate = new Date();
    // only compares date not time
    currentDate.setHours(0, 0, 0, 0);
    const lastDate = new Date(date);
    const isPast = +lastDate - +currentDate < 0;

    return isPast;
}

export default function Issue() {
    const { id } = useParams();
    const idNumber = Number(id);

    // const issue = issuesList.find((issue) => issue.id === idNumber);
    const [issue, setIssue] = useState<Issue | null>(null);
    useEffect(() => {
        fetch(`${import.meta.env.VITE_url}/issues/${idNumber}`)
            .then((response) => response.json())
            .then((response) => setIssue(response))
            .catch((error) => console.log(error));
    }, [idNumber]);

    if (!issue) return;
    if (issue === null) return;

    const status = issue.status;
    const title = issue.title;
    const tags = issue.tags;
    const description = issue.description;
    const date = issue.date;
    const assignee = issue.assignee;
    const priority = issue.priority;
    const project = issue.project;
    const overdue = isOverdue(issue.date);

    const tagELements = tags.map((tag) => (
        <Tag key={crypto.randomUUID()} text={tag}></Tag>
    ));

    return (
        <>
            <div className="issuePage">
                <div className={`issueCard ${status}`}>
                    <div className="firstColumn">
                        <span>#{id}</span>
                        <div className="tags">
                            {overdue && status !== "completed" && (
                                <span className="overdue">Overdue</span>
                            )}
                            <span>{priority}</span>
                            <Badge text={status}></Badge>
                        </div>
                    </div>
                    <span className="title">{title}</span>
                    <div className="container">
                        <span className="dateContainer">Date:{date}</span>
                        <div className="projectContainer">
                            <span>Project:</span>
                            <span>{project}</span>
                        </div>
                        <div className="assigneeContainer">
                            <span>Assignee:</span>
                            <span>{assignee}</span>
                        </div>
                    </div>
                    <div className="description">
                        <span>{description}</span>
                    </div>
                    <div className="tagContainer">{tagELements}</div>
                </div>
            </div>
        </>
    );
}
