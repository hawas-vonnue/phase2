import { vi } from "vitest";
import Project from "../src/pages/Projects";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

afterAll(() => {
    vi.unstubAllGlobals();
});
describe("Projects page", () => {
    vi.stubGlobal("fetch", vi.fn());

    it("error state", async () => {
        vi.mocked(fetch).mockRejectedValue("fetch error");

        render(<Project />);

        const retryButton = await screen.findByRole("button", {
            name: /Retry/,
        });

        expect(retryButton).toBeInTheDocument();
    });

    it("Retry button works", async () => {
        vi.mocked(fetch).mockRejectedValue("fetch error");

        render(<Project />);

        const retryButton = await screen.findByRole("button", {
            name: /Retry/,
        });

        await userEvent.click(retryButton);

        expect(fetch).toHaveBeenCalled();
    });

    it("Project loads correctly", async () => {
        const mockValue = [
            {
                name: "First project",
                text: "This is the description of first project",
                status: "Pending",
            },

            {
                name: "Second project",
                text: "This is the description of second project",
                status: "completed",
            },
        ];

        vi.mocked(fetch).mockResolvedValue({
            json: async () => mockValue,
            ok: true,
        } as unknown as Response);

        render(<Project />);

        const projectCard = await screen.findByText(/First/);

        expect(projectCard).toBeInTheDocument();
    });
});
