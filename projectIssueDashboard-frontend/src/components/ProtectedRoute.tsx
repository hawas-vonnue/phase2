import { useAuth } from "../context/useAuth";
import Loading from "./common/Loading";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) return <Loading />;

    if (!isAuthenticated) return <Navigate to={"/login"} />;

    return <Outlet />;
}
