import { useState, useEffect } from "react";

interface Project {
    id: number;
    text: string;
    name: string;
    status: string;
}

export function useProjects() {
    const [projectList, updateProjectList] = useState<Project[]>([]);
    const [spinner, setSpinner] = useState(true);
    const [error, setError] = useState(false);

    function fetchData() {
        let isMounted = true;

        fetch(`${import.meta.env.VITE_url}/projects`)
            .then((response) => {
                if (!response.ok) setError(true);

                return response.json();
            })
            .then((response) => {
                if (isMounted) {
                    updateProjectList(response);
                    setSpinner(false);
                }
            })
            .catch((error) => {
                console.log(error);
                if (isMounted) {
                    setSpinner(false);
                    setError(true);
                }
            });

        return () => {
            isMounted = false;
        };
    }

    const loadProjects = () => {
        setSpinner(true);
        setError(false);
        fetchData();
    };

    useEffect(() => {
        return fetchData();
    }, []);

    return { spinner, projectList, error, loadProjects };
}
