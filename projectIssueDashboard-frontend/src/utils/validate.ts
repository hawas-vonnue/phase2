import type { Dispatch, SetStateAction } from "react";
import { IssueFormValuesZod } from "../types/issues";
import { type IssueFormValues } from "../types/issues";
import * as z from "zod";
type FormErrors = ReturnType<typeof z.treeifyError<IssueFormValues>>;

export function validate(
    formValue: IssueFormValues,
    updateErrorObject: Dispatch<SetStateAction<FormErrors | null>>
) {
    const result = IssueFormValuesZod.safeParse(formValue);

    if (!result.success) {
        const tree = z.treeifyError(result.error);
        console.log(tree);

        updateErrorObject(tree);
    }

    return result;
}
