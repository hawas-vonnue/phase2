import SideBar from "./components/Layout/SideBar";
import { Outlet } from "react-router";
import "./MainLayout.css";
import Header from "./components/Layout/Header";

export default function MainLayout() {
    return (
        <div className="main">
            <Header url="https://picsum.photos/id/101/200/300"></Header>
            <SideBar />
            <div className="mainContent">
                <Outlet />
            </div>
        </div>
    );
}
