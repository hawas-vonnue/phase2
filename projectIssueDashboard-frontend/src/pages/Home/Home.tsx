import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import "./Home.css";

export default function Home() {
    useDocumentTitle("Home");

    return <div>Home page</div>;
}
