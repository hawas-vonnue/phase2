import styles from "./LeaveHistory.module.css";
import LeaveRecord from "../LeaveRecord";
import { type LeaveType } from "../../../types/types";
import PageFooter from "../PageFooter";
import { useState } from "react";

export default function LeaveHistory({
    leaveList,
}: {
    leaveList: LeaveType[];
}) {
    const [pageNumber, setPageNumber] = useState(1);

    const pageSize = 8;

    const startIndex = (pageNumber - 1) * pageSize;
    const totalPageNumber = Math.ceil(leaveList.length / pageSize);
    const reducedLeavList = leaveList.slice(
        startIndex,
        startIndex + pageSize + 1
    );

    const leaveElements = reducedLeavList.map((element) => {
        return (
            <LeaveRecord
                key={crypto.randomUUID()}
                type={element.type}
                startDate={element.startDate}
                endDate={element.endDate}
                status={element.status}
                totalDays={element.totalDays}
            />
        );
    });

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <span>Leave History</span>
                <span>FY 2026</span>
            </div>
            <div className={styles.tableHeading}>
                <span>Leave type</span>
                <span>Requested dates</span>
                <span>total days</span>
                <span>status</span>
            </div>
            <div className={styles.leaves}>
                {leaveElements}
                <PageFooter
                    setPageNumber={setPageNumber}
                    pageNumber={pageNumber}
                    totalPageNumber={totalPageNumber}
                    pageSize={pageSize}
                    total={leaveList.length}
                ></PageFooter>
            </div>
        </div>
    );
}
