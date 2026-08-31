import "./Header.css";
import Avatar from "../../common/Avatar";

export default function Header({ url }: { url: string }) {
    return (
        <div className="header">
            <div className="titleContainer">
                <h1>Dash Board</h1>
            </div>
            <Avatar url={url} width={40} height={40}></Avatar>
        </div>
    );
}
