import styles from "./Leave.module.css";
import SummaryCardContainer from "../../components/common/SummaryCardContainer";
import RequestForm from "../../components/common/RequestForm";
import Filter from "../../components/common/Filter";
import LeaveHistory from "../../components/common/LeaveHistory/LeaveHistory";
import { useEffect, useState } from "react";
import { type LeaveType } from "../../types/types";
import filter from "../../utils/filter";
import Loading from "../../components/common/Loading";
import Empty from "../../components/common/Empty";
import Error from "../../components/common/Error";

export default function Leave() {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [leaves, setLeaves] = useState<LeaveType[]>([]);
    const [isError, setError] = useState<boolean>(false);
    const [retryCount, setRetryCount] = useState<number>(0);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_url}/leaves`)
            .then((response) => response.json())
            .then((leaveList) => {
                setLeaves(leaveList);
            })
            .catch((error) => {
                console.log(error);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [retryCount]);

    const [filterValues, setFilterValues] = useState({
        search: "",
        status: "",
        type: "",
    });

    const filteredLeaves = filter(leaves, filterValues);

    const handleRetry = () => {
        setLoading(true);
        setError(false);
        setRetryCount((prev) => prev + 1);
    };

    return isLoading ? (
        <Loading />
    ) : isError ? (
        <Error handleRetry={handleRetry} />
    ) : (
        <div className={styles.mainContainer}>
            <div className={styles.leaveContainer}>
                <SummaryCardContainer leaveList={leaves}></SummaryCardContainer>
                <Filter
                    filterValues={filterValues}
                    setFilterValues={setFilterValues}
                ></Filter>
                {filteredLeaves.length === 0 ? (
                    <Empty />
                ) : (
                    <LeaveHistory leaveList={filteredLeaves}></LeaveHistory>
                )}
            </div>
            <RequestForm setLeaves={setLeaves} leaves={leaves}></RequestForm>
        </div>
    );
}
