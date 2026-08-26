import "./IssueCard.css";
import Badge from "../Badge";
import Tag from "../Tag";

export default function IssueCard({
    id,
    status,
    text,
    tag,
    priority,
    date,
    overdue,
}: {
    id: number;
    status: string;
    text: string;
    tag: string;
    priority: string;
    date: string;
    overdue: boolean;
}) {
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
                </div>
            </div>
            <span className="dateContainer">Date:{date}</span>
            <span>{text}</span>
            <Tag text={tag}></Tag>
        </div>
    );
}
