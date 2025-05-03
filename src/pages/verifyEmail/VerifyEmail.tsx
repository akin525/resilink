import { ButtonBg } from "../../components/shared/buttons/Buttons";
import { FormEvent, useEffect, useRef, useState } from "react";
import {  useNavigate } from "react-router-dom";
import Logo from "../../components/common/logo/Logo";
import RoundLoader from "../../components/shared/loaders/RoundLoader";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/helpers";

const VerifyEmail = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [verificationCode, setVerificationCode] = useState<string[]>(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState<boolean>(false);
    const [resendLoading, setResendLoading] = useState<boolean>(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [rememberMe] = useState(false);

    useEffect(() => {
        const storedEmail = localStorage.getItem("userEmail");
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    const handleChange = (index: number, value: string) => {
        const updatedCode = [...verificationCode];
        updatedCode[index] = value.slice(-1);
        setVerificationCode(updatedCode);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Backspace" && !verificationCode[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerifyEmail = async (e: FormEvent) => {
        e.preventDefault();

        const token = verificationCode.join("");
        if (token.length !== 6) {
            toast.error("Please enter a valid 6-digit code", toastOptions);
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`https://admin.resilink.com.ng/api/verifyEmail/${token}`, {
                method: "GET",
            });

            const data = await response.json();

            if (response.ok && data.status) {
                const token = data.token;
                rememberMe
                    ? localStorage.setItem("authToken", token)
                    : sessionStorage.setItem("authToken", token);

                toast.success(`${data.message || "Email verified successfully!"}`, toastOptions);
                setTimeout(() => {
                    navigate("/dashboard");
                }, 2000);
            } else {
                toast.error(data.message || "Invalid verification code.", toastOptions);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.", toastOptions);
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        if (!email) {
            toast.error("Email not found. Please register again.", toastOptions);
            return;
        }

        setResendLoading(true);
        try {
            const response = await fetch("https://admin.resilink.com.ng/api/resendcode", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok && data.status) {
                toast.success(data.message || "Verification code resent. Verification code not in mail inbox? Check your mail spam folder", toastOptions);
            } else {
                toast.error(data.message || "Unable to resend code", toastOptions);
            }
        } catch (error) {
            toast.error("Something went wrong. Try again.", toastOptions);
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <section className="w-full h-screen bg-[#f9fafb] flex flex-col items-center justify-center px-4">
            {/* Logo */}
            <div className="absolute top-6 left-6">
                <Logo color="black" />
            </div>

            {/* Content Card */}
            <div className="w-full max-w-md bg-white rounded-xl shadow-md px-6 py-10">
                <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">Verify your Email</h2>
                <p className="text-sm text-center text-gray-600 mb-6">
                    Enter the 6-digit code sent to <span className="font-medium">{email}</span>
                </p>

                {/* Verification Input */}
                <form onSubmit={handleVerifyEmail} className="flex flex-col items-center">
                    <div className="flex gap-3 mb-5">
                        {verificationCode.map((value, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                value={value}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                maxLength={1}
                                className="w-10 h-12 text-center border rounded-md border-gray-300 text-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        ))}
                    </div>

                    <ButtonBg
                        className="w-full py-3 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50"
                        type="submit"
                        disabled={verificationCode.join("").trim().length !== 6 || loading}
                    >
                        {loading ? <RoundLoader /> : "Verify"}
                    </ButtonBg>

                    <div className="mt-5 text-sm text-gray-500 flex items-center justify-center">
                        Code expired?
                        <button
                            type="button"
                            onClick={handleResendCode}
                            disabled={resendLoading}
                            className="ml-1 text-blue-600 font-semibold hover:underline transition-all disabled:opacity-50"
                        >
                            {resendLoading ? "Sending..." : "Resend"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default VerifyEmail;
