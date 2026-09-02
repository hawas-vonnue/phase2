import { useState, useEffect } from "react";
import { type Issue } from "../types/issues";

export interface IssueState {
    list: Issue[];
    spinner: boolean;
    error: boolean;
}

export function useIssues() {
    const [issueState, setIssueState] = useState<IssueState>({
        list: [],
        spinner: true,
        error: false,
    });

    function fetchData() {
        let isMounted = true;

        const token =
            localStorage.getItem("token") || sessionStorage.getItem("token");

        fetch(`${import.meta.env.VITE_url}/issues`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Response is not ok");
                }

                return response.json();
            })
            .then((response) => {
                if (isMounted) {
                    setIssueState((prevState) => ({
                        ...prevState,
                        list: response,
                        spinner: false,
                    }));
                }
            })
            .catch((error) => {
                console.log(error);
                if (isMounted) {
                    setIssueState((prevState) => ({
                        ...prevState,
                        spinner: false,
                        error: true,
                    }));
                }
            });

        return () => {
            isMounted = false;
        };
    }

    function loadIssues() {
        setIssueState((prevState) => ({
            ...prevState,
            spinner: true,
            error: false,
        }));

        fetchData();
    }

    useEffect(() => {
        return fetchData();
    }, []);

    return { issueState, loadIssues, setIssueState };
}
