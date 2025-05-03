import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { HandleChangeData } from "../../types/Interface";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/helpers";
import RoundLoader from "../../components/shared/loaders/RoundLoader";
import Logo from "../../components/common/logo/Logo";
import { ButtonBg } from "../../components/shared/buttons/Buttons";
import InfoAlert from "../../components/shared/alerts/InfoAlert";
import google from "./Group.png";
import apple from "./image 109.png";
import facebook from "./image 143.png";
import { BASE_URLNew } from "../../utils/apiRoutes.tsx";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe] = useState(false);

  const handleChange = (e: HandleChangeData) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URLNew}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      if (data.status === "true") {
        const token = data.token;
        rememberMe
            ? localStorage.setItem("authToken", token)
            : sessionStorage.setItem("authToken", token);

        toast.success(data.message || "Login successful", toastOptions);
        window.location.href = "/dashboard";
      } else {
        toast.error(data.message || "Login failed", toastOptions);
      }
    } catch (error: any) {
      toast.error(error.message || "Login failed. Please try again.", toastOptions);
    } finally {
      setLoading(false);
    }
  };

  return (
      <section className="bg-[#0000cc] w-full h-screen flex justify-center items-center relative">
        {/* Logo */}
        <div className="absolute top-6 left-6">
          <Logo color="white" />
        </div>

        {/* Card Container */}
        <div className="bg-[#0000cc] text-white w-full max-w-md px-6 py-10 rounded-lg flex flex-col items-center">
          <h2 className="text-lg font-bold mb-6">Login</h2>

          {/* ✅ Info Alert */}
          <div className="mb-6">
            <InfoAlert message="Please login or sign up to proceed." />
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            {/* Email */}
            <div className="flex items-center bg-white text-black rounded-full px-4 mb-4">
              <span className="mr-2 text-gray-500 text-sm">📧</span>
              <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="flex-1 h-10 text-sm bg-transparent focus:outline-none"
              />
            </div>

            {/* Password */}
            <div className="flex items-center bg-white text-black rounded-full px-4 mb-2">
              <span className="mr-2 text-gray-500 text-sm">🔒</span>
              <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="flex-1 h-10 text-sm bg-transparent focus:outline-none"
              />
              <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 text-sm cursor-pointer"
              >
              {showPassword ? "🙈" : "👁️"}
            </span>
            </div>

            <div className="flex justify-end mb-4 text-sm">
              <Link to="/forgot-password" className="text-white text-sm underline">
                Forgot Password?
              </Link>
            </div>

            <ButtonBg
                className="w-full h-10 text-white font-semibold rounded-full border border-white hover:bg-white hover:text-[#0000cc] transition"
                disabled={
                    loading || formData.email.trim() === "" || formData.password.trim() === ""
                }
            >
              {loading ? <RoundLoader /> : "Login"}
            </ButtonBg>
          </form>

          {/* Sign Up */}
          <p className="text-sm mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="font-semibold underline">
              Sign Up
            </Link>
          </p>

          {/* Divider */}
          <div className="w-full flex items-center my-5">
            <hr className="flex-grow border-white opacity-30" />
            <span className="mx-3 text-sm opacity-70">OR</span>
            <hr className="flex-grow border-white opacity-30" />
          </div>

          {/* Social Login */}
          <button className="w-full h-10 rounded-full flex items-center justify-center gap-3 bg-white text-black font-semibold mb-3">
            <img src={google} className="w-5 h-5" alt="Google" />
            Sign in with Google
          </button>
          <button className="w-full h-10 rounded-full flex items-center justify-center gap-3 bg-white text-black font-semibold mb-3">
            <img src={apple} className="w-5 h-5" alt="Apple" />
            Sign in with Apple
          </button>
          <button className="w-full h-10 rounded-full flex items-center justify-center gap-3 bg-white text-black font-semibold">
            <img src={facebook} className="w-5 h-5" alt="Facebook" />
            Sign in with Facebook
          </button>
        </div>
      </section>
  );
};

export default Login;
