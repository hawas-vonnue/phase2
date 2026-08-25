import "./App.css";
import IssueCard from "./components/common/IssueCard";
import ProjectCard from "./components/common/ProjectCard";
import Header from "./components/Layout/Header";
import SideBar from "./components/Layout/SideBar";
// import EmptyState from "./components/common/EmptyState";

function App() {
    return (
        <>
            <Header url="https://picsum.photos/id/101/200/300"></Header>
            <main>
                <SideBar></SideBar>
                <div className="mainContent">
                    <h2>Projects</h2>
                    <div className="projects">
                        <ProjectCard
                            name="First project"
                            id={4}
                            text="This is the description of first project"
                            status="Pending"
                        ></ProjectCard>
                        <ProjectCard
                            name="First project"
                            id={4}
                            text="This is the description of first project"
                            status="Pending"
                        ></ProjectCard>
                        <ProjectCard
                            name="First project"
                            id={4}
                            text="This is the description of first project"
                            status="Pending"
                        ></ProjectCard>
                    </div>
                    {/* <EmptyState></EmptyState> */}
                    <h2>ISSUES</h2>
                    <div className="issues">
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                        <IssueCard
                            id={1}
                            status="Pending"
                            text="Fix the issue with the allignments in the project"
                            tag="Security"
                        ></IssueCard>
                    </div>
                </div>
            </main>
        </>
    );
}

export default App;
