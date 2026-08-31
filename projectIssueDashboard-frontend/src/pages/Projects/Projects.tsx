import "./Projects.css";
import ProjectCard from "../../components/common/ProjectCard";
import EmptyState from "../../components/common/EmptyState";
import { useEffect, useState } from "react";
import Loading from "../../components/common/Loading";
import Error from "../../components/common/Error";

export default function Projects() {
    function loadProjects() {
        setError(false);
        setSpinner(true);
        fetch(`${import.meta.env.VITE_url}/projects`)
            .then((response) => {
                if (!response.ok) setError(true);

                return response.json();
            })
            .then((response) => {
                updateProjectList(response);
                setSpinner(false);
            })
            .catch((error) => {
                console.log(error);
                setSpinner(false);
                setError(true);
            });
    }

    interface Project {
        id: number;
        text: string;
        name: string;
        status: string;
    }

    const [projectList, updateProjectList] = useState<Project[]>([]);
    const [spinner, setSpinner] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        loadProjects();
    }, []);

    const projectCards = projectList.map((project) => (
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
            {spinner ? (
                <Loading />
            ) : error ? (
                <Error loadFunction={loadProjects} />
            ) : (
                <div className="projects">
                    {projectCards.length === 0 ? (
                        <EmptyState></EmptyState>
                    ) : (
                        projectCards
                    )}
                </div>
            )}
        </>
    );
}
