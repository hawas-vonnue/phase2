import "./Tag.css";

export default function Tag({ text }: { text: string }) {
    return (
        <div className="tag">
            <img
                src="https://img.icons8.com/?size=100&id=23171&format=png&color=ffffff"
                alt="tag"
            />
            <span>{text}</span>
        </div>
    );
}
