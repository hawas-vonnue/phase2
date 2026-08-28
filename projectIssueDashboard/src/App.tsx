import "./App.css";
import EmptyState from "./components/common/EmptyState";
import IssueCard from "./components/common/IssueCard";
import ProjectCard from "./components/common/ProjectCard";
import Header from "./components/Layout/Header";
import SideBar from "./components/Layout/SideBar";
import { issues } from "./utils/issueCardList";
import { projects } from "./utils/projectLists";
import CreateIssueButton from "./components/common/CreateIssueButton";
import CreateIssueModal from "./components/common/CreateIssueModal";
import { useState } from "react";
import Filter from "./components/common/Filter";
import { filterIssues } from "./utils/filterIssues";
import { sortIssues } from "./utils/sortIssues";
import type { FormValues } from "./types/issues";

function isOverdue(date: string) {
    const currentDate = new Date();
    // only compares date not time
    currentDate.setHours(0, 0, 0, 0);
    const lastDate = new Date(date);
    const isPast = +lastDate - +currentDate < 0;

    return isPast;
}

function App() {
    const [issuesList, updateIssuesList] = useState(issues);

    const [isFilterOn, updateFilterStatus] = useState(false);

    const [filterValues, updateFilterValues] = useState({
        search: "",
        status: "",
        priority: "",
    });

    const [sortValues, updateSortValues] = useState({
        field: "",
        direction: "",
    });

    const [editStatus, updateEditStatus] = useState({
        isEdit: false,
        id: -1,
    });

    const initialFormValue: FormValues = {
        date: "",
        status: "",
        priority: "",
        title: "",
        description: "",
        project: "",
        assignee: "",
        tags: "",
    };

    const [formValues, updateFormValues] = useState(initialFormValue);

    let filterdIssues;
    if (isFilterOn) {
        filterdIssues = filterIssues(issuesList, filterValues);
    } else filterdIssues = issuesList;

    let sortedIssues;

    if (isFilterOn) {
        sortedIssues = sortIssues(filterdIssues, sortValues);
    } else sortedIssues = filterdIssues;

    const issueCards = sortedIssues.map((issue) => (
        <IssueCard
            key={issue.id}
            date={issue.date}
            id={issue.id}
            title={issue.title}
            tags={issue.tags}
            status={issue.status}
            priority={issue.priority}
            overdue={isOverdue(issue.date)}
            description={issue.description}
            project={issue.project}
            assignee={issue.assignee}
            updateFormValues={updateFormValues}
            updateEditStatus={updateEditStatus}
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
                    <CreateIssueModal
                        updateIssuesList={updateIssuesList}
                        issuesList={issuesList}
                        formValues={formValues}
                        updateFormValues={updateFormValues}
                        editStatus={editStatus}
                        updateEditStatus={updateEditStatus}
                    ></CreateIssueModal>
                    <h2>Projects</h2>
                    <div className="projects">
                        {projectCards.length === 0 ? (
                            <EmptyState></EmptyState>
                        ) : (
                            projectCards
                        )}
                    </div>
                    <h2>ISSUES</h2>
                    <div className="accessories">
                        <CreateIssueButton></CreateIssueButton>
                        <Filter
                            filterValues={filterValues}
                            isFilterOn={isFilterOn}
                            updateFilterStatus={updateFilterStatus}
                            updateFilterValues={updateFilterValues}
                            updateSortValues={updateSortValues}
                            sortValues={sortValues}
                        ></Filter>
                    </div>
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
