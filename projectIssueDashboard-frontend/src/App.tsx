import "./App.css";
import MainLayout from "./MainLayout";
import Projects from "./pages/Projects";
import Issues from "./pages/Issues";
import { Route, Routes } from "react-router";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Issue from "./pages/Issue";
import { useEffect, useState } from "react";
import type { Issue as typeIssue } from "./types/issues";

function App() {
    async function loadIssues() {
        setSpinner(true);
        setError(false);
        fetch(`${import.meta.env.VITE_url}/issues`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Response is not ok");
                }

                return response.json();
            })
            .then((response) => {
                updateIssuesList(response);
                setSpinner(false);
            })
            .catch((error) => {
                setSpinner(false);
                setError(true);
                console.log(error);
            });
    }

    const [issuesList, updateIssuesList] = useState<typeIssue[]>([]);
    const [spinner, setSpinner] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        loadIssues();
    }, []);

    return (
        <>
            <main>
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path="projects" element={<Projects />} />
                        <Route path="issues/*">
                            <Route
                                index
                                element={
                                    <Issues
                                        issuesList={issuesList}
                                        updateIssuesList={updateIssuesList}
                                        spinner={spinner}
                                        error={error}
                                        loadIssues={loadIssues}
                                    />
                                }
                            ></Route>
                            <Route path=":id" element={<Issue />}></Route>;
                        </Route>
                        <Route
                            path="profile"
                            element={
                                <Profile
                                    name="Pedri Potter"
                                    bio="Best Midfielder"
                                    userName="Magician"
                                    email="pedri@gmail.com"
                                    url="https://picsum.photos/id/101/200/300"
                                />
                            }
                        />
                    </Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </main>
        </>
    );
}

export default App;
