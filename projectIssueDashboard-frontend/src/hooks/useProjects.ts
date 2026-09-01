import { useState, useEffect, useCallback } from "react";

interface Project {
    id: number;
    text: string;
    name: string;
    status: string;
}

interface ProjectState {
    list: Project[];
    spinner: boolean;
    error: boolean;
}

export function useProjects() {
    const [projectState, setProjectState] = useState<ProjectState>({
        list: [],
        error: false,
        spinner: true,
    });

    const fetchData = useCallback(() => {
        let isMounted = true;

        fetch(`${import.meta.env.VITE_url}/projects`)
            .then((response) => {
                if (!response.ok)
                    setProjectState((prevState) => ({
                        ...prevState,
                        error: true,
                    }));

                return response.json();
            })
            .then((response) => {
                if (isMounted) {
                    setProjectState((prevState) => ({
                        ...prevState,
                        list: response,
                        spinner: false,
                    }));
                }
            })
            .catch((error) => {
                console.log(error);
                if (isMounted) {
                    setProjectState((prevState) => ({
                        ...prevState,
                        spinner: false,
                        error: true,
                    }));
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const loadProjects = () => {
        setProjectState({ ...projectState, spinner: true, error: false });

        fetchData();
    };

    useEffect(() => {
        return fetchData();
    }, [fetchData]);

    return { projectState, loadProjects };
}
