import { useState, useEffect } from "react";
import { type Issue } from "../types/issues";

export function useIssues() {
    const [issuesList, updateIssuesList] = useState<Issue[]>([]);
    const [spinner, setSpinner] = useState(true);
    const [error, setError] = useState(false);

    function fetchData() {
        let isMounted = true;

        fetch(`${import.meta.env.VITE_url}/issues`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Response is not ok");
                }

                return response.json();
            })
            .then((response) => {
                if (isMounted) {
                    updateIssuesList(response);
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

    function loadIssues() {
        setSpinner(true);
        setError(false);
        fetchData();
    }

    useEffect(() => {
        return fetchData();
    }, []);

    return { issuesList, spinner, error, loadIssues, updateIssuesList };
}
