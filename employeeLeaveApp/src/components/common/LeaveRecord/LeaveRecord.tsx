import styles from "./LeaveRecord.module.css";
import StatusBadge from "../StatusBadge/StatusBadge";

export default function LeaveRecord({
    type,
    startDate,
    endDate,
    totalDays,
    status,
}: {
    type: string;
    startDate: string;
    endDate: string;
    totalDays: number;
    status: string;
}) {
    return (
        <div className={styles.container}>
            <div className={styles.field}>
                <span>{type} Leave</span>
            </div>
            <div className={styles.field}>
                <span>{startDate}</span>
                <svg
                    width="14"
                    height="20"
                    viewBox="0 0 14 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M7.52699 15L6.76136 14.2443L9.91335 11.0923H1.75V9.99858H9.91335L6.76136 6.85653L7.52699 6.09091L11.9815 10.5455L7.52699 15Z"
                        fill="#ffffff"
                    />
                </svg>

                <span>{endDate}</span>
            </div>
            <div className={styles.field}>
                <span>{totalDays} days</span>
            </div>
            <StatusBadge status={status}></StatusBadge>
        </div>
    );
}
