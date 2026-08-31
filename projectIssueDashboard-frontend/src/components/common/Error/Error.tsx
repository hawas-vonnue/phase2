import "./Error.css";

export default function Error({ loadFunction }: { loadFunction: () => void }) {
    return (
        <div className="errorContainer">
            <span>Error in fetching</span>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    loadFunction();
                }}
            >
                Retry
            </button>
        </div>
    );
}
