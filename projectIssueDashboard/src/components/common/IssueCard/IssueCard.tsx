import "./IssueCard.css";
import Badge from "../Badge";
import Tag from "../Tag";
import type { FormValues } from "../../../types/issues";

export default function IssueCard({
    id,
    status,
    title,
    tags,
    priority,
    date,
    overdue,
    assignee,
    description,
    project,
    updateFormValues,
    updateEditStatus,
}: {
    id: number;
    status: string;
    title: string;
    tags: string[];
    priority: string;
    date: string;
    overdue: boolean;
    assignee: string;
    description: string;
    project: string;
    updateFormValues: (arg: FormValues) => void;
    updateEditStatus: (arg: { isEdit: boolean; id: number }) => void;
}) {
    const tagELements = tags.map((tag) => (
        <Tag key={crypto.randomUUID()} text={tag}></Tag>
    ));

    function clickHandler(event: React.MouseEvent) {
        event.preventDefault();
        const formValue: FormValues = {
            status: status,
            title,
            tags: tags.join(","),
            priority,
            date: date,
            assignee,
            description,
            project,
        };

        updateEditStatus({ isEdit: true, id: id });
        updateFormValues(formValue);

        const modal = document.querySelector(
            ".createIssueModal"
        ) as HTMLElement;
        modal!.style.display = "flex";
        document.body.style.overflow = "hidden";
        window.scrollTo(0, 0);
    }

    return (
        <div className={`issueCard ${status}`}>
            <div className="firstColumn">
                <span>id {id}</span>
                <div className="tags">
                    {overdue && status !== "completed" && (
                        <span className="overdue">Overdue</span>
                    )}
                    <span>{priority}</span>
                    <Badge text={status}></Badge>
                    <button className="editContainer" onClick={clickHandler}>
                        <img
                            src="https://img.icons8.com/?size=100&id=59770&format=png&color=ffffffff"
                            alt="edit icon"
                        />
                    </button>
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
    );
}
