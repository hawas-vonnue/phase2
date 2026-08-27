import "./CreateIssueButton.css";

function eventHandler() {
    const modal = document.querySelector(".createIssueModal") as HTMLElement;
    modal!.style.display = "flex";
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
}
export default function CreateIssueButton() {
    return (
        <div className="buttonContainer" onClick={eventHandler}>
            <button>Create Issue</button>
        </div>
    );
}
