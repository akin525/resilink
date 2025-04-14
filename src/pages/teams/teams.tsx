import React from "react";

const teamMembers = [
    {
        name: "Emmanuel Festus",
        role: "Rental Agent",
        image: "/images/team1.jpg", // Replace with actual image paths
    },
    {
        name: "Christopher Jay",
        role: "Rental Agent",
        image: "/images/team2.jpg",
        active: true,
    },
    {
        name: "Oneyi Festus",
        role: "Rental Agent",
        image: "/images/team3.jpg",
    },
    {
        name: "Fred Simson",
        role: "Rental Agent",
        image: "/images/team4.jpg",
    },
];

const TeamSection: React.FC = () => {
    return (
        <section className="bg-gray-50 py-20 px-4 md:px-10">
            <div className="max-w-6xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-semibold text-gray-800 border border-yellow-400 inline-block px-6 py-2 rounded-full">
                    Our Team
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                {teamMembers.map((member, index) => (
                    <div
                        key={index}
                        className={`rounded-xl overflow-hidden p-6 text-center shadow-md transition-all duration-300 ${
                            member.active ? "bg-blue-900 text-white" : "bg-white"
                        }`}
                    >
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                        />
                        <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                        <p className="text-sm mb-4">{member.role}</p>
                        <button
                            className={`px-4 py-2 text-sm rounded-full font-medium ${
                                member.active
                                    ? "bg-yellow-400 text-gray-900"
                                    : "bg-gray-100 text-gray-600"
                            }`}
                        >
                            Ask a Question
                        </button>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default TeamSection;
