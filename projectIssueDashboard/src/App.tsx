import "./App.css";
import EmptyState from "./components/common/EmptyState";
import IssueCard from "./components/common/IssueCard";
import ProjectCard from "./components/common/ProjectCard";
import Header from "./components/Layout/Header";
import SideBar from "./components/Layout/SideBar";
import { issues } from "./utils/issueCardList";
import { projects } from "./utils/projectLists";

function isOverdue(date: string) {
    const currentDate = new Date();
    // only compares date not time
    currentDate.setHours(0, 0, 0, 0);
    const lastDate = new Date(date);
    const isPast = +lastDate - +currentDate < 0;

    return isPast;
}

function App() {
    const issueCards = issues.map((issue) => (
        <IssueCard
            key={issue.id}
            date={issue.date}
            id={issue.id}
            text={issue.text}
            tag={issue.tag}
            status={issue.status}
            priority={issue.priority}
            overdue={isOverdue(issue.date)}
        ></IssueCard>
    ));

    const projectCards = projects.map((project) => (
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
            <Header url="https://picsum.photos/id/101/200/300"></Header>
            <main>
                <SideBar></SideBar>
                <div className="mainContent">
                    <h2>Projects</h2>
                    <div className="projects">
                        {projectCards.length === 0 ? (
                            <EmptyState></EmptyState>
                        ) : (
                            projectCards
                        )}
                    </div>
                    <h2>ISSUES</h2>
                    <div className="issues">
                        {issueCards.length === 0 ? (
                            <EmptyState></EmptyState>
                        ) : (
                            issueCards
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}

export default App;
