import "./Header.css";
import Avatar from "../../common/Avatar";
import { useAuth } from "../../../context/useAuth";
import { useNavigate } from "react-router";

export default function Header({ url }: { url: string }) {
    const { logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="header">
            <div className="titleContainer">
                <h1>Dash Board</h1>
            </div>
            <div className="rightEnd">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        logout();
                        navigate("/");
                    }}
                >
                    Logout
                </button>
                <Avatar url={url} width={40} height={40}></Avatar>
            </div>
        </div>
    );
}
