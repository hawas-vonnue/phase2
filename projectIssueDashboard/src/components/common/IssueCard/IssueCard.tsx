import "./IssueCard.css";
import Badge from "../Badge";
import Tag from "../Tag";

export default function IssueCard({
    id,
    status,
    text,
    tag,
}: {
    id: number;
    status: string;
    text: string;
    tag: string;
}) {
    return (
        <div className="issueCard">
            <div className="firstColumn">
                <span>id {id}</span>
                <Badge text={status}></Badge>
            </div>
            <span>{text}</span>
            <Tag text={tag}></Tag>
        </div>
    );
}
