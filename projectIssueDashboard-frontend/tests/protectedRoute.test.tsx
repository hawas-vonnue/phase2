import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import ProtectedRoute from "../src/components/ProtectedRoute";
import { useAuth } from "../src/context/useAuth";
import { AuthContextType } from "../src/context/AuthContext";

vi.mock("../src/context/useAuth", () => ({
    useAuth: vi.fn(),
}));

describe("ProtectedRoute Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render child components if the user is authenticated", () => {
        vi.mocked(useAuth).mockReturnValue({
            isAuthenticated: true,
        } as unknown as AuthContextType);

        render(
            <MemoryRouter initialEntries={["/project"]}>
                <Routes>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/project" element={<div>project</div>} />
                    </Route>
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/project/i)).toBeInTheDocument();
    });

    it("should redirect unauthenticated users to the login page", () => {
        vi.mocked(useAuth).mockReturnValue({
            isAuthenticated: false,
        } as unknown as AuthContextType);

        render(
            <MemoryRouter initialEntries={["/project"]}>
                <Routes>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/project" element={<div>project</div>} />
                    </Route>
                    <Route
                        path="/login"
                        element={<div>Public Login Page</div>}
                    ></Route>
                </Routes>
            </MemoryRouter>
        );

        expect(screen.queryByText("project")).not.toBeInTheDocument();

        expect(screen.getByText("Public Login Page")).toBeInTheDocument();
    });
});
