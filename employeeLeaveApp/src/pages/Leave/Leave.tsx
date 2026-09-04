import styles from "./Leave.module.css";
import SummaryCardContainer from "../../components/common/SummaryCardContainer";
import RequestForm from "../../components/common/RequestForm";
import Filter from "../../components/common/Filter";
import LeaveHistory from "../../components/common/LeaveHistory/LeaveHistory";
import { useState } from "react";
import { type LeaveType } from "../../types/types";
import filter from "../../utils/filter";

const leaveList: LeaveType[] = [
    {
        type: "annual",
        startDate: "14-12-2026",
        endDate: "18-12-2026",
        reason: "annual",
        status: "pending",
        totalDays: 3,
    },
    {
        type: "sick",
        startDate: "14-12-2026",
        endDate: "15-12-2026",
        reason: "sick",
        status: "approved",
        totalDays: 2,
    },
    {
        type: "paid",
        startDate: "14-12-2026",
        endDate: "14-12-2026",
        reason: "paid",
        status: "rejected",
        totalDays: 1,
    },
    {
        type: "paid",
        startDate: "22-12-2026",
        endDate: "22-12-2026",
        reason: "Personal errands",
        status: "approved",
        totalDays: 1,
    },
    {
        type: "annual",
        startDate: "24-12-2026",
        endDate: "02-01-2027",
        reason: "Christmas and New Year family trip",
        status: "approved",
        totalDays: 7,
    },
    {
        type: "sick",
        startDate: "05-01-2027",
        endDate: "05-01-2027",
        reason: "Dental appointment",
        status: "approved",
        totalDays: 1,
    },
    {
        type: "annual",
        startDate: "11-01-2027",
        endDate: "15-01-2027",
        reason: "Extended personal leave",
        status: "rejected",
        totalDays: 5,
    },
    {
        type: "paid",
        startDate: "20-01-2027",
        endDate: "22-01-2027",
        reason: "Attending a family wedding",
        status: "pending",
        totalDays: 3,
    },
    {
        type: "sick",
        startDate: "01-02-2027",
        endDate: "03-02-2027",
        reason: "Flu symptoms",
        status: "approved",
        totalDays: 3,
    },
    {
        type: "annual",
        startDate: "12-02-2027",
        endDate: "12-02-2027",
        reason: "Home repairs tracking",
        status: "pending",
        totalDays: 1,
    },
    {
        type: "annual",
        startDate: "22-02-2027",
        endDate: "26-02-2027",
        reason: "Winter vacation",
        status: "approved",
        totalDays: 5,
    },
    {
        type: "paid",
        startDate: "08-03-2027",
        endDate: "09-03-2027",
        reason: "Moving to a new apartment",
        status: "approved",
        totalDays: 2,
    },
    {
        type: "sick",
        startDate: "15-03-2027",
        endDate: "16-03-2027",
        reason: "Food poisoning",
        status: "approved",
        totalDays: 2,
    },
    {
        type: "annual",
        startDate: "29-03-2027",
        endDate: "02-04-2027",
        reason: "Visa renewal tracking",
        status: "pending",
        totalDays: 5,
    },
    {
        type: "annual",
        startDate: "14-04-2027",
        endDate: "14-04-2027",
        reason: "Festival celebration",
        status: "approved",
        totalDays: 1,
    },
    {
        type: "annual",
        startDate: "03-05-2027",
        endDate: "14-05-2027",
        reason: "Summer international trip",
        status: "pending",
        totalDays: 10,
    },
    {
        type: "sick",
        startDate: "24-05-2027",
        endDate: "24-05-2027",
        reason: "Routine health checkup",
        status: "approved",
        totalDays: 1,
    },
    {
        type: "paid",
        startDate: "07-06-2027",
        endDate: "11-06-2027",
        reason: "Professional development course",
        status: "approved",
        totalDays: 5,
    },
    {
        type: "annual",
        startDate: "25-06-2027",
        endDate: "25-06-2027",
        reason: "Long weekend extension",
        status: "rejected",
        totalDays: 1,
    },
    {
        type: "annual",
        startDate: "12-07-2027",
        endDate: "16-07-2027",
        reason: "Mid-year rest",
        status: "pending",
        totalDays: 5,
    },
];

export default function Leave() {
    const [leaves, setLeaves] = useState<LeaveType[]>(leaveList);

    const [filterValues, setFilterValues] = useState({
        search: "",
        status: "",
        type: "",
    });

    const filteredLeaves = filter(leaves, filterValues);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.leaveContainer}>
                <SummaryCardContainer leaveList={leaves}></SummaryCardContainer>
                <Filter
                    filterValues={filterValues}
                    setFilterValues={setFilterValues}
                ></Filter>
                <LeaveHistory leaveList={filteredLeaves}></LeaveHistory>
            </div>
            <RequestForm setLeaves={setLeaves} leaves={leaves}></RequestForm>
        </div>
    );
}
