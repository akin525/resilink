import { ButtonBg } from "../../components/shared/buttons/Buttons";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/common/logo/Logo";
import RoundLoader from "../../components/shared/loaders/RoundLoader";
import { toastOptions } from "../../utils/helpers";
import { toast } from "react-toastify";
import { verifyEmail } from "../../features/unauth-features/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUserResponse, RootState } from "../../types/Interface";

const VerifyEmail = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate()

    console.log(loading);

    const [email, setEmail] = useState<string>("");

    useEffect(() => {
        const storedEmail = localStorage.getItem("userEmail");
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

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
    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Backspace" && !verificationCode[index] && index > 0) {
            // If Backspace is pressed and the input is empty, focus on the previous input
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerifyEmail = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = { email, verificationCode: verificationCode.join("") }

        dispatch(verifyEmail(payload))
            .unwrap()
            .then((res: RegisterUserResponse) => {
                console.log(res);

                if (!res.status) {
                    toast.error(res.message, toastOptions);
                } else {
                    toast.success(
                        `${res.message}, You will be redirected in less than 3 seconds`,
                        toastOptions
                    );
                    setTimeout(() => {
                        navigate("/login")
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
            <section className="w-full h-screen overflow-y-auto px-2 py-14 bg-dv">
                <section className="w-full flex justify-center pt-5 md:pt-10 pb-5">
                    <Logo color="black" />
                </section>
                <section className="w-full mb-7 flex-col justify-center items-center gap-1 inline-flex">
                    <section className="text-center text-black text-[22px] font-semibold">
                        Verify your Email
                    </section>
                    <section className="text-center text-neutral-800 text-opacity-80 text-sm font-normal">
                        Enter the 6 digit code sent to your email address ({email})
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
                                    className="w-full bg-transparent py-3 px-2 rounded-md border text-center border-para text-para text-sm font-medium outline-none"
                                    type="text"
                                    value={value}
                                    maxLength={1}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                />
                            ))}
                        </section>
                        <section className="w-full justify-center flex mb-3">
                            {loading ? (
                                <section className="w-fit">
                                    <ButtonBg
                                        className="py-3 px-10 bg-bc"
                                        disabled={
                                            verificationCode.join("").trim().length !== 6
                                        }
                                    >
                                        <RoundLoader />
                                    </ButtonBg>

                                </section>
                            ) : (
                                <section className="w-fit">
                                    <ButtonBg
                                        className="py-3 px-10 bg-bc"
                                        onClick={handleVerifyEmail}
                                        disabled={
                                            verificationCode.join("").trim().length !== 6
                                        }
                                    >
                                        Verify
                                    </ButtonBg>
                                </section>
                            )}
                        </section>
                        <section className="flex justify-center items-center">
                            <div className="text-center text-para text-[13px] font-normal leading-none">
                                Code expired?
                            </div>
                            <div className="text-center text-bc pl-1 text-[13px] font-semibold">
                                <Link to="#">Resend</Link>
                            </div>
                        </section>
                    </form>
                </section>
            </section>
        </>
    );
};

export default VerifyEmail;
