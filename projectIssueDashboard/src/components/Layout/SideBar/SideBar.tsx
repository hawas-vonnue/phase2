import "./SideBar.css";
import SideLink from "../../common/SideLink";

export default function SideBar() {
    return (
        <div className="sideBarContainer">
            <div className="sideBar">
                <SideLink
                    text="Home"
                    url="https://img.icons8.com/?size=100&id=TZ2lKyH3LVjx&format=png&color=ffffffff"
                ></SideLink>
                <SideLink
                    text="Projects"
                    url="https://img.icons8.com/?size=100&id=105288&format=png&color=ffffffff"
                ></SideLink>
                <SideLink
                    text="Issues"
                    url="https://img.icons8.com/?size=100&id=360&format=png&color=ffffffff"
                ></SideLink>
                <SideLink
                    text="Settings"
                    url="https://img.icons8.com/?size=100&id=364&format=png&color=ffffffff"
                ></SideLink>
            </div>
        </div>
    );
}
