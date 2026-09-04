import styles from "./Avatar.module.css";

export default function Avatar({ url, size }: { url: string; size: number }) {
    return (
        <div className={styles.avatar}>
            <img src={url} alt="image" width={size} height={size} />
        </div>
    );
}
