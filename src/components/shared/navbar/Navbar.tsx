import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Logo from "../../common/logo/Logo";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const navLinks = [
        { text: "Home Page", link: "/" },
        { text: "Dashboard", link: "/dashboard" },
        { text: "Services", link: "/services" },
        { text: "About Us", link: "/about" },
    ];

    const handleNavClick = (link: string) => {
        setLoading(true);
        setTimeout(() => {
            navigate(link);
            setLoading(false);
        }, 500); // Adjust delay to match loading animation
    };

    return (
        <header className="bg-[#0000A3] px-8 py-4 flex items-center justify-between w-full fixed top-0 left-0 z-50">
            {/* Logo */}
            <RouterLink
                to="/"
                className="flex items-center gap-2 text-white text-xl font-bold"
            >
                <Logo />
            </RouterLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10">
                {navLinks.map((navLink, index) => (
                    <button
                        key={index}
                        onClick={() => handleNavClick(navLink.link)}
                        className="text-white text-sm font-medium hover:opacity-80 transition"
                    >
                        {navLink.text}
                    </button>
                ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
                <button
                    onClick={() => handleNavClick("/register")}
                    className="border border-white text-white px-5 py-2 rounded-full text-sm hover:bg-white hover:text-[#0000A3] transition"
                >
                    Sign Up
                </button>
                <button
                    onClick={() => handleNavClick("/login")}
                    className="border border-white text-white px-5 py-2 rounded-full text-sm hover:bg-white hover:text-[#0000A3] transition"
                >
                    Log In
                </button>
            </div>

            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-white text-2xl focus:outline-none"
            >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-[#0000A3] flex flex-col items-center gap-6 py-8 md:hidden z-40 transition-all duration-300">
                    {navLinks.map((navLink, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                handleNavClick(navLink.link);
                            }}
                            className="text-white text-base font-medium hover:opacity-80 transition"
                        >
                            {navLink.text}
                        </button>
                    ))}

                    <div className="flex flex-col gap-4 mt-4">
                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                handleNavClick("/register");
                            }}
                            className="border border-white text-white px-5 py-2 rounded-full text-sm hover:bg-white hover:text-[#0000A3] transition"
                        >
                            Sign Up
                        </button>
                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                handleNavClick("/login");
                            }}
                            className="border border-white text-white px-5 py-2 rounded-full text-sm hover:bg-white hover:text-[#0000A3] transition"
                        >
                            Log In
                        </button>
                    </div>
                </div>
            )}

            {/* Loader */}
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
                    <div className="text-white text-lg font-semibold">Loading...</div>
                    {/* You can replace with a spinner icon */}
                </div>
            )}
        </header>
    );
};

export default Navbar;
