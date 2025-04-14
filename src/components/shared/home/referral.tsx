
import houseImg from "../../../assets/images/images1.png";
import cleanImg from "../../../assets/images/images2.png";
import truckImg from "../../../assets/images/images3.png";
import { FaUserPlus, FaListAlt, FaPhoneAlt, FaCalendarCheck } from "react-icons/fa";

const services = [
  {
    title: "House Rentals Service",
    description:
        "Discover a wide range of vacant apartments for rent. Our platform helps you with your search journey, ensuring you find your dream home.",
    image: houseImg,
  },
  {
    title: "Cleaning Service",
    description:
        "Professional cleaning for homes or commercial spaces. Keep your environment clean while saving time and energy.",
    image: cleanImg,
  },
  {
    title: "Truck Lifting Service",
    description:
        "Need a vehicle and driver for moving? Book our trusted lifting service to move your items safely and efficiently.",
    image: truckImg,
  },
];

const steps = [
  { icon: <FaUserPlus />, label: "Sign up" },
  { icon: <FaListAlt />, label: "Select a Service" },
  { icon: <FaPhoneAlt />, label: "Contact Customer Service" },
  { icon: <FaCalendarCheck />, label: "Book Services" },
];

const Services = () => {
  return (
      <section className="bg-gray-50 py-20 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Services</h2>
          </div>

          {/* Services Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
            {services.map((service, index) => (
                <div key={index} className="relative overflow-hidden rounded-xl shadow-lg group">
                  <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-64 object-cover transition-transform group-hover:scale-105 duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-end">
                    <h3 className="text-white text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-gray-200 text-sm">{service.description}</p>
                  </div>
                </div>
            ))}
          </div>

          {/* How It Works */}
          <div className="text-center mb-10">
            <h3 className="text-2xl font-semibold text-gray-800 mb-10">How It Works</h3>
            <div className="flex flex-wrap justify-center gap-10 max-w-4xl mx-auto">
              {steps.map((step, i) => (
                  <div key={i} className="flex flex-col items-center text-center space-y-2">
                    <div className="text-yellow-500 text-3xl">{step.icon}</div>
                    <p className="text-gray-700 font-medium">{step.label}</p>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
};

export default Services;
