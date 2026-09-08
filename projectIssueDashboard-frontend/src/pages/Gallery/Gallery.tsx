import "./Gallery.css";
import SideBar from "../../components/Layout/SideBar";
import Header from "../../components/Layout/Header";
import ProjectCard from "../../components/common/ProjectCard";
import IssueCard from "../../components/common/IssueCard";
import Badge from "../../components/common/Badge";
import Avatar from "../../components/common/Avatar";
import EmptyState from "../../components/common/EmptyState";

export default function Gallery() {
    return (
        <div className="gallery">
            <h1>Gallery</h1>
            <h2>Header component</h2>
            <Header url="https://picsum.photos/id/101/200/300"></Header>
            <h2>Sidebar component</h2>
            <SideBar></SideBar>
            <h2>Project card</h2>
            <ProjectCard
                name="Project"
                id={12}
                text="description"
                status="pending"
            ></ProjectCard>
            <h2>Issue card</h2>
            <IssueCard
                id={10}
                status="Pending"
                title="Issue"
                priority="High"
                description="Description"
                assignee="User 1"
                project="Project 1"
                tags={["tag1", "tag2"]}
                date="2024-12-01"
                overdue={false}
                updateEditStatus={() => console.log("hie")}
                updateFormValues={() => console.log("hello")}
            ></IssueCard>
            <h2>Badge</h2>
            <Badge text="badge"></Badge>
            <h2>Avatar</h2>
            <Avatar
                url="https://picsum.photos/id/101/200/300"
                width={200}
                height={200}
            ></Avatar>
            <h2>Empty state</h2>
            <EmptyState></EmptyState>
        </div>
    );
}
