import React, { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa';
import { AccordionItem } from '../../../types/Interface';
import { PiNumberFive, PiNumberFour, PiNumberOne, PiNumberSix, PiNumberThree, PiNumberTwo } from 'react-icons/pi';

const Faq: React.FC = () => {
    const iconStyles = "text-swhite"
    const [accordions, setAccordions] = useState<AccordionItem[]>([
        {
            title: "What is StudConnect?",
            icon: <PiNumberOne className={iconStyles} />,
            content: "StudConnect is a platform designed to connect students with mentors, peers, and resources to enhance their academic and professional growth.",
        },
        {
            title: "How do I create an account on StudConnect?",
            icon: <PiNumberTwo className={iconStyles} />,
            content: "To create an account, click on the 'Sign Up' button on the homepage, fill in the required information, and follow the verification process to complete your registration.",
        },
        {
            title: "How can I find a mentor?",
            icon: <PiNumberThree className={iconStyles} />,
            content: "You can find a mentor by navigating to the 'Mentors' section, where you can search and filter through profiles to find a mentor that matches your needs.",
        },
        {
            title: "What kind of events does StudConnect offer?",
            icon: <PiNumberFour className={iconStyles} />,
            content: "StudConnect offers a variety of events including webinars, workshops, and networking sessions focused on personal development, career guidance, and academic support.",
        },
        {
            title: "How can I join a group?",
            icon: <PiNumberFive className={iconStyles} />,
            content: "To join a group, visit the 'Groups' section, browse through the available groups, and click on 'Join' to become a member of the group that interests you.",
        },
        {
            title: "Is StudConnect free to use?",
            icon: <PiNumberSix className={iconStyles} />,
            content: "Yes, StudConnect offers a free version with access to core features. We also provide premium plans with additional benefits and resources.",
        },
    ]);

    const toggleAccordion = (index: number): void => {
        setAccordions(
            accordions.map((acc, i) => {
                if (i === index) {
                    return { ...acc, isOpen: !acc.isOpen };
                }
                return acc;
            })
        );
    };

    return (
        <section id='faqs' className="relative pt-20 bg-dv py-36 md:px-14 px-2 z-10">
            <h1
                className="text-center text-white md:text-[46px] text-[26px] mb-10 md:py-0 py-3 capitalize"
            >Frequently Asked Questions</h1>
            <section className="w-full lg:flex rounded-md">
                <section className="w-full bg-dvgray p-5">
                    <section className="container mx-auto mt-8">
                        {accordions.map((acc, i) => (
                            <section
                                key={i}
                                className="border border-swhite2 rounded-lg mb-6"
                            >
                                <section
                                    className="flex items-center justify-between cursor-pointer bg-dv pr-4"
                                    onClick={() => toggleAccordion(i)}
                                >
                                    <section className="flex items-center p-2">
                                        <section className="linear-gradient md:p-4 p-2">{acc.icon}</section>
                                        <span className="text-xs md:text-md pl-2 leading-5 text-swhite uppercase">
                                            {acc.title}
                                        </span>
                                    </section>
                                    {acc.isOpen ? (
                                        <FaMinus
                                            className={`text-lg md:text-xl transition-transform transform text-swhite ${acc.isOpen ? "rotate-180" : ""
                                                }`}
                                        />
                                    ) : (
                                        <FaPlus
                                            className={`text-lg md:text-xl transition-transform transform text-swhite ${acc.isOpen ? "rotate-180" : ""
                                                }`}
                                        />
                                    )}
                                </section>
                                {acc.isOpen && (
                                    <section className="px-4 py-2">
                                        <p className="text-xs md:text-sm text-swhite2 leading-5 00">{acc.content}</p>
                                    </section>
                                )}
                            </section>
                        ))}
                    </section>
                </section>
            </section>
        </section>
    )
}

export default Faq