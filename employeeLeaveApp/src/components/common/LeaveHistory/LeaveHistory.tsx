import styles from "./LeaveHistory.module.css";
import LeaveRecord from "../LeaveRecord";
import { type LeaveType } from "../../../types/types";

export default function LeaveHistory({
    leaveList,
}: {
    leaveList: LeaveType[];
}) {
    const leaveElements = leaveList.map((element) => {
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
            <div className={styles.leaves}>{leaveElements}</div>
        </div>
    );
}
