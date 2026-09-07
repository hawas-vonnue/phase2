import styles from "./Empty.module.css";

export default function Empty() {
    return (
        <div className={styles.container}>
            <span>No leave history to show</span>
        </div>
    );
}
