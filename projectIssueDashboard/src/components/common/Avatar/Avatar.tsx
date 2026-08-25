import "./Avatar.css";
export default function Avatar({ url }: { url: string }) {
    return (
        <div className="avatar">
            <img src={url} alt="profile image" />
        </div>
    );
}
