import "./Avatar.css";
export default function Avatar({
    url,
    width,
    height,
}: {
    url: string;
    width: number;
    height: number;
}) {
    return (
        <div className="avatar">
            <img src={url} alt="profile image" width={width} height={height} />
        </div>
    );
}
