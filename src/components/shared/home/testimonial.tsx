import React from "react";
import { FaStar } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import avatar2 from "../../../assets/images/Avatar (4).png";
import avatar3 from "../../../assets/images/Avatar (5).png";
import avatar4 from "../../../assets/images/Avatar (6).png";
import backgroundImage from "../../../assets/images/bgk.png";
import { Link } from "react-router-dom";

const testimonials = [
    {
        name: "Kate Festus",
        review:
            "Exceptional service from start to finish. The customer service personnel was professional, thorough and explained everything clearly.",
        image: avatar2,
        stars: 5,
    },
    {
        name: "Harry Janet",
        review:
            "Exceptional service from start to finish. The customer service personnel was professional, thorough and explained everything clearly.",
        image: avatar3,
        stars: 4,
    },
    {
        name: "Richard Benson",
        review:
            "Exceptional service from start to finish. The customer service personnel was professional, thorough and explained everything clearly.",
        image: avatar4,
        stars: 5,
    },
];

const TestimonialCarousel: React.FC = () => {
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, offsetWidth } = scrollRef.current;
            const scrollTo =
                direction === "left"
                    ? scrollLeft - offsetWidth
                    : scrollLeft + offsetWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <div className="relative bg-white overflow-hidden">
            {/* CTA Button */}
            <div className="text-center pt-10 pb-6">
                <Link
                    to="/register"
                    className="bg-blue-700 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow hover:bg-blue-800 transition"
                >
                    Join as an Agent
                </Link>
            </div>

            {/* Testimonial Section */}
            <section
                className="relative bg-cover bg-center py-20 px-4 md:px-8"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-60 z-0" />

                {/* Yellow Block */}
                <div className="absolute bottom-0 right-0 w-36 h-36 bg-yellow-400 z-0" />

                <div className="relative max-w-6xl mx-auto z-10">
                    <h2 className="text-white text-3xl font-bold mb-12 text-center">
                        What Our Clients Say
                    </h2>

                    {/* Carousel Controls */}
                    <div className="relative">
                        <button
                            onClick={() => scroll("left")}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white text-gray-700 p-2 rounded-full shadow hover:bg-gray-200"
                        >
                            <FiChevronLeft size={24} />
                        </button>

                        <div
                            ref={scrollRef}
                            className="flex gap-6 overflow-x-auto px-10 scrollbar-hide snap-x snap-mandatory"
                        >
                            {testimonials.map((item, index) => (
                                <div
                                    key={index}
                                    className="min-w-[280px] md:min-w-[320px] lg:min-w-[360px] snap-start bg-white p-6 rounded-xl shadow-lg flex-shrink-0 transition-transform hover:scale-105"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <img
                                            src={item.image}
                                            alt={`${item.name}'s avatar`}
                                            className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400"
                                        />
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-900">
                                                {item.name}
                                            </h4>
                                            <div className="flex gap-1 text-yellow-400 text-xs">
                                                {Array.from({ length: item.stars }).map((_, i) => (
                                                    <FaStar key={i} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        {item.review}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => scroll("right")}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white text-gray-700 p-2 rounded-full shadow hover:bg-gray-200"
                        >
                            <FiChevronRight size={24} />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TestimonialCarousel;
