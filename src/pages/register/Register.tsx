// import { Logo } from "../../components/shared/logo/Logo";
import { useDispatch, useSelector } from "react-redux";
import { CustomInput } from "../../components/common/inputs/CustomInput";
import Logo from "../../components/common/logo/Logo";
import { ButtonBg } from "../../components/shared/buttons/Buttons";
// import { useDispatch, useSelector } from "react-redux";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HandleChangeData, RegisterUserData, RegisterUserResponse, RootState } from "../../types/Interface";
import { registerUser } from "../../features/unauth-features/UserSlice";
import { toastOptions } from "../../utils/helpers";
import { toast } from "react-toastify";
import RoundLoader from "../../components/shared/loaders/RoundLoader";
// import RoundLoader from "../../components/shared/loaders/RoundLoader";
// import { BASE_URL } from "../../utils/constants";

const Register = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate()
  const [formData, setFormData] = useState<RegisterUserData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: HandleChangeData) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = formData;

    dispatch(registerUser(payload))
      .unwrap()
      .then((res: RegisterUserResponse) => {
        console.log(res);

        if (!res.status) {
          toast.error(res.message, toastOptions);
        } else {
          toast.success(
            `${res.message}, Please proceed to verify your email`,
            toastOptions
          );
          localStorage.setItem("userEmail", payload.email)
          setTimeout(() => {
            navigate("/verify-email")
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
      <section className="w-full h-screen overflow-y-auto px-2 py-14 ">
        <section className="w-full flex justify-center pt-5 md:pt-10 pb-5">
          <Logo color="black" />
        </section>
        <section className="w-full mb-7 flex-col justify-center items-center gap-1 inline-flex">
          <section className="text-center text-black text-[22px] font-semibold">
            Create an Account
          </section>
          <section className="text-center text-neutral-800 text-opacity-80 text-sm font-normal">
            Sign up now to get started with an account.
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
        <section className="w-full flex justify-center items-center">
          <form className="w-full md:w-[700px]"
          // onSubmit={(e) => handleRegister(e)}
          >
            <section className="w-full md:flex md:gap-5">
              <CustomInput
                handleChange={handleChange}
                label={"First Name"}
                type={"text"}
                name={"firstName"}
                placeholder={"John"}
              />
              <CustomInput
                handleChange={handleChange}
                label={"Last Name"}
                type={"text"}
                name={"lastName"}
                placeholder={"Doe"}
              />
            </section>
            <CustomInput
              handleChange={handleChange}
              label={"Email Address"}
              type={"email"}
              name={"email"}
              placeholder={"johndoe@gmail.com"}
            />
            <CustomInput
              handleChange={handleChange}
              label={"Password"}
              type={"password"}
              name={"password"}
              placeholder={"Password"}
            />
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
                      formData.firstName.trim() === "" ||
                      formData.lastName.trim() === "" ||
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
                    onClick={handleRegister}
                    disabled={
                      formData.firstName.trim() === "" ||
                      formData.lastName.trim() === "" ||
                      formData.email.trim() === "" ||
                      formData.password.trim() === ""
                    }
                  >
                    Sign Up
                  </ButtonBg>
                </section>
              )}
            </section>
            <section className="flex justify-center items-center">
              <div className="text-center text-neutral-500 text-[13px] font-normal leading-none">
                Already have an account?
              </div>
              <div className="text-center text-bc pl-1 text-[13px] font-semibold">
                <Link to="/login">Log in</Link>
              </div>
            </section>
          </form>
        </section>
      </section>
    </>
  );
};

export default Register;
