import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAuthToken } from "../utils/auth";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext.tsx";
import {BASE_URLNew} from "../../src/utils/apiRoutes.tsx";
import SideNav from "./shared/sideNav/SideNav";
import TopNav from "./shared/topNav/TopNav";
import {useOutlet} from "react-router-dom";

// const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const navigate = useNavigate();
    const { setUser } = useUser();
    const outlet = useOutlet();

    useEffect(() => {
        const verifyToken = async () => {
            const token = getAuthToken();

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await fetch(`${BASE_URLNew}/api/profile`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();

                console.log(data);

                if (response.ok) {
                    localStorage.setItem("userEmail", data.data.email);

                    if (data.data.email_verified_at ===null){
                        navigate("/verify-email");

                    }
                    if (data.status === "true") {
                        setUser({
                            ...data.data,
                        });
                        setIsValid(true);
                        return;
                    }
                }

                throw new Error(data.message || "Unauthorized");
            } catch (error: any) {
                localStorage.removeItem("authToken");
                sessionStorage.removeItem("authToken");
                toast.error(error.message || "Session expired. Please login again.");
                navigate("/login");
            }
        };

        verifyToken();
    }, [navigate]);

    if (isValid === null) {
        return (
            <section className="overflow-hidden h-screen p-0 w-full flex">
                <section className="w-full flex">
                    <SideNav/>
                    <section className="w-full lg:w-10/12 bg-[#FAFAFA]">
                        <TopNav/>
                        {outlet}
                    </section>
                </section>
            </section>
        );
    }
    return <>{children}</>;
}
