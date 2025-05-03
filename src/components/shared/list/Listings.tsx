import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URLNew } from "../../../utils/apiRoutes";
import { getAuthToken } from "../../../utils/auth";
import logo from "/src/assets/react.svg"

const Listings: React.FC = () => {
    const [listings, setListings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const token = getAuthToken();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${BASE_URLNew}/api/properties`, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                const results = res.data?.data?.data || [];
                setListings(results);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching listings:", err);
                setLoading(false);
            });
    }, []);

    return (
        <section id="listings" className="bg-white px-4 md:px-10 py-20">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <p className="text-xl text-yellow-500 font-semibold mb-2">Featured Listings</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Best Rent Properties</h2>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-40 text-lg font-semibold text-gray-500">
                        Loading Properties...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {listings.map((listing, index) => {
                            let images: string[] = [];

                            if (listing.images) {
                                try {
                                    images = JSON.parse(listing.images).map((img: string) =>
                                        img.replace("https://admin.resilink.com.ng", "")
                                    );
                                } catch (e) {
                                    console.error("Invalid image JSON", e);
                                }
                            }

                            return (
                                <Link to={`/listings/details/${listing.id}`} key={index}>
                                    <div
                                        onClick={() => navigate(`/listings/details/${listing.id}`)}
                                        className="cursor-pointer relative rounded-xl shadow-lg overflow-hidden border-2 hover:border-yellow-500 transition-all"
                                    >
                                        <span className="absolute top-3 left-3 bg-yellow-400 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
                                            For rent
                                        </span>

                                        <span className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md cursor-pointer z-10">
                                            ❤️
                                        </span>

                                        <div className="relative h-56">
                                            <img
                                                src={`https://admin.resilink.com.ng/public${images?.[0] || "/placeholder.jpg"}`}
                                                alt="Property"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute bottom-3 left-3 flex gap-2 z-10">
                                                <span className="text-xs font-semibold px-3 py-1 border border-yellow-400 text-yellow-600 bg-white bg-opacity-80 rounded-md">
                                                    4 Photos
                                                </span>
                                                <span className="text-xs font-semibold px-3 py-1 border border-yellow-400 text-yellow-600 bg-white bg-opacity-80 rounded-md">
                                                    1 Video
                                                </span>
                                            </div>
                                        </div>

                                        <div className="bg-gray-100 text-gray-800 p-4">
                                            <h3 className="text-lg font-bold text-yellow-500">
                                                NGN {Number(listing.price).toLocaleString()}
                                                <span className="text-sm font-normal text-gray-600"> /yr</span>
                                            </h3>
                                            <p className="text-sm mt-1">📍 {listing.address}</p>
                                            <div className="flex flex-wrap text-sm mt-3 gap-4 font-light">
                                                <span>• {listing.bedrooms || 0} Bedrooms</span>
                                                <span>• {listing.parlour || 0} Parlour</span>
                                                <span>• {listing.kitchen || 0} Kitchen</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between bg-gray-100 px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={listing.agent?.avatar || logo}
                                                    alt="agent"
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                                <p className="font-semibold text-gray-700 text-sm">
                                                    {listing.agent?.name}
                                                </p>
                                            </div>
                                            <p className="text-sm text-gray-600 flex items-center gap-1">
                                                📅 {new Date(listing.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Listings;
