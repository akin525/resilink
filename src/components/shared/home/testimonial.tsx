import React from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import avatar2 from "../../../assets/images/Avatar (4).png";
import avatar3 from "../../../assets/images/Avatar (5).png";
import avatar4 from "../../../assets/images/Avatar (6).png";
import teste from "../../../assets/images/bgk.png";

const testimonials = [
    {
        name: "Kate Festus",
        review: "Exceptional service from start to finish. The customer service personnel was professional, thorough and explained everything clearly.",
        image: avatar2,
        stars: 5,
    },
    {
        name: "Harry Janet",
        review: "Exceptional service from start to finish. The customer service personnel was professional, thorough and explained everything clearly.",
        image: avatar3,
        stars: 4,
    },
    {
        name: "Richard Benson",
        review: "Voice from start to finish. The service personnel was professional, thorough and explained everything clearly.",
        image: avatar4,
        stars: 5,
    },
];

const Arrow = ({ onClick, direction }: any) => (
    <div
        className={`absolute top-1/2 transform -translate-y-1/2 bg-yellow-400 text-white rounded-full p-2 z-10 cursor-pointer hover:bg-yellow-500 transition ${
            direction === "left" ? "-left-6" : "-right-6"
        }`}
        onClick={onClick}
    >
        {direction === "left" ? <HiChevronLeft size={24} /> : <HiChevronRight size={24} />}
    </div>
);

const TestimonialCarousel: React.FC = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <Arrow direction="right" />,
        prevArrow: <Arrow direction="left" />,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 1 },
            },
        ],
    };

    return (
        <section
            className="relative bg-cover bg-center py-20 px-4 md:px-10"
            style={{ backgroundImage: `url(${teste})` }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />
            <div className="relative max-w-7xl mx-auto z-10">
                <h2 className="text-white text-2xl md:text-3xl font-bold mb-12 text-center">What Our Clients Say</h2>

                <Slider {...settings}>
                    {testimonials.map((item, index) => (
                        <div key={index} className="px-3">
                            <div className="bg-white p-6 rounded-xl shadow-lg min-h-[240px]">
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-12 h-12 rounded-full object-cover border border-yellow-400"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-800">{item.name}</h4>
                                        <div className="flex gap-1 text-yellow-400 text-xs mt-1">
                                            {Array.from({ length: item.stars }).map((_, i) => (
                                                <FaStar key={i} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">{item.review}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default TestimonialCarousel;
