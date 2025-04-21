import { useDispatch, useSelector } from "react-redux";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HandleChangeData,
  RegisterUserResponse,
  RootState,
} from "../../types/Interface";
import { loginUser } from "../../features/unauth-features/UserSlice";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/helpers";
import RoundLoader from "../../components/shared/loaders/RoundLoader";
import Logo from "../../components/common/logo/Logo";
import { ButtonBg } from "../../components/shared/buttons/Buttons";
import gooogle from "./Group.png";
import apple from "./image 109.png";
import facebook from "./image 143.png";
const Login = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: HandleChangeData) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(formData))
        .unwrap()
        .then((res: RegisterUserResponse) => {
          if (!res.status) {
            toast.error(res.message, toastOptions);
          } else {
            toast.success(res.message, toastOptions);
            setTimeout(() => {
              navigate("/dashboard");
            }, 3000);
          }
        })
        .catch((err: any) => {
          toast.error(err?.message || "Something went wrong", toastOptions);
        });
  };

  return (
      <section className="bg-[#0000cc] w-full h-screen flex justify-center items-center relative">
        {/* Logo */}
        <div className="absolute top-5 left-5">
          <Logo color="white" />
        </div>

        {/* Card */}
        <div className="bg-[#0000cc] text-white w-[360px] p-6 rounded-xl flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-1">Login</h2>
          <p className="text-sm text-white text-opacity-80 mb-5 text-center">
            Enter your email and password to continue
          </p>

          {/* Form */}
          <form onSubmit={handleLogin} className="w-full">
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full h-10 px-4 mb-3 rounded-full text-sm text-black placeholder-gray-500 focus:outline-none"
            />
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full h-10 px-4 mb-3 rounded-full text-sm text-black placeholder-gray-500 focus:outline-none"
            />

            {/* Forgot Password */}
            <div className="text-right text-sm text-white opacity-80 mb-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            {/* Login Button */}
            <ButtonBg
                className="w-full h-10 text-white font-semibold rounded-full border border-white hover:bg-white hover:text-[#0000cc] transition"
                disabled={
                    formData.email.trim() === "" || formData.password.trim() === ""
                }
            >
              {loading ? <RoundLoader /> : "Login"}
            </ButtonBg>
          </form>

          {/* Sign up link */}
          <p className="text-sm mt-4">
            Don’t have an account?
            <Link to="/register" className="underline font-semibold ml-1 text-white">
              Sign Up
            </Link>
          </p>

          {/* Divider */}
          <div className="w-full flex items-center my-4">
            <hr className="flex-grow border-white opacity-30" />
            <span className="mx-3 text-sm opacity-70">OR</span>
            <hr className="flex-grow border-white opacity-30" />
          </div>

          {/* Social buttons */}
          <button className="w-full h-10 rounded-full flex items-center justify-center gap-3 bg-white text-black font-semibold mb-3">
            <img src={gooogle} className="w-5 h-5" />
            Sign in with Google
          </button>
          <button className="w-full h-10 rounded-full flex items-center justify-center gap-3 bg-white text-black font-semibold mb-3">
            <img src={apple} className="w-5 h-5" />
            Sign in with Apple
          </button>
          <button className="w-full h-10 rounded-full flex items-center justify-center gap-3 bg-white text-black font-semibold">
            <img src={facebook} className="w-5 h-5" />
            Sign in with Facebook
          </button>
        </div>
      </section>
  );
};

export default Login;
