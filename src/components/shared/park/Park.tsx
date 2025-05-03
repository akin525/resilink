const Park = () => {

  return (
      <section className="bg-white py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight">
              <span className="underline decoration-blue-600 decoration-4">Service Of Our Esteemed</span><br/>
              <span className="text-blue-900 underline decoration-blue-600 decoration-4">Truck Packing Agency</span>
            </h2>

            <p className="text-gray-600 text-sm md:text-base max-w-md">
              We offer precision relocation and efficient ways to transport your properties conveniently by your
              location and drop-off needs.
            </p>

            {/* Stat Box */}
            <div className="inline-block bg-gray-100 rounded-lg px-6 py-4 shadow-sm">
              <p className="text-xl font-bold text-blue-700">1000+</p>
              <p className="text-sm text-gray-600">Satisfied Clients</p>
            </div>

            {/* Call to Action */}
            <a
                href="https://wa.me/2348032926144"
                target="_blank"
                rel="noopener noreferrer"
            >
              <button
                  className="mt-4 bg-[#0000cc] text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#0000cc] border border-[#0000cc] transition"
              >
                Book Now
              </button>
            </a>

          </div>

          {/* Right Content (Services box) */}
          <div className="flex justify-center md:justify-end">
            <div className="border-2 border-yellow-500 rounded-full px-6 py-10 text-center w-72">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Our Services</h3>
              <p className="text-sm text-gray-600">
                Reliable, professional relocation and logistics services tailored to your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

  );
};

export default Park;
