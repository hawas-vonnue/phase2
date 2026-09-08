import "./Projects.css";
import ProjectCard from "../../components/common/ProjectCard";
import EmptyState from "../../components/common/EmptyState";
import Loading from "../../components/common/Loading";
import Error from "../../components/common/Error";
import { useProjects } from "../../hooks/useProjects";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export default function Projects() {
    useDocumentTitle("Projects");

    const { projectState, loadProjects } = useProjects();

    const grouped = Object.groupBy(projectState.list, ({ status }) => status);

    const sortedProjects = [
        ...(grouped.pending || []),
        ...(grouped.completed || []),
    ];

    const sortedProjectsList = sortedProjects.map((project) => (
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
            {projectState.spinner ? (
                <Loading />
            ) : projectState.error ? (
                <Error loadFunction={loadProjects} />
            ) : (
                <div className="projects">
                    {sortedProjects.length === 0 ? (
                        <EmptyState></EmptyState>
                    ) : (
                        sortedProjectsList
                    )}
                </div>
            )}
        </>
    );
}
