import "./ProjectCard.css";
import Badge from "../Badge";

export default function ProjectCard({
    name,
    id,
    text,
    status,
}: {
    name: string;
    id: number;
    text: string;
    status: string;
}) {
    return (
        <div className="projectCard">
            <div className="firstColumn">
                <div className="titleContainer">
                    <span className="title">{name}</span>
                    <span className="idContainer">id:{id}</span>
                </div>
                <Badge text={status}></Badge>
            </div>
            <span>{text}</span>
        </div>
    );
}
