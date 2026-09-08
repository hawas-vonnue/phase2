import "./Filter.css";

export default function Filter({
    // isFilterOn,
    filterValues,
    // updateFilterStatus,
    updateFilterValues,
    sortValues,
    updateSortValues,
}: {
    // isFilterOn: boolean;
    filterValues: {
        search: string;
        status: string;
        priority: string;
    };
    // updateFilterStatus: (arg: boolean) => void;
    updateFilterValues: (newFilterValues: {
        search: string;
        status: string;
        priority: string;
    }) => void;
    sortValues: { field: string; direction: string };
    updateSortValues: (newSortValues: {
        field: string;
        direction: string;
    }) => void;
}) {
    function expand(event: React.MouseEvent) {
        event.preventDefault();
        const expandElement = document.querySelector(".expand") as HTMLElement;
        expandElement.classList.toggle("open");
        // updateFilterStatus(!isFilterOn);
    }

    function clear(event: React.MouseEvent) {
        event.preventDefault();

        updateFilterValues({
            search: "",
            status: "",
            priority: "",
        });

        updateSortValues({
            field: "",
            direction: "asc",
        });
    }

    function handleSortChange(type: "field" | "direction", value: string) {
        updateSortValues({
            ...sortValues,
            [type]: value,
        });
    }

    function handleChange(
        type: "priority" | "status" | "search",
        value: string
    ) {
        updateFilterValues({
            ...filterValues,
            [type]: value,
        });
    }

    return (
        <div>
            <div className="menuContainer">
                <button onClick={expand}>
                    <img
                        src="https://img.icons8.com/?size=100&id=21636&format=png&color=ffffffff"
                        alt="filter icon"
                    />
                </button>
            </div>
            <div className="expand">
                <div className="filterCard">
                    <div className="searchContainer">
                        <label htmlFor="search">Search:</label>
                        <input
                            type="text"
                            id="search"
                            value={filterValues.search}
                            onChange={(e) =>
                                handleChange("search", e.target.value)
                            }
                        />
                    </div>
                    <div className="filterContainer">
                        <label htmlFor="status">Status:</label>
                        <select
                            name="status"
                            id="status"
                            value={filterValues.status}
                            onChange={(e) =>
                                handleChange("status", e.target.value)
                            }
                        >
                            <option value="">Select status</option>
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className="filterContainer">
                        <label htmlFor="priority">Priority:</label>
                        <select
                            name="priority"
                            id="priority"
                            value={filterValues.priority}
                            onChange={(e) =>
                                handleChange("priority", e.target.value)
                            }
                        >
                            <option value="">Select priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div className="clearButtonContainer">
                        <button onClick={clear}>Clear</button>
                    </div>
                </div>
                <div className="sortCard">
                    <div className="sortContainer">
                        <label htmlFor="sort">Sort:</label>
                        <select
                            name="sort"
                            id="sort"
                            value={sortValues.field}
                            onChange={(e) => {
                                e.preventDefault();
                                handleSortChange("field", e.target.value);
                            }}
                        >
                            <option value="">Select a Field to Sort</option>
                            <option value="id">Id</option>
                            <option value="priority">Priority</option>
                            <option value="date">Date</option>
                            <option value="status">Status</option>
                        </select>
                    </div>
                    <div className="sortContainer">
                        <label htmlFor="direction">Direction:</label>
                        <select
                            name="direction"
                            id="direction"
                            value={sortValues.direction}
                            onChange={(e) => {
                                e.preventDefault();
                                handleSortChange("direction", e.target.value);
                            }}
                        >
                            <option value="asc">ASC</option>
                            <option value="desc">DESC</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
