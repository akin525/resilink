import React, { useEffect, useState } from "react";
import axios from "axios";

interface TeamMember {
    id: number;
    name: string;
    position: string;
    image: string;
}

const TeamSection: React.FC = () => {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios
            .get("https://admin.resilink.com.ng/api/teamlist")
            .then((response) => {
                if (response.data.status === "true") {
                    setTeamMembers(response.data.data);
                } else {
                    setError("Failed to load team data");
                }
            })
            .catch(() => {
                setError("An error occurred while fetching team data.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const getImageUrl = (filename: string) =>
        `https://admin.resilink.com.ng/public/images/${filename}`;

    return (
        <section className="bg-gray-50 py-20 px-4 md:px-10">
            <div className="max-w-6xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-semibold text-gray-800 border border-yellow-400 inline-block px-6 py-2 rounded-full">
                    Our Team
                </h2>
            </div>

            {loading ? (
                <div className="text-center text-gray-600">Loading...</div>
            ) : error ? (
                <div className="text-center text-red-500">{error}</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12 justify-center">
                    {teamMembers.map((member) => (
                        <div
                            key={member.id}
                            className="rounded-xl overflow-hidden p-6 text-center shadow-md bg-white"
                        >
                            <img
                                src={getImageUrl(member.image)}
                                alt={member.name}
                                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                            />
                            <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                            <p className="text-sm mb-4">{member.position}</p>
                            <button className="px-4 py-2 text-sm rounded-full font-medium bg-gray-100 text-gray-600">
                                Ask a Question
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default TeamSection;
