export function calculateTotalDays(
    startDateStr: string,
    endDateStr: string
): number {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    const differenceInMs = endDate.getTime() - startDate.getTime();

    const msInADay = 1000 * 60 * 60 * 24;
    const days = differenceInMs / msInADay;

    return days + 1;
}
