import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../../components/common/logo/Logo";
import { ButtonBg } from "../../components/shared/buttons/Buttons";
import RoundLoader from "../../components/shared/loaders/RoundLoader";
import { toastOptions } from "../../utils/helpers";
import { Eye, EyeOff } from "lucide-react"; // install lucide-react if not already

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    password_confirmation: "",
    type: "user",
  });

  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://admin.resilink.com.ng/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const res = await response.json();

      if (!response.ok) {
        if (res.errors && typeof res.errors === "object") {
          Object.values(res.errors).forEach((messages: any) => {
            if (Array.isArray(messages)) {
              messages.forEach((msg: string) => {
                toast.error(msg, toastOptions);
              });
            }
          });
        } else {
          toast.error(res.message || "Registration failed", toastOptions);
        }
      } else {
        toast.success(
            `${res.message || "Registration successful"}, Please verify code have been send to your email. Verification code not in mail inbox? 
            Check your mail spam folder`,
            toastOptions
        );
        localStorage.setItem("userEmail", formData.email);
        setTimeout(() => navigate("/verify-email"), 3000);
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong", toastOptions);
    } finally {
      setLoading(false);
    }
  };

  return (
      <section className="bg-[#0000cc] w-full min-h-screen flex justify-center items-center relative px-4">
        <div className="absolute top-6 left-6">
          <Logo color="white" />
        </div>

        <div className="bg-white w-full max-w-md px-6 py-10 rounded-3xl shadow-xl">
          <h2 className="text-center text-2xl font-bold text-[#0000cc]">Create an Account</h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Sign up now to get started with an account.
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name */}
            <Input icon="👤" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" />
            {/* Username */}
            <Input icon="@" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
            <Input icon="#" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" />
            {/* Email */}
            <Input icon="📧" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" />

            {/* Password */}
            <div className="flex items-center bg-gray-100 rounded-full px-4">
              <span className="text-gray-500 text-sm mr-2">🔒</span>
              <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="flex-1 h-10 bg-transparent text-sm focus:outline-none"
              />
              <span
                  className="cursor-pointer text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
              >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
            </div>

            {/* Confirm Password */}
            <div className="flex items-center bg-gray-100 rounded-full px-4">
              <span className="text-gray-500 text-sm mr-2">🔒</span>
              <input
                  type={showConfirm ? "text" : "password"}
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="flex-1 h-10 bg-transparent text-sm focus:outline-none"
              />
              <span
                  className="cursor-pointer text-gray-500"
                  onClick={() => setShowConfirm((prev) => !prev)}
              >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
            </div>

            {/* Type */}
            <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full rounded-full px-4 py-2 bg-gray-100 text-sm text-black focus:outline-none"
            >
              <option value="user">User</option>
              <option value="agent">Agent</option>
            </select>

            {/* Terms */}
            <div className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" />
              <span>
              I agree to the{" "}
                <span className="underline cursor-pointer">Terms of Service</span>
            </span>
            </div>

            {/* Submit */}
            <ButtonBg
                className="w-full h-10 text-white font-semibold rounded-full border border-[#0000cc] bg-[#0000cc] hover:bg-white hover:text-[#0000cc] transition"
                type="submit"
                disabled={
                    !formData.name || !formData.username || !formData.email ||
                    !formData.password || !formData.password_confirmation
                }
            >
              {loading ? <RoundLoader /> : "Sign Up"}
            </ButtonBg>

            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <a href="/login" className="font-semibold underline text-[#0000cc]">Log in</a>
            </p>
          </form>
        </div>
      </section>
  );
};

// Reusable Input component
const Input = ({
                 icon,
                 name,
                 value,
                 onChange,
                 placeholder,
                 type = "text",
               }: {
  icon: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
}) => (
    <div className="flex items-center bg-gray-100 rounded-full px-4">
      <span className="text-gray-500 text-sm mr-2">{icon}</span>
      <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 h-10 bg-transparent text-sm focus:outline-none"
      />
    </div>
);

export default Register;
