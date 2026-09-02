import { type User } from "../types/user";
import { createContext } from "react";

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: string, userData: User, rememberMe: boolean) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
