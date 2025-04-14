import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/types/Interface.tsx";
import { ButtonBg } from "../../shared/buttons/Buttons";

const Listings: React.FC = () => {
    const { listings, listings_loading } = useSelector((state: RootState) => state.listing);
    const [showAll, setShowAll] = useState(false);

    const displayedListings = showAll ? listings : listings.slice(0, 3);

    return (
        <section id="listings" className="bg-white px-4 md:px-10 py-20">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <p className="text-xl text-yellow-600 font-semibold mb-2">Featured Listings</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Best Rent Properties</h2>
                </div>

                {listings_loading ? (
                    <div className="flex justify-center items-center h-40 text-lg font-semibold text-gray-500">
                        Loading Properties...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayedListings.map((listing: any, i: number) => (
                            <div
                                key={i}
                                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 relative"
                            >
                                {/* For Rent Badge */}
                                <span
                                    className="absolute top-3 left-3 bg-yellow-400 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
                                    For rent
                                </span>

                                {/* (Optional) Favorite Icon */}
                                <span
                                    className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md cursor-pointer">
                                    ❤️
                                </span>

                                {/* Image Section */}
                                <div className="h-56 relative">
                                    <img
                                        src={listing.images?.[0] || "/placeholder.jpg"}
                                        alt="Property"
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Photos/Videos */}
                                    <div className="absolute bottom-3 left-3 flex gap-2">
                                        <span
                                            className="text-xs font-semibold px-3 py-1 border border-yellow-400 text-yellow-500 bg-white bg-opacity-70 rounded-md">
                                            {listing.photos || 0} Photos
                                        </span>
                                        <span
                                            className="text-xs font-semibold px-3 py-1 border border-yellow-400 text-yellow-500 bg-white bg-opacity-70 rounded-md">
                                            {listing.videos || 0} Videos
                                        </span>
                                    </div>
                                </div>

                                {/* Price and Address Section */}
                                <div className="bg-[#0018a8] text-white p-4">
                                    <h3 className="text-lg font-bold text-yellow-400">
                                        NGN {listing.price?.toLocaleString() || "450,000.00"}
                                        <span className="text-sm font-normal text-white">/Yr</span>
                                    </h3>
                                    <p className="text-sm mt-1">📍 {listing.address || "Off Edo Street, Ekosodin"}</p>

                                    <div className="flex flex-wrap text-sm mt-3 gap-4 font-light">
                                        <span>• {listing.bedrooms || 0} Bedrooms</span>
                                        <span>• {listing.pulsur || 0} Parlour</span>
                                        <span>• {listing.kitchen || 0} Kitchen</span>
                                    </div>
                                </div>

                                {/* Agent Info */}
                                <div className="flex items-center justify-between bg-gray-100 px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={listing.agentImg || "/user.png"}
                                            alt="agent"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <p className="font-semibold text-gray-700 text-sm">{listing.agent || "Clement Friday"}</p>
                                    </div>
                                    <p className="text-sm text-gray-600 flex items-center gap-1">
                                        📅 {listing.date || "07/04/2025"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Toggle Button */}
                <div className="mt-12 flex justify-center">
                    {listings.length > 3 && !showAll && (
                        <ButtonBg
                            className="bg-[#0018a8] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-900 transition-all"
                            onClick={() => setShowAll(true)}
                        >
                            See All
                        </ButtonBg>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Listings;
