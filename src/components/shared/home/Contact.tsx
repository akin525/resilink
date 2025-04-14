import { useState } from "react";
import { useForm } from "@formspree/react";
import { CustomInput } from "../../common/inputs/CustomInput";
import { ButtonBg } from "../buttons/Buttons";
import { SuccessModal } from "./success-modal";
import imgg from "../../../../src/assets/images/contact.png";
const Contact: React.FC = () => {
    const [state, handleSubmit] = useForm("mqaeegka");
    const [open, setOpen] = useState(false);

    if (state.succeeded) {
        setOpen(true);
        return <SuccessModal open={open} onOpenChange={setOpen} />;
    }

    return (
        <section id="contact" className="bg-[#f5f7ff] py-20 px-4 md:px-10">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 bg-white shadow-md rounded-xl p-6 md:p-12">

                {/* Left side: Form */}
                <div className="w-full md:w-1/2 space-y-6">
                    <div className="inline-block bg-yellow-100 text-black text-sm font-semibold py-2 px-4 rounded-full shadow-sm">
                        Contact Us
                    </div>

                    <p className="text-base font-medium text-gray-700">
                        Have a question or need to book a service? Reach out today!
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <CustomInput
                                label=""
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                            />
                            <CustomInput
                                label=""
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                            />
                        </div>

                        <CustomInput
                            label=""
                            type="email"
                            name="email"
                            placeholder="Email"
                        />

                        <CustomInput
                            label=""
                            type="textarea"
                            name="message"
                            placeholder="Message"
                            cols={30}
                            rows={5}
                        />

                        <ButtonBg
                            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 w-full rounded-md transition duration-300"
                            type="submit"
                            disabled={state.submitting}
                        >
                            {state.submitting ? <ButtonLoaderWithBg /> : "Send Now"}
                        </ButtonBg>
                    </form>
                </div>

                {/* Right side: Image */}
                <div className="w-full md:w-1/2">
                    <img
                        src={imgg}
                        alt="Customer service"
                        className="rounded-lg shadow-md w-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
};

export default Contact;

const ButtonLoaderWithBg = () => (
    <div className="flex items-center justify-center h-6 w-6 animate-spin">
        <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4"></circle>
            <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
);
