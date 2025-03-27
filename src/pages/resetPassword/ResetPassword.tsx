// import { Logo } from "../../components/shared/logo/Logo";
import { ButtonBg } from "../../components/shared/buttons/Buttons";
// import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../components/common/logo/Logo";
// import { registerUser } from "../../features/userSlice";
// import { toast } from "react-toastify";
// import { toastOptions } from "../../utils/toast";
// import RoundLoader from "../../components/shared/loaders/RoundLoader";
// import { BASE_URL } from "../../utils/constants";

const ResetPassword = () => {
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

    // const handleChange = () => {
    //     // const { name, value } = e.target;
    //     // setFormData({ ...formData, [name]: value });
    // };

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
    const [verificationCode, setVerificationCode] = useState<string[]>(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
        const newVerificationCode = [...verificationCode];
        newVerificationCode[index] = value;

        // If the input has a value and it's not the last one, focus on the next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        setVerificationCode(newVerificationCode);
        setFormData(formData)
    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Backspace" && !verificationCode[index] && index > 0) {
            // If Backspace is pressed and the input is empty, focus on the previous input
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = () => {
        const code = verificationCode.join("");
        // Here you can perform verification logic with the code
        console.log("Verifying code:", code);
    };
    return (
        <>
            <section className="w-full h-screen overflow-y-auto px-2 py-14 bg-dv">
                <section className="w-full flex justify-center pt-5 md:pt-10 pb-5">
                    <Logo />
                </section>
                <section className="w-full mb-7 flex-col justify-center items-center gap-1 inline-flex">
                    <section className="text-center text-white text-[22px] font-semibold">
                        Reset your Password
                    </section>
                    <section className="text-center text-neutral-400 text-opacity-80 text-sm font-normal">
                        Enter the 6 digit code sent to your email address
                    </section>
                </section>
                <section className="w-full flex justify-center items-center">
                    <form className="w-full md:w-[400px]"
                    // onSubmit={(e) => handleRegister(e)}
                    >
                        <section className="flex gap-2 mb-5">
                            {verificationCode.map((value, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    className="w-full bg-transparent py-3 px-4 rounded-md border text-center border-para text-white text-sm font-medium outline-none"
                                    type="text"
                                    value={value}
                                    maxLength={1}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                />
                            ))}
                        </section>
                        <section className="w-full mb-3">
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
                            <ButtonBg
                                className="py-3"
                                onClick={handleVerify}
                                disabled={
                                    formData.email.trim() === "" ||
                                    formData.password.trim() === ""
                                }
                            >
                                Verify
                            </ButtonBg>
                            {/* )} */}
                        </section>
                        <section className="flex justify-center items-center">
                            <div className="text-center text-para text-[13px] font-normal leading-none">
                                Remembered your password?
                            </div>
                            <div className="text-center text-white pl-1 text-[13px] font-semibold">
                                <Link to="/login">Login</Link>
                            </div>
                        </section>
                    </form>
                </section>
            </section>
        </>
    );
};

export default ResetPassword;
