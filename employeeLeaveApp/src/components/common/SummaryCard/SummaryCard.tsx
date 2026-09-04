import styles from "./SummaryCard.module.css";
import ProgressBar from "../ProgressBar";

export default function SummaryCard({
    leavesTaken,
    totalLeaves,
    typeOfLeave,
}: {
    leavesTaken: number;
    totalLeaves: number;
    typeOfLeave: string;
}) {
    const percentage = (leavesTaken / totalLeaves) * 100;
    // const leavesTaken = 12;
    // const totalLeaves = 20;
    // const typeOfLeave = "annual leave";

    return (
        <div className={styles.card}>
            <div className={styles.details}>
                <div className={styles.detailsText}>
                    <span>{typeOfLeave.toUpperCase()}</span>
                    <span className={styles.leaves}>
                        {leavesTaken}/{totalLeaves}
                    </span>
                    <span>Days used</span>
                </div>
                <div className={styles.remaining}>
                    <span>{totalLeaves - leavesTaken} left</span>
                </div>
            </div>
            <ProgressBar percentage={percentage}></ProgressBar>
            <div className={styles.used}>
                {Math.floor(percentage)}% of allowance is used
            </div>
        </div>
    );
}
