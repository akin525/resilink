import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Logo from "../../common/logo/Logo";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { text: "Home Page", link: "/" },
        { text: "Services", link: "/services" },
        { text: "About Us", link: "/#about" },
        { text: "Listings", link: "/#listings" },
    ];

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
                    <RouterLink
                        key={index}
                        to={navLink.link}
                        className="text-white text-sm font-medium hover:opacity-80 transition"
                    >
                        {navLink.text}
                    </RouterLink>
                ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
                <RouterLink to="/register">
                    <button className="border border-white text-white px-5 py-2 rounded-full text-sm hover:bg-white hover:text-[#0000A3] transition">
                        Sign Up
                    </button>
                </RouterLink>
                <RouterLink to="/login">
                    <button className="border border-white text-white px-5 py-2 rounded-full text-sm hover:bg-white hover:text-[#0000A3] transition">
                        Log In
                    </button>
                </RouterLink>
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
                        <RouterLink
                            key={index}
                            to={navLink.link}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-white text-base font-medium hover:opacity-80 transition"
                        >
                            {navLink.text}
                        </RouterLink>
                    ))}

                    <div className="flex flex-col gap-4 mt-4">
                        <RouterLink to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                            <button className="border border-white text-white px-5 py-2 rounded-full text-sm hover:bg-white hover:text-[#0000A3] transition">
                                Sign Up
                            </button>
                        </RouterLink>
                        <RouterLink to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                            <button className="border border-white text-white px-5 py-2 rounded-full text-sm hover:bg-white hover:text-[#0000A3] transition">
                                Log In
                            </button>
                        </RouterLink>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
