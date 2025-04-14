import React from "react";
import { FaHome } from "react-icons/fa";
import PGG from "../../../assets/images/se.png";

const services = [
  { title: "Single Room", price: "₦1,500.00" },
  { title: "Self Contain", price: "₦2,500.00", active: true },
  { title: "Flat Rooms", price: "₦5,000.00" },
  { title: "Duplex Apartment", price: "₦7,000.00" },
  { title: "Commercial Building", price: "₦10,000.00" },
];

const ServiceSection: React.FC = () => {
  return (
      <section className="py-20 px-4 md:px-10 bg-white">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Always Provide The <br className="hidden md:block" />
            Best Service
          </h2>
          <p className="inline-block border-2 border-yellow-400 rounded-full px-6 py-1 text-sm font-medium text-gray-700">
            Our Services
          </p>
          <p className="text-gray-600 mt-2 max-w-xl mx-auto text-sm">
            Schedule your home or office cleaning today with our affordable and efficient cleaning services.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
              <div
                  key={index}
                  className={`rounded-xl shadow-md text-center p-6 min-h-[260px] flex flex-col justify-between transition-all ${
                      service.active
                          ? "bg-[#0018a8] text-white border-2 border-yellow-400"
                          : "bg-gray-100 text-gray-800"
                  }`}
              >
                <div className="text-yellow-400 text-3xl mb-4 mx-auto">
                  <FaHome />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Schedule an inspection today and get the best cleaning experience.
                  </p>
                </div>
                <div
                    className={`font-semibold text-white py-2 rounded-md ${
                        service.active ? "bg-yellow-400 text-black" : "bg-[#0018a8]"
                    }`}
                >
                  {service.price}
                </div>
              </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-24 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Image */}
          <div className="md:w-1/2 w-full">
            <img
                src={PGG}
                alt="Cleaning Equipment"
                className="w-full rounded-xl object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="md:w-1/2 w-full text-center md:text-left">
            <div className="inline-block border-2 border-yellow-400 px-5 py-1 rounded-full text-sm font-medium text-gray-700 mb-5">
              Why Choose Us?
            </div>
            <ul className="text-gray-700 text-sm space-y-3">
              <li>✅ Professional trained staff</li>
              <li>✅ Eco-friendly cleaning products</li>
              <li>✅ Reliable scheduling to suit your needs</li>
              <li>✅ 100% satisfaction guarantee</li>
            </ul>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-20 flex justify-center">
          <button className="bg-[#0018a8] hover:bg-blue-900 text-white font-semibold px-10 py-3 rounded-full transition">
            Book Now!
          </button>
        </div>
      </section>
  );
};

export default ServiceSection;
