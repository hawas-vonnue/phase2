import "./Issues.css";
import CreateIssueButton from "../../components/common/CreateIssueButton";
import Filter from "../../components/common/Filter";
import EmptyState from "../../components/common/EmptyState";
import { type FormValues } from "../../types/issues";
import { filterIssues } from "../../utils/filterIssues";
import { sortIssues } from "../../utils/sortIssues";
import { useState } from "react";
import CreateIssueModal from "../../components/common/CreateIssueModal";
import IssueCard from "../../components/common/IssueCard";
import Loading from "../../components/common/Loading";
import Error from "../../components/common/Error";
import useDebounce from "../../hooks/useDebounce";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useIssues } from "../../hooks/useIssues";

function isOverdue(date: string) {
    const currentDate = new Date();
    // only compares date not time
    currentDate.setHours(0, 0, 0, 0);
    const lastDate = new Date(date);
    const isPast = +lastDate - +currentDate < 0;

    return isPast;
}

export default function Issues() {
    useDocumentTitle("Issues");

    const { loadIssues, setIssueState, issueState } = useIssues();

    const issuesList = issueState.list;
    const spinner = issueState.spinner;
    const error = issueState.error;

    // const [isFilterOn, updateFilterStatus] = useState(false);

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

    const debouncedSearchTerm = useDebounce(filterValues.search, 500);

    const filterdIssues = filterIssues(issuesList, {
        ...filterValues,
        search: debouncedSearchTerm,
    });

    const sortedIssues = sortIssues(filterdIssues, sortValues);

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

    return (
        <>
            <CreateIssueModal
                setIssueState={setIssueState}
                issuesList={issuesList}
                formValues={formValues}
                updateFormValues={updateFormValues}
                editStatus={editStatus}
                updateEditStatus={updateEditStatus}
            ></CreateIssueModal>
            <h2>ISSUES</h2>
            {spinner ? (
                <Loading />
            ) : error ? (
                <Error loadFunction={loadIssues} />
            ) : (
                <>
                    <div className="accessories">
                        <CreateIssueButton></CreateIssueButton>
                        <Filter
                            filterValues={filterValues}
                            // isFilterOn={isFilterOn}
                            // updateFilterStatus={updateFilterStatus}
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
                </>
            )}
        </>
    );
}
