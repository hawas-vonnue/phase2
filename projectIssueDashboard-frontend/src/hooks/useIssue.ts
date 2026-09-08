import { useEffect, useState } from "react";
import { type Issue } from "../types/issues";

export function useIssue(id: number) {
    const [issue, setIssue] = useState<Issue | null>(null);
    useEffect(() => {
        const token =
            localStorage.getItem("token") || sessionStorage.getItem("token");
        fetch(`${import.meta.env.VITE_url}/issues/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((response) => setIssue(response))
            .catch((error) => console.log(error));
    }, [id]);

    return { issue };
}
