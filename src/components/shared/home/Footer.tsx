import Logo from "../../common/logo/Logo";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const iconStyles = "text-4xl text-white";
  return (
    <section className="relative z-10 py-24 bg-black flex justify-center md:px-14 px-2">
      <section className="">
        <section className="flex justify-center mb-8">
          <Logo />
        </section>
        <section className="flex justify-center gap-5 mb-8">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={"https://www.facebook.com/profile.php?id=61561935312527"}
          >
            <FaFacebook className={iconStyles} />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={"https://www.instagram.com"}
          >
            <FaInstagram className={iconStyles} />
          </a>
          <a target="_blank" rel="noopener noreferrer" href={"https://x.com"}>
            <FaTwitter className={iconStyles} />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={"https://whatsapp.com"}
          >
            <FaWhatsapp className={iconStyles} />
          </a>
        </section>
        <p className="text-sm text-center text-[#fff]">
          ©{new Date().getFullYear()} ~ Resilink. All rights reserved.
        </p>
      </section>
    </section>
  );
};

export default Footer;
