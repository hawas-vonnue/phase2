import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import "./NotFound.css";
import { Link } from "react-router";

export default function NotFound() {
    useDocumentTitle("Not Found");

    return (
        <div className="notFound">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <span>Sorry the Page you are looking for doesn't exit</span>
            <Link to={"/projects"}>Go back to projects</Link>
        </div>
    );
}
