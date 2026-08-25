import "./SideLink.css";

export default function SideLink({ text, url }: { text: string; url: string }) {
    return (
        <div className="sideLink">
            <img src={url} alt="icon" />
            <span>{text}</span>
        </div>
    );
}
