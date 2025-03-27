import { ButtonBg } from "../../components/shared/buttons/Buttons";
// import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CustomInput } from "../../components/common/inputs/CustomInput";
import Logo from "../../components/common/logo/Logo";
// import { registerUser } from "../../features/userSlice";
// import { toast } from "react-toastify";
// import { toastOptions } from "../../utils/toast";
// import RoundLoader from "../../components/shared/loaders/RoundLoader";
// import { BASE_URL } from "../../utils/constants";

const ForgotPassword = () => {
    // const dispatch = useDispatch();
    // const loading = useSelector((state) => state.user.loading);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // const handleGoogleLogin = () => {
    //   window.open(`${BASE_URL}/api/auth/google/callback`, "_self");
    // };
    // if (TOKEN) {
    //   window.location.href = "/feed";
    // }

    // Check if the URL contains the token after the Google login callback
    // useEffect(() => {
    //   const urlParams = new URLSearchParams(window.location.search);
    //   const token = urlParams.get("token");

    //   if (token) {
    //     // Dispatch the loginSuccess action to store the token in Redux state
    //     // dispatch(loginSuccess(token));

    //     // Save the token in local storage
    //     localStorage.setItem("accessToken", token);

    //     // Remove the token from the URL query parameters
    //     window.location.href = "/feed";
    //   }
    // }, []);

    const handleChange = () => {
        // const { name, value } = e.target;
        setFormData({ ...formData });
    };

    // const handleRegister = (e) => {
    //   e.preventDefault();
    //   const payload = formData;
    //   // //console.log(payload)
    //   dispatch(registerUser(payload))
    //     .unwrap()
    //     .then((res) => {
    //       //console.log(res);
    //       if (res.status === false) {
    //         toast.error(res.message, toastOptions);
    //       }
    //       if (res.status === true) {
    //         toast.success(
    //           res.message +
    //             ", " +
    //             "You will be redirected in less than 3 seconds",
    //           toastOptions
    //         );
    //         setTimeout(() => {
    //           window.location.pathname = "/feed";
    //           // navigate("/app/dashboard");
    //         }, 3000);
    //       }
    //     })
    //     .catch((err) => {
    //       // //console.log(err);
    //       if (err.message) {
    //         toast.error(err.message, toastOptions);
    //       } else {
    //         toast.error("Something went wrong", toastOptions);
    //       }
    //     });
    // };
    return (
        <>
            <section className="w-full h-screen overflow-y-auto px-2 py-14 bg-dv">
                <section className="w-full flex justify-center pt-5 md:pt-10 pb-5">
                    <Logo color={"black"} />
                </section>
                <section className="w-full mb-7 flex-col justify-center items-center gap-1 inline-flex">
                    <section className="text-center text-black text-[22px] font-semibold">
                        Forgot your Password
                    </section>
                    <section className="text-center text-neutral-800 text-opacity-80 text-sm font-normal">
                        Enter your registered email address to get verification code to reset your password
                    </section>
                </section>
                <section className="w-full flex justify-center items-center">
                    <form className="w-full md:w-[400px]"
                    // onSubmit={(e) => handleRegister(e)}
                    >
                        <CustomInput
                            handleChange={handleChange}
                            label={"Email Address"}
                            type={"email"}
                            name={"email"}
                            placeholder={"johndoe@gmail.com"}
                        />

                        <section className="w-full justify-center flex mb-3">
                            {/* {loading ? (
                <ButtonBg
                  disable={
                    formData.email.trim() === "" ||
                    formData.password.trim() === ""
                  }
                >
                  <RoundLoader />
                </ButtonBg>
              ) : ( */}
                            <section className="w-fit">
                                <ButtonBg
                                    className="py-3 px-10 bg-bc"
                                    onClick={() => { }}
                                    disabled={
                                        formData.email.trim() === "" ||
                                        formData.password.trim() === ""
                                    }
                                >
                                    Send Code
                                </ButtonBg>
                            </section>
                            {/* )} */}
                        </section>
                        <section className="flex justify-center items-center">
                            <div className="text-center text-para text-[13px] font-normal leading-none">
                                Remembered your password?
                            </div>
                            <div className="text-center text-bc pl-1 text-[13px] font-semibold">
                                <Link to="/login">Login</Link>
                            </div>
                        </section>
                    </form>
                </section>
            </section>
        </>
    );
};

export default ForgotPassword;
