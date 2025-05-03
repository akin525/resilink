// ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { getAuthToken } from "../../src/utils/auth.tsx"; // adjust the path if needed

const ProtectedRoute = () => {
    const token = getAuthToken();

    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
