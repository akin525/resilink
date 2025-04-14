import aboutImg from "../../../../src/assets/images/about.png";

const About = () => {

  const values = [
    { title: "Staff base", value: "1000+" },
    { title: "Number of Agents", value: "50+" },
    { title: "Active Listings", value: "100+" },
    { title: "Satisfied Clients", value: "100%" },
  ];

  return (
      <section id="about" className="bg-white py-20 px-4 md:px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-12">

          {/* Left side: image block with yellow accent card */}
          <div className="w-full md:w-1/2 relative">
            {/* Yellow card, peeked out more */}
            <div className="bg-yellow-400 absolute -left-6 md:-left-10 -bottom-6 md:-bottom-10 w-[105%] h-[105%] z-0 rounded-md shadow-lg transition-all duration-300"></div>

            {/* Image on top */}
            <img
                src={aboutImg}
                alt="Team meeting"
                className="relative z-10 rounded-md shadow-lg w-full"
            />
          </div>



          {/* Right side: content */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className="inline-block bg-yellow-100 text-black text-sm font-semibold py-2 px-4 rounded-full shadow-sm">
              About Us
            </div>

            <p className="text-gray-800 text-sm md:text-base leading-relaxed">
              ResiLink is a growing prop-tech company dedicated to transforming the way people find and access space in properties & listings. Our platform connects individuals with vacant apartments through dynamic algorithms for ease in convenience of travel, targeting, resulting in seamless rental experiences.
            </p>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-gray-900">Our Story</h3>
              <p>
                We are committed to directly linking landlords and customers, eliminating intermediaries and making housing more accessible and affordable. Our system enhances convenience and transparency, building trust between property owners and residents.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-gray-900">Mission</h3>
              <p>
                To provide swift and seamless access to vacant and affordable apartments, leveraging innovation to make housing more accessible and affordable for all.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-gray-900">Vision</h3>
              <p>
                To become the benchmark for excellence in property renting and real estate in Africa and beyond.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-gray-900">Core Values</h3>
              <div className="flex flex-wrap gap-3 text-sm font-medium text-gray-700">
                <span>• Excellence</span>
                <span>• Innovation</span>
                <span>• Customer Centricity</span>
                <span>• Integrity</span>
              </div>
            </div>

            {/* Value stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
              {values.map((val, index) => (
                  <div key={index} className="text-center md:text-left">
                    <p className="text-yellow-600 font-semibold text-lg md:text-xl">{val.value}</p>
                    <p className="text-gray-600 text-sm">{val.title}</p>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
};

export default About;
