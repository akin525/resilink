import Logo from "../../common/logo/Logo";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const iconStyles = "text-xl text-gray-600 hover:text-blue-500 transition";

  return (
      <footer className="bg-[#f9f9f9] text-gray-700 py-14 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Column 1: Logo and description */}
          <div className="space-y-4">
            <Logo color="black" />

            <p className="text-sm text-gray-600">
              ResiLink is a pioneering prop-tech company dedicated to transforming the way people find and access vacant properties & listings. Our platform connects individuals with vacant apartments through dynamic algorithms for ease and efficient experience.
            </p>
          </div>

          {/* Column 2: Pages */}
          <div>
            <h3 className="font-semibold mb-3">Pages</h3>
            <ul className="space-y-2 text-sm">
              <li>• Home Page</li>
              <li>• Services</li>
              <li>• About us</li>
              <li>• Listings</li>
            </ul>
          </div>

          {/* Column 3: Info */}
          <div>
            <h3 className="font-semibold mb-3">Information</h3>
            <ul className="space-y-2 text-sm">
              <li>• Privacy Policy</li>
              <li>• Team</li>
              <li>• Agents</li>
              <li>• FAQs</li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-semibold mb-3">Quick Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>📞 +2348032926144</li>
              <li>📧 info.resilink.@gmail.com</li>
            </ul>
            <div className="flex items-center gap-4 mt-4">
              <a href="https://www.facebook.com/profile.php?id=61561935312527" target="_blank" rel="noopener noreferrer">
                <FaFacebook className={iconStyles} />
              </a>
              <a href="https://www.instagram.com/resilink_housing_services?igsh=ZGUzMzM3NWJiOQ==" target="_blank" rel="noopener noreferrer">
                <FaInstagram className={iconStyles} />
              </a>
              {/*<a href="https://x.com" target="_blank" rel="noopener noreferrer">*/}
              {/*  <FaTwitter className={iconStyles} />*/}
              {/*</a>*/}
              <a href="https://wa.link/fakcpo" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className={iconStyles} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t pt-4 text-center text-xs text-blue-800">
          Copyrights {new Date().getFullYear()} ResiLink. All rights reserved.
        </div>
      </footer>
  );
};

export default Footer;
