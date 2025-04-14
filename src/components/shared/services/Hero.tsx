import heroImage from "../../../assets/images/servi.png";

const Hero = () => {
  return (
      <section
          className="relative w-full h-[80vh] md:h-[90vh] bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 md:px-14"
          style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>

        {/* Content */}
        <div className="relative flex flex-col items-center text-center text-white gap-4 md:gap-6 max-w-3xl">
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl leading-snug sm:leading-tight">
            Your Trusted Cleaning  <br /> Partner
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
            {["Vacant Apartments", "Cleaning Services", "Book Packing Truck"].map((service, idx) => (
                <button
                    key={idx}
                    className="border border-yellow-400 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm hover:bg-yellow-400 hover:text-[#0000A3] transition"
                >
                  {service}
                </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center mt-4 sm:mt-6 bg-white rounded-full overflow-hidden w-full max-w-xl">
            <input
                type="text"
                placeholder="GRA, Festac, Harmony Av..."
                className="flex-1 px-4 sm:px-5 py-3 text-gray-800 text-sm outline-none"
            />
            <button className="bg-yellow-400 text-[#0000A3] font-semibold px-4 sm:px-6 py-3 text-sm hover:bg-yellow-300 transition w-full sm:w-auto">
              Search
            </button>
          </div>
        </div>
      </section>
  );
};

export default Hero;
