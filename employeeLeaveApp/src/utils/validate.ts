export function validate(formValues: {
    type: string;
    start: string;
    end: string;
    reason: string;
}): { isValid: boolean; error: string } {
    console.log(formValues);
    if (
        formValues.type === "" ||
        formValues.start === "" ||
        formValues.end === "" ||
        formValues.reason === ""
    )
        return {
            isValid: false,
            error: "All fields are required",
        };

    if (new Date(formValues.start) <= new Date())
        return {
            isValid: false,
            error: "Leave cannot be requested for today or previous dates",
        };
    if (new Date(formValues.start) > new Date(formValues.end))
        return {
            isValid: false,
            error: "end date cannot be before start date",
        };

    return {
        isValid: true,
        error: "",
    };
}
