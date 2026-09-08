import { type User } from "../types/user";
import { useEffect, useState } from "react";
import { type ReactNode } from "react";
// import { useNavigate } from "react-router";
import { AuthContext } from "./AuthContext";
import { type AuthContextType } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    // const navigate = useNavigate();

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const savedToken =
                    localStorage.getItem("token") ||
                    sessionStorage.getItem("token");
                if (savedToken) {
                    const response = await fetch(
                        `${import.meta.env.VITE_url}/user`,
                        {
                            headers: {
                                Authorization: `Bearer ${savedToken}`,
                            },
                        }
                    );

                    if (!response.ok)
                        throw new Error("Token expired or invalid");

                    const userData = await response.json();
                    setUser(userData);
                }
                //  else {
                //     navigate("/login");
                // }
            } catch (error) {
                console.log("failed to restore session", error);
                // navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const login = (token: string, userData: User, rememberMe: boolean) => {
        if (rememberMe) {
            localStorage.setItem("token", token);
            sessionStorage.removeItem("token");
        } else {
            sessionStorage.setItem("token", token);
            localStorage.removeItem("token");
        }
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        setUser(null);
    };

    const value: AuthContextType = {
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext value={value}>{children}</AuthContext>;
};
