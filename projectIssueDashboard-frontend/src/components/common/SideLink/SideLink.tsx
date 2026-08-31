import "./SideLink.css";
// import { useNavigate } from "react-router";
import { NavLink } from "react-router";

export default function SideLink({ text, url }: { text: string; url: string }) {
    // const navigate = useNavigate();
    return (
        <div className="sideLink">
            <NavLink
                to={text === "Home" ? "" : text.toLowerCase()}
                className={({ isActive }) => (isActive ? "active" : "")}
            >
                <img src={url} alt="icon" />
                <span>{text}</span>
            </NavLink>
        </div>
    );
}
