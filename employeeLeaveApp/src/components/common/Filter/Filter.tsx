import styles from "./Filter.module.css";
import React from "react";

export default function Filter({
    filterValues,
    setFilterValues,
}: {
    filterValues: { search: string; status: string; type: string };
    setFilterValues: React.Dispatch<
        React.SetStateAction<{
            search: string;
            status: string;
            type: string;
        }>
    >;
}) {
    return (
        <div className={styles.container}>
            <label htmlFor="searc">Search</label>
            <input
                type="text"
                placeholder="Search leave reason"
                value={filterValues.search}
                onChange={(e) => {
                    e.preventDefault();
                    setFilterValues({
                        ...filterValues,
                        search: e.target.value,
                    });
                }}
            />
            <div className={styles.filter}>
                <label htmlFor="status">status</label>
                <select
                    name="status"
                    id="status"
                    value={filterValues.status}
                    onChange={(e) => {
                        e.preventDefault();
                        setFilterValues({
                            ...filterValues,
                            status: e.target.value,
                        });
                    }}
                >
                    <option value="">All status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
                <label htmlFor="type">leave type</label>
                <select
                    name="type"
                    id="type"
                    value={filterValues.type}
                    onChange={(e) => {
                        e.preventDefault();
                        setFilterValues({
                            ...filterValues,
                            type: e.target.value,
                        });
                    }}
                >
                    <option value="">All leave types</option>
                    <option value="annual">Annual</option>
                    <option value="sick">Sick</option>
                    <option value="paid">Paid</option>
                </select>
            </div>
        </div>
    );
}
