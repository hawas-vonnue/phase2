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
import ProtectedRoute from "./components/ProtectedRoute";
import Gallery from "./pages/Gallery";

function App() {
    // const { loadIssues, setIssueState, issueState } = useIssues();

    return (
        <>
            <main>
                <Routes>
                    <Route path="gallery" element={<Gallery />}></Route>
                    <Route path="login" element={<Login />} />
                    <Route element={<ProtectedRoute />}>
                        <Route element={<MainLayout />}>
                            <Route index element={<Home />} />
                            <Route path="projects" element={<Projects />} />
                            <Route path="issues/*">
                                <Route index element={<Issues />}></Route>
                                <Route path=":id" element={<Issue />}></Route>;
                            </Route>
                            <Route path="profile" element={<Profile />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </main>
        </>
    );
}

export default App;
