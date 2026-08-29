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
import { issuesSeedList } from "./utils/issueCardList";
import { useState } from "react";

function App() {
    const [issuesList, updateIssuesList] = useState(issuesSeedList);

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
                                    />
                                }
                            ></Route>
                            <Route
                                path=":id"
                                element={<Issue issuesList={issuesList} />}
                            ></Route>
                            ;
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
