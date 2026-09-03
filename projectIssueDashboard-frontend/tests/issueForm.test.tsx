import { vi, beforeEach } from "vitest";
import Issues from "../src/pages/Issues";
import { render, screen, waitFor, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";

vi.stubGlobal("fetch", vi.fn());

beforeEach(async () => {
    vi.clearAllMocks();

    const mockResolvedValue = [
        {
            date: "2024-12-31",
            status: "active",
            priority: "Low",
            description: "Description of issue 1.",
            tags: ["IT", "Security"],
            title: "Title 1",
            project: "Project 1",
            assignee: "User 1",
        },
        {
            date: "2004-12-31",
            status: "completed",
            priority: "High",
            description: "Description of issue 2.",
            tags: ["IT", "Security", "Development"],
            title: "Title 2",
            project: "Project 2",
            assignee: "User 2",
        },
    ];

    vi.mocked(fetch).mockResolvedValue({
        json: async () => mockResolvedValue,
        ok: true,
    } as unknown as Response);

    render(
        <MemoryRouter>
            <Issues />
        </MemoryRouter>
    );

    const addIssueButton = screen.getByRole("button", { name: /create/i });

    await userEvent.click(addIssueButton);
});

describe("test issue form", () => {
    it("error shows for invalid inputs and submitted", async () => {
        const user = userEvent.setup();

        const formElement = document.querySelector(
            ".createIssueForm"
        ) as HTMLFormElement;

        const submitButton = within(formElement).getByRole("button", {
            name: /create/i,
        });

        await user.click(submitButton);

        await waitFor(() => {
            expect(document.querySelector(".error")).toBeInTheDocument();
        });
    });

    it("correct working", async () => {
        vi.mocked(fetch).mockResolvedValueOnce({} as unknown as Response);

        const user = userEvent.setup();

        const formElement = document.querySelector(
            ".createIssueForm"
        ) as HTMLFormElement;

        const title = within(formElement).getByLabelText(/title/i);
        const description = within(formElement).getByLabelText(/Description/);
        const project = within(formElement).getByLabelText(/project/i);
        const assignee = within(formElement).getByLabelText(/assignee/i);
        const status = within(formElement).getByLabelText(/status/i);
        const priority = within(formElement).getByLabelText(/priority/i);
        const date = within(formElement).getByLabelText(/date/i);
        const tags = within(formElement).getByLabelText(/tags/i);

        await user.type(title, "title");
        await user.type(project, "project");
        await user.type(description, "description");
        await user.type(assignee, "assignee");
        await user.selectOptions(status, "active");
        await user.selectOptions(priority, "Low");
        await user.type(date, "2026-12-31");
        await user.type(tags, "tag");

        const submitButton = within(formElement).getByRole("button", {
            name: /create/i,
        });

        await user.click(submitButton);

        await waitFor(() => {
            expect(document.querySelector(".error")).toBe(null);
            expect(fetch).toHaveBeenCalledTimes(2);
        });
    });
});
