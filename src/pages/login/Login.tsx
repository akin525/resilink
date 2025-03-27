import { CustomInput } from "../../components/common/inputs/CustomInput";
import Logo from "../../components/common/logo/Logo";
import { ButtonBg } from "../../components/shared/buttons/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HandleChangeData, RegisterUserResponse, RootState } from "../../types/Interface";
import RoundLoader from "../../components/shared/loaders/RoundLoader";
import { loginUser } from "../../features/unauth-features/UserSlice";
import { toastOptions } from "../../utils/helpers";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate()
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

    const payload = formData;

    dispatch(loginUser(payload))
      .unwrap()
      .then((res: RegisterUserResponse) => {
        console.log(res);

        if (!res.status) {
          toast.error(res.message, toastOptions);
        } else {
          toast.success(
            `${res.message}`,
            toastOptions
          );
          setTimeout(() => {
            navigate("/dashboard")
          }, 3000);
        }
      })
      .catch((err: any) => {
        if (err.message) {
          toast.error(err.message, toastOptions);
        } else {
          toast.error("Something went wrong", toastOptions);
        }
      });
  };
  return (
    <>
      <section className="w-full h-screen overflow-y-auto py-14 bg-dv">
        <section className="w-full flex justify-center pt-5 md:pt-10 pb-5">
          <Logo color="black" />
        </section>
        <section className="w-full mb-7 flex-col justify-center items-center gap-1 inline-flex">
          <section className="text-center text-black text-[22px] font-semibold">
            Welcome Back
          </section>
          <section className="text-center text-para text-opacity-80 text-sm font-normal">
            Login to get access back to your account.
          </section>
        </section>
        {/* <section className="w-full mb-5 flex justify-center">
          <section
            // onClick={handleGoogleLogin}
            className="w-[335px] cursor-pointer h-14 px-3.5 py-2 rounded border border-para justify-center items-center gap-5 inline-flex"
          >
            <img className="w-[19px] h-[19px]" src={GoogleLogo} />
            <section className="text-center text-white text-opacity-95 text-base font-semibold">
              Continue with Google
            </section>
          </section>
        </section> */}
        {/* <section className="w-full flex justify-center items-center mb-5">
          <div className="w-[126px] h-[0px] border border-para"></div>
          <div className="text-center text-neutral-500 text-sm px-5 font-normal leading-[18.76px]">
            OR
          </div>
          <div className="w-[126px] h-[0px] border border-para"></div>
        </section> */}
        <section className="w-full flex justify-center items-center">
          <form className="w-[335px]"
          // onSubmit={(e) => handleRegister(e)}
          >
            <CustomInput
              handleChange={handleChange}
              label={"Email Address"}
              type={"email"}
              name={"email"}
              placeholder={"Email Address"}
            />
            <CustomInput
              handleChange={handleChange}
              label={"Password"}
              type={"password"}
              name={"password"}
              placeholder={"Password"}
            />
            <section className="flex justify-end items-center mb-2">
              <div className="text-neutral-500 text-xs font-medium">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </section>
            <section className="flex items-center mb-3">
              <input type="checkbox" className="bg-transparent outline-none" />
              <section className="pl-2">
                <span className="text-neutral-500 text-xs font-medium">
                  I have read and agree to the
                </span>
                <span className="text-violet-500 text-xs font-medium underline pl-1 cursor-pointer">
                  Terms of Service
                </span>
              </section>
            </section>
            <section className="w-full justify-center flex mb-3">
              {loading ? (
                <section className="w-fit">
                  <ButtonBg
                    className="py-3 px-10 bg-bc"
                    disabled={
                      formData.email.trim() === "" ||
                      formData.password.trim() === ""
                    }
                  >
                    <RoundLoader />
                  </ButtonBg>
                </section>
              ) : (
                <section className="w-fit">
                  <ButtonBg
                    className="py-3 px-10 bg-bc"
                    onClick={handleLogin}
                    disabled={
                      formData.email.trim() === "" ||
                      formData.password.trim() === ""
                    }
                  >
                    Login
                  </ButtonBg>
                </section>
              )}
            </section>
            <section className="flex justify-center items-center">
              <div className="text-center text-para text-[13px] font-normal leading-none">
                Don't have an account?
              </div>
              <div className="text-center text-bc pl-1 text-[13px] font-semibold">
                <Link to="/register">Sign Up</Link>
              </div>
            </section>
          </form>
        </section>
      </section>
    </>
  );
};

export default Login;
