import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/types/Interface.tsx";

const Listings: React.FC = () => {
    const { listings, listings_loading } = useSelector((state: RootState) => state.listing);

    return (
        <section id="listings" className="bg-white px-4 md:px-10 py-20">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <p className="text-xl text-yellow-500 font-semibold mb-2">Featured Listings</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Best Rent Properties</h2>
                </div>

                {/* Loading State */}
                {listings_loading ? (
                    <div className="flex justify-center items-center h-40 text-lg font-semibold text-gray-500">
                        Loading Properties...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {listings.map((listing: any, i: number) => (
                            <div
                                key={i}
                                className={`relative rounded-xl shadow-lg overflow-hidden border-2 transition-all ${
                                    i === 0 ? "border-blue-600" : "border-transparent"
                                }`}
                            >
                                {/* Badge */}
                                <span className="absolute top-3 left-3 bg-yellow-400 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
                  For rent
                </span>

                                {/* Favorite Icon (optional) */}
                                <span className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md cursor-pointer z-10">
                  ❤️
                </span>

                                {/* Image */}
                                <div className="relative h-56">
                                    <img
                                        src={listing.images?.[0] || "/placeholder.jpg"}
                                        alt="Property"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-3 left-3 flex gap-2 z-10">
                    <span className="text-xs font-semibold px-3 py-1 border border-yellow-400 text-yellow-600 bg-white bg-opacity-80 rounded-md">
                      {listing.photos || 0} Photos
                    </span>
                                        <span className="text-xs font-semibold px-3 py-1 border border-yellow-400 text-yellow-600 bg-white bg-opacity-80 rounded-md">
                      {listing.videos || 0} Videos
                    </span>
                                    </div>
                                </div>

                                {/* Price and Details */}
                                <div className="bg-gray-100 text-gray-800 p-4">
                                    <h3 className="text-lg font-bold text-yellow-500">
                                        NGN {listing.price?.toLocaleString() || "450,000.00"}
                                        <span className="text-sm font-normal text-gray-600"> /yr</span>
                                    </h3>
                                    <p className="text-sm mt-1">📍 {listing.address || "Off Edo Street, Ekosodin"}</p>
                                    <div className="flex flex-wrap text-sm mt-3 gap-4 font-light">
                                        <span>• {listing.bedrooms || 0} Bedrooms</span>
                                        <span>• {listing.pulsur || 0} Parlour</span>
                                        <span>• {listing.kitchen || 0} Kitchen</span>
                                    </div>
                                </div>

                                {/* Agent Info Footer */}
                                <div className="flex items-center justify-between bg-gray-100 px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={listing.agentImg || "/user.png"}
                                            alt="agent"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <p className="font-semibold text-gray-700 text-sm">
                                            {listing.agent || "Clement Friday"}
                                        </p>
                                    </div>
                                    <p className="text-sm text-gray-600 flex items-center gap-1">
                                        📅 {listing.date || "07/04/2025"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Listings;
