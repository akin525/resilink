import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home/Home";
import { ProgressBarLoader } from "./components/shared/loaders/Loaders";
import { useEffect, useState } from "react";
import MainLayout from "./components/layouts/mainlayout/MainLayout";
import logo from "./assets/images/resilink-black.png"
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

const App = () => {
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  useEffect(() => {
    // Simulate loading delay for demonstration purposes
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading state to false after a delay
    }, 2000); // Adjust delay time as needed

    // Clear the timer to avoid memory leaks
    return () => clearTimeout(timer);
  }, []);

  // Render loading spinner or content based on the loading state
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
        <section className="App font-[Plus]">
          <RouterProvider router={router} />
          <ToastContainer />
        </section>
      );
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/listings/details/:id" element={<ListingDetail />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/payment/:paymentType/:id" element={<Payment />} />
        <Route path="/transaction/status" element={<TransactionStatus />} />
        <Route element={<DashboardLayout />}>
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
  return renderContent();
}

export default App;
