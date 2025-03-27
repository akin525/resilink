import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { MdConnectWithoutContact } from "react-icons/md";
import { ButtonBg } from "../buttons/Buttons";
import { GoPasskeyFill } from "react-icons/go";
import Heading from "./headingTitle";

const About = () => {
  const iconStyles = "text-2xl md:text-3xl text-para";
  const navigate = useNavigate();

  const steps = [
    { icon: <GoPasskeyFill className={iconStyles} />, title: "No of Users", descrip: "230k" },
    { icon: <MdConnectWithoutContact className={iconStyles} />, title: "Rented Properties", descrip: "459M" },
    { icon: <FaUsers className={iconStyles} />, title: "No of Agents", descrip: "405" },
    { icon: <FaUsers className={iconStyles} />, title: "Total users", descrip: "789k" },
  ];

  return (
      <section id="about" className="md:px-10 px-4 py-20">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="w-full md:w-1/2">
            <Heading heading="About Us" subheading="Why Choose ResiLink?" />
            <div className="mt-10 text-gray-900 text-left md:text-lg font-medium">
              <p>
                ResiLink simplifies the process of finding your next home by providing a seamless connection to available houses through our dynamic platform.
              </p>
              <h3 className="pt-2 font-Chalty text-xl font-medium">Our Mission At ResiLink:</h3>
              <p>
                Our mission is to provide swift and seamless access to vacant and affordable apartments, leveraging innovation to make housing more accessible and affordable for all.
              </p>
              <h3 className="pt-2 font-Chalty text-xl font-medium">Our Vision:</h3>
              <p>
                Our vision is to become the benchmark for excellence in property renting and real estate in Africa and beyond, setting the standard for innovation, customer satisfaction, and community development.
              </p>
              <h3 className="pt-2 font-Chalty text-xl font-medium">Our Core Values:</h3>
              <p>
                We are guided by a set of core values that include excellence, innovation, customer centricity, and integrity.
              </p>
            </div>
            <div className="flex justify-center md:justify-start mt-6">
              <ButtonBg className="bg-bc px-10 py-3 text-white" onClick={() => navigate("/register")}>Join as Agent</ButtonBg>
            </div>
          </div>
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-10">
            {steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center md:items-start gap-4">
                  <div className="bg-gray-800/5 w-fit p-3 md:p-5 rounded-full flex items-center">
                    {step.icon}
                  </div>
                  <h3 className="text-bc text-base md:text-base font-semibold font-Chalty text-center md:text-left">
                    {step.title}
                  </h3>
                  <p className="text-gray-900 text-base md:text-3xl font-medium text-center md:text-left">
                    {step.descrip}
                  </p>
                </div>
            ))}
          </div>
        </div>
      </section>
  );
};

export default About;
