import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home/Home";
import Services from "./pages/services/Home";
import Park from "./pages/park/Home.tsx";
import List from "./pages/list/Home";
import About from "./pages/about/Home";
import { ProgressBarLoader } from "./components/shared/loaders/Loaders";
import { useEffect, useState } from "react";
import MainLayout from "./components/layouts/mainlayout/MainLayout";
import logo from "./assets/images/resilink-black.png";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import DashboardLayout from "./components/layouts/dashboardlayout/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Listing from "./pages/listing/Listing";
import AddListing from "./pages/addListing/AddListing";
import Tenants from "./pages/tenants/Tenants";
import Analytics from "./pages/analytics/Analytics";
import ListingDetails from "./pages/listingDetails/ListingDetails";
import Settings from "./pages/settings/Settings";
import VerifyEmail from "./pages/verifyEmail/VerifyEmail";
import ListingDetail from "./pages/listingDetail/ListingDetail";
import Payment from "./pages/payment/Payment";
import TransactionStatus from "./pages/transactionStatus/TransactionStatus";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { UserProvider } from "./context/UserContext";
import ProtectedList from "./components/ProtectedList.tsx";

const App = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route element={<ProtectedList/>}>
                        <Route path="/lists" element={<List />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/lists/packing" element={<Park />} />
                        <Route path="/listings/details/:id" element={<ListingDetail />} />

                    </Route>
                </Route>
                <Route path="/register" element={<Register />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/payment/:paymentType/:id" element={<Payment />} />
                <Route path="/transaction/status" element={<TransactionStatus />} />

                <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard/listings" element={<Listing />} />
                    <Route path="/dashboard/listings/:id" element={<ListingDetails />} />
                    <Route path="/dashboard/listings/add" element={<AddListing />} />
                    <Route path="/dashboard/tenants" element={<Tenants />} />
                    <Route path="/dashboard/analytics" element={<Analytics />} />
                    <Route path="/dashboard/settings" element={<Settings />} />

                </Route>




            </>
        )
    );

    const renderContent = () => {
        if (isLoading) {
            return (
                <section className="relative h-screen bg-#ededff w-full flex flex-col justify-center items-center">
                    <section className="w-36">
                        <img className="w-full" src={logo} alt="" />
                    </section>
                    <section><ProgressBarLoader /></section>
                </section>
            );
        } else {
            return (
                <UserProvider>
                    <section className="App font-[Plus]">
                        <RouterProvider router={router} />
                        <ToastContainer />
                    </section>
                </UserProvider>
            );
        }
    };

    return renderContent();
};

export default App;
