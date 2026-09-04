import styles from "./ProgressBar.module.css";

export default function ProgressBar({ percentage }: { percentage: number }) {
    const cleanPercentage = Math.min(Math.max(percentage, 0), 100);

    return (
        <div className={styles.trackStyle}>
            <div
                className={styles.progressStyle}
                style={{ width: `${cleanPercentage}%` }}
            />
        </div>
    );
}
