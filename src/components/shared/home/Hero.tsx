import heroImage from "../../../assets/images/hero-img.jpg";
import { ButtonBg } from "../buttons/Buttons";

const Hero = () => {
  return (
      <section
          className="relative w-full h-[80vh] md:h-[65vh] bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 md:px-14"
          style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>

        {/* Content */}
        <div className="relative flex flex-col items-center text-center text-white gap-6 max-w-3xl">
          <h4
              data-aos="fade-up"
              data-aos-delay="500"
              className="font-bold text-xl md:text-xl leading-tight capitalize"
          >
            Find Your Dream Home with Ease.
          </h4>

          <p
              data-aos="fade-up"
              data-aos-delay="1000"
              className="text-lg md:text-xl text-neutral-300"
          >
            Welcome to ResiLink, the ultimate platform for discovering exceptional apartments. Our
            cutting-edge solution simplifies the home-finding process, connecting you with your
            perfect residence in no time.
          </p>

          <p
              data-aos="fade-up"
              data-aos-delay="1200"
              className="text-lg md:text-xl text-neutral-300 font-semibold"
          >
            Zero Stress! Zero Agent Fee! Free House Cleaning Service!
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <ButtonBg
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
                onClick={() => window.location.hash = "#listings"}
                aria-label="Get Started"
            >
              Get Started
            </ButtonBg>

            <a
                href="https://drive.usercontent.google.com/download?id=1-5ec51elAfR1-UjcuMGl3rsx34tMtI3k&export=download"
                download
                rel="noopener noreferrer"
            >
              <ButtonBg
                  className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition"
                  aria-label="Download App"
              >
                Download App
              </ButtonBg>
            </a>
          </div>
        </div>
      </section>
  );
};

export default Hero;
