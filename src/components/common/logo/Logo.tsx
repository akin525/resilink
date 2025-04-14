import { Link } from "react-router-dom";
import LogoImage from "../../../assets/images/resilink-white.png";
import LogoImageBlack from "../../../assets/images/resilink-black.png";
import { LogoProps } from "../../../types/Interface";

const Logo: React.FC<LogoProps> = ({ color }) => {
    return (
        <section className="w-[120px]">
            <Link to="/">
                <img
                    className="w-full"
                    src={color === "black" ? LogoImageBlack : LogoImage}
                    alt="ResiLink Logo"
                />
            </Link>
        </section>
    );
};

export default Logo;
