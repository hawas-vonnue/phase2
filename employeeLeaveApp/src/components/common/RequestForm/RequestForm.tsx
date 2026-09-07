import styles from "./RequestForm.module.css";
import React, { useState } from "react";
import { type LeaveType } from "../../../types/types";
import { calculateTotalDays } from "../../../utils/util";
import { validate } from "../../../utils/validate";

export default function RequestForm({
    setLeaves,
    leaves,
}: {
    setLeaves: React.Dispatch<React.SetStateAction<LeaveType[]>>;
    leaves: LeaveType[];
}) {
    const [formValues, setFormValues] = useState({
        type: "",
        start: "",
        end: "",
        reason: "",
    });

    function onSubmit() {
        const validObj = validate(formValues);

        if (!validObj.isValid) {
            alert(validObj.error);

            return;
        }

        const totalDays = calculateTotalDays(formValues.start, formValues.end);
        const leaveClone = structuredClone(leaves);
        const leaveRequest: LeaveType = {
            type: formValues.type,
            startDate: formValues.start,
            endDate: formValues.end,
            reason: formValues.reason,
            status: "pending",
            totalDays,
        };

        leaveClone.push(leaveRequest);
        fetch(`${import.meta.env.VITE_url}/leaves`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(leaveRequest),
        });

        setLeaves(leaveClone);
        setFormValues({
            type: "",
            start: "",
            end: "",
            reason: "",
        });
        alert("Request send");
    }

    return (
        <div className={styles.formContainer}>
            <div className={styles.titleContainer}>
                <div className={styles.leaveRequest}>
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5 8H11M5 5H11M5 11H9"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                        <path
                            d="M12 2H4C2.89543 2 2 2.89543 2 4V12C2 13.1046 2.89543 14 4 14H12C13.1046 14 14 13.1046 14 12V4C14 2.89543 13.1046 2 12 2Z"
                            stroke="white"
                            strokeWidth="1.5"
                        />
                    </svg>
                    <span>Request Leave</span>
                </div>
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
            >
                <div className={styles.container}>
                    <label htmlFor="type">LEAVE TYPE</label>
                    <select
                        name="type"
                        id="type"
                        value={formValues.type}
                        onChange={(e) => {
                            e.preventDefault();
                            setFormValues({
                                ...formValues,
                                type: e.target.value,
                            });
                        }}
                    >
                        <option value="">Select a leave type</option>
                        <option value="annual">Annual leave</option>
                        <option value="sick">Sick leave</option>
                        <option value="paid">Paid leave</option>
                    </select>
                </div>
                <div className={styles.container}>
                    <span>Duration</span>
                    <div className={styles.containerParent}>
                        <div className={styles.container}>
                            <label htmlFor="start">Start Date</label>
                            <input
                                type="date"
                                id="start"
                                value={formValues.start}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setFormValues({
                                        ...formValues,
                                        start: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <div className={styles.container}>
                            <label htmlFor="end">End Date</label>
                            <input
                                type="date"
                                id="end"
                                value={formValues.end}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setFormValues({
                                        ...formValues,
                                        end: e.target.value,
                                    });
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.container}>
                    <label htmlFor="reason">Reason for absence</label>
                    <textarea
                        name="reason"
                        id="reason"
                        placeholder="Briefly describe the reason for your leave request..."
                        value={formValues.reason}
                        onChange={(e) => {
                            e.preventDefault();
                            setFormValues({
                                ...formValues,
                                reason: e.target.value,
                            });
                        }}
                    ></textarea>
                </div>
                <button type="submit">Submit Request</button>
                <span>
                    Requests are reviewed within 2 business days. You'll be
                    notified by email.
                </span>
            </form>
        </div>
    );
}
