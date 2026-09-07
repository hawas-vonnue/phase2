import styles from "./Error.module.css";

export default function Error({ handleRetry }: { handleRetry: () => void }) {
    return (
        <div className={styles.container}>
            <span>Fetching Failed</span>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    handleRetry();
                }}
            >
                Retry
            </button>
        </div>
    );
}
