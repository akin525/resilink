import heroImage from "../../../assets/images/park.png";
import { useNavigate} from "react-router-dom";
import {useState} from "react";

const Hero = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const services = [
    { label: "Vacant Apartments", path: "/lists" },
    { label: "Cleaning Services", path: "/services" },
    { label: "Book ParkMyLoad", path: "/lists/packing" },
  ];
  const handleServiceClick = (path: string) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
    }, 500); // Simulate slight delay, adjust as needed
  };
  return (
      <section
          className="relative w-full h-[80vh] md:h-[90vh] bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 md:px-14"
          style={{backgroundImage: `url(${heroImage})`}}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>

        {/* Content */}
        <div className="relative flex flex-col items-center text-center text-white gap-4 md:gap-6 max-w-3xl">
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl leading-snug sm:leading-tight">
            Find Your Dream Home<br/> With Ease
          </h1>

          <div className="flex flex-wrap justify-center gap-2 text-xs sm:text-sm font-medium">
            <span>Easy</span>
            <span>•</span>
            <span>Transparent</span>
            <span>•</span>
            <span>Outstanding</span>
          </div>

          {/* Service Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mt-2 sm:mt-4">
            {services.map((service, idx) => (
                <button
                    key={idx}
                    onClick={() => handleServiceClick(service.path)}
                    className="border border-b-yellow-600 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm hover:bg-yellow-600 hover:text-[#0000A3] transition"
                >
                  {service.label}
                </button>
            ))}
          </div>

          {/* Search Bar */}
          <div
              className="flex flex-col sm:flex-row items-stretch sm:items-center mt-4 sm:mt-6 bg-white rounded-full overflow-hidden w-full max-w-xl">
            <input
                type="text"
                placeholder="GRA, Festac, Harmony Av..."
                className="flex-1 px-4 sm:px-5 py-3 text-gray-800 text-sm outline-none"
            />
            <button
                className="bg-yellow-400 text-[#0000A3] font-semibold px-4 sm:px-6 py-3 text-sm hover:bg-yellow-300 transition w-full sm:w-auto">
              Search
            </button>
          </div>
        </div>
        {loading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
              <div className="text-white text-lg font-semibold">Loading...</div>
              {/* You can replace with a spinner icon */}
            </div>
        )}
      </section>
  )
      ;
};

export default Hero;
