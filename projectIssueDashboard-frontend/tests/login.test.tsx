import { vi } from "vitest";
import Login from "../src/pages/Login";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { AuthProvider } from "../src/context/AuthProvider";
import { MemoryRouter } from "react-router";

const mockedUseNavigate = vi.fn();
const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

vi.mock(import("react-router"), async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useNavigate: () => mockedUseNavigate,
    };
});

beforeAll(() => {
    vi.stubGlobal("fetch", vi.fn());
});

afterAll(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
});

beforeEach(() => {
    vi.clearAllMocks();
});

describe("test login", () => {
    it("Login successfully", async () => {
        const user = userEvent.setup();

        const mockValue = {
            token: "token",
            user: {
                name: "name",
            },
        };

        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => mockValue,
        } as unknown as Response);

        render(
            <MemoryRouter>
                <AuthProvider>
                    <Login />
                </AuthProvider>
            </MemoryRouter>
        );

        const email = screen.getByLabelText(/email/i);
        const password = screen.getByLabelText(/password/i);
        const signInButton = screen.getByRole("button", { name: /sign/i });

        await user.type(email, "email@gmail.com");
        await user.type(password, "password");
        await user.click(signInButton);

        await waitFor(() => {
            expect(mockedUseNavigate).toHaveBeenCalledWith("/");
        });
    });

    it("Login not successfull", async () => {
        const user = userEvent.setup();
        vi.mocked(fetch).mockResolvedValue({
            json: async () => {},
            status: 403,
        } as unknown as Response);

        render(
            <MemoryRouter>
                <AuthProvider>
                    <Login />
                </AuthProvider>
            </MemoryRouter>
        );

        const email = screen.getByLabelText(/email/i);
        const password = screen.getByLabelText(/password/i);
        const signInButton = screen.getByRole("button");

        await user.type(email, "email@gmail.com");
        await user.type(password, "password");
        await user.click(signInButton);

        await waitFor(() => {
            expect(alertMock).toHaveBeenCalled();
            expect(mockedUseNavigate).not.toHaveBeenCalled();
        });
    });
});
