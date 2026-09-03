import { vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Issues from "../src/pages/Issues";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
    vi.clearAllMocks();
});

afterAll(() => {
    vi.unstubAllGlobals();
});

describe("test filtering", () => {
    vi.stubGlobal("fetch", vi.fn());

    it("search test", async () => {
        const user = userEvent.setup();

        const mockResolvedValue = [
            {
                date: "2024-12-31",
                status: "active",
                priority: "Low",
                description: "Description of issue 1.",
                tags: ["IT", "Security"],
                title: "first",
                project: "Project 1",
                assignee: "User 1",
            },
            {
                date: "2004-12-31",
                status: "completed",
                priority: "High",
                description: "Description of issue 2.",
                tags: ["IT", "Security", "Development"],
                title: "second",
                project: "Project 2",
                assignee: "User 2",
            },
        ];

        vi.mocked(fetch).mockResolvedValue({
            json: async () => mockResolvedValue,
            ok: true,
        } as unknown as Response);

        const { container } = render(
            <MemoryRouter>
                <Issues />
            </MemoryRouter>
        );

        await screen.findByRole("button", { name: /create/i });

        const expand = container.querySelector(".menuContainer button");
        if (expand !== null) await user.click(expand);

        const search = screen.getByLabelText(/search/i);

        const cards = container.querySelectorAll(".issueCard");
        expect(cards.length).toBe(2);

        await user.type(search, "first");

        await waitFor(() => {
            expect(screen.queryByText("second")).not.toBeInTheDocument();
        });

        // expect(screen.queryByText("first")).toBeInTheDocument();
    });

    it("status filter", async () => {
        const user = userEvent.setup();

        const mockResolvedValue = [
            {
                date: "2024-12-31",
                status: "active",
                priority: "Low",
                description: "Description of issue 1.",
                tags: ["IT", "Security"],
                title: "first",
                project: "Project 1",
                assignee: "User 1",
            },
            {
                date: "2004-12-31",
                status: "completed",
                priority: "High",
                description: "Description of issue 2.",
                tags: ["IT", "Security", "Development"],
                title: "second",
                project: "Project 2",
                assignee: "User 2",
            },
        ];

        vi.mocked(fetch).mockImplementation(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        json: async () => mockResolvedValue,
                        ok: true,
                    } as unknown as Response);
                }, 50);
            });
        });

        // vi.mocked(fetch).mockResolvedValue({
        //     json: async () => mockResolvedValue,
        //     ok: true,
        // } as unknown as Response);

        const { container } = render(
            <MemoryRouter>
                <Issues />
            </MemoryRouter>
        );

        const statusSelector = (await screen.findByLabelText(
            /status/i
        )) as HTMLSelectElement;

        const expand = container.querySelector(".menuContainer button");
        if (expand !== null) await user.click(expand);

        await user.selectOptions(statusSelector, "active");

        await waitFor(() => {
            expect(screen.queryByText("second")).not.toBeInTheDocument();
        });

        expect(screen.queryByText("first")).toBe(null);
    });

    it("priority filter", async () => {
        const user = userEvent.setup();

        const mockResolvedValue = [
            {
                date: "2024-12-31",
                status: "active",
                priority: "Low",
                description: "Description of issue 1.",
                tags: ["IT", "Security"],
                title: "first",
                project: "Project 1",
                assignee: "User 1",
            },
            {
                date: "2004-12-31",
                status: "completed",
                priority: "High",
                description: "Description of issue 2.",
                tags: ["IT", "Security", "Development"],
                title: "second",
                project: "Project 2",
                assignee: "User 2",
            },
        ];

        vi.mocked(fetch).mockImplementation(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        json: async () => mockResolvedValue,
                        ok: true,
                    } as unknown as Response);
                }, 50);
            });
        });

        render(
            <MemoryRouter>
                <Issues />
            </MemoryRouter>
        );

        const prioritySelector = await screen.findByLabelText(/priority/i);

        await user.selectOptions(prioritySelector, "Low");

        await waitFor(() => {
            expect(screen.queryByText("second")).not.toBeInTheDocument();
        });
        expect(screen.queryByText("first")).toBe(null);
    });
});
