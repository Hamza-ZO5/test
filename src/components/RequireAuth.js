import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    console.log("User role in RequireAuth:", auth.role);
    console.log("Allowed roles in RequireAuth:", allowedRoles);
    const location = useLocation();

    return (
        allowedRoles?.includes(auth?.role)
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;
