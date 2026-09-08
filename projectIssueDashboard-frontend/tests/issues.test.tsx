import { describe, expect, it } from "vitest";
import { vi } from "vitest";
import Issues from "../src/pages/Issues";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";

afterEach(() => {
    vi.clearAllMocks();
});

afterAll(() => {
    vi.unstubAllGlobals();
});

describe("Issues page", () => {
    vi.stubGlobal("fetch", vi.fn());

    it("error state", async () => {
        vi.mocked(fetch).mockRejectedValue("Fetch error");

        render(<Issues />);

        const error = await screen.findByRole("button", { name: /Retry/ });

        expect(error).toBeInTheDocument();
    });

    it("retry button works", async () => {
        vi.mocked(fetch).mockRejectedValue("Fetch failed");

        render(<Issues />);
        await screen.findByText(/Error/);

        const button = screen.getByRole("button", { name: /Retry/ });

        await userEvent.click(button);
        expect(fetch).toHaveBeenCalledTimes(2);
    });

    it("working", async () => {
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

        const button = await screen.findByRole("button", { name: /Create/ });

        expect(button).toBeInTheDocument();
    });
});
