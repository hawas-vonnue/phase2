import "./Badge.css";

export default function Badge({ text }: { text: string }) {
    return <div className={`badge ${text}`}>{text}</div>;
}
