import { useState } from "react";
import { useForm } from "@formspree/react";
import { CustomInput } from "../../common/inputs/CustomInput";
import { ButtonBg } from "../buttons/Buttons";
import { SuccessModal } from "./success-modal";
import Heading from "./headingTitle";

const Contact: React.FC = () => {
  const [state, handleSubmit] = useForm("mqaeegka");
  const [open, setOpen] = useState(false);

  if (state.succeeded) {
    setOpen(true);
    return <SuccessModal open={open} onOpenChange={setOpen} />;
  }

  return (
      <section id="contact" className="bg-white md:px-10 px-4 py-20">
        <Heading heading="Need Help?" subheading="Contact Us" />
        <section className="w-full max-w-3xl mx-auto bg-gray-100 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <CustomInput label="First Name" type="text" name="firstName" placeholder="John" />
              <CustomInput label="Last Name" type="text" name="lastName" placeholder="Doe" />
            </div>
            <CustomInput label="Email" type="email" name="email" placeholder="example@email.com" />
            <CustomInput label="Subject" type="text" name="subject" placeholder="Enter subject" />
            <CustomInput label="Message" type="textarea" name="message" placeholder="Write your message here..." cols={30} rows={6} />
            <div className="flex justify-center">
              <ButtonBg className="bg-bc px-6 py-3 text-white w-full md:w-auto" type="submit" disabled={state.submitting}>
                {state.submitting ? <ButtonLoaderWithBg /> : "Send Message"}
              </ButtonBg>
            </div>
          </form>
        </section>
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
