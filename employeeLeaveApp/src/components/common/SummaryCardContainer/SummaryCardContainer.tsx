import styles from "./SummaryCardContainer.module.css";
import SummaryCard from "../SummaryCard/SummaryCard";
import { type LeaveType } from "../../../types/types";

export default function SummaryCardContainer({
    leaveList,
}: {
    leaveList: LeaveType[];
}) {
    const totalAnnualLeave = 21;
    const totalSickLeave = 7;
    const totalPaidLeave = 5;

    const annualLeave = leaveList.filter(
        (element) => element.type === "annual" && element.status === "approved"
    ).length;
    const sickLeave = leaveList.filter(
        (element) => element.type === "sick" && element.status === "approved"
    ).length;
    const paidLeave = leaveList.filter(
        (element) => element.type === "paid" && element.status === "approved"
    ).length;

    return (
        <div className={styles.container}>
            <SummaryCard
                typeOfLeave="annual"
                totalLeaves={totalAnnualLeave}
                leavesTaken={annualLeave}
            ></SummaryCard>
            <SummaryCard
                typeOfLeave="sick"
                totalLeaves={totalSickLeave}
                leavesTaken={sickLeave}
            ></SummaryCard>
            <SummaryCard
                typeOfLeave="paid"
                totalLeaves={totalPaidLeave}
                leavesTaken={paidLeave}
            ></SummaryCard>
        </div>
    );
}
