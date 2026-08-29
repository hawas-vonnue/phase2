import "./Projects.css";
import ProjectCard from "../../components/common/ProjectCard";
import { projectsSeedList } from "../../utils/projectLists";
import EmptyState from "../../components/common/EmptyState";

export default function Projects() {
    const projectCards = projectsSeedList.map((project) => (
        <ProjectCard
            key={project.id}
            id={project.id}
            text={project.text}
            name={project.name}
            status={project.status}
        />
    ));
    return (
        <>
            <h2>Projects</h2>
            <div className="projects">
                {projectCards.length === 0 ? (
                    <EmptyState></EmptyState>
                ) : (
                    projectCards
                )}
            </div>
        </>
    );
}
