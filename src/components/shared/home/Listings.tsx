import  { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URLNew } from "../../../utils/apiRoutes.tsx";
import { ButtonBg } from "../../shared/buttons/Buttons";
import {getAuthToken} from "../../../utils/auth.tsx";
import {Link} from "react-router-dom";
import logo from "/src/assets/react.svg"

const Listings: React.FC = () => {
    const [showAll] = useState(false);
    const [filteredListings, setFilteredListings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const token = getAuthToken();

    useEffect(() => {
        axios.get(`${BASE_URLNew}/api/propertylist`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                const results = res.data?.data?.data || [];
                setFilteredListings(results);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching listings:', err);
                setLoading(false);
            });
    }, [token]);

    const displayedListings = showAll ? filteredListings : filteredListings.slice(0, 3);

    return (
        <section id="listings" className="bg-white px-4 md:px-10 py-20">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <p className="text-xl text-yellow-600 font-semibold mb-2">Featured Listings</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Best Rent Properties</h2>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-40 text-lg font-semibold text-gray-500">
                        Loading Properties...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayedListings.map((listing, i) => {
                            let images: string[] = [];

                            if (listing.images) {
                                try {
                                    images = JSON.parse(listing.images).map((img: string) =>
                                        img.replace('https://admin.resilink.com.ng', '')
                                    );
                                } catch (e) {
                                    console.error('Invalid image JSON', e);
                                }
                            }

                            return (
                                <Link to={`/listings/details/${listing.id}`} key={i} className="block">
                                    <div
                                        className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 relative">
                                        {/* For Rent Badge */}
                                        <span
                                            className="absolute top-3 left-3 bg-yellow-400 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
            For rent
        </span>

                                        {/* Favorite Icon */}
                                        <span
                                            className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md cursor-pointer">
            ❤️
        </span>

                                        {/* Image Section */}
                                        <div className="h-56 relative">
                                            <img
                                                src={images[0] ? `https://admin.resilink.com.ng/public${images[0]}` : "/placeholder.jpg"}
                                                alt="Property"
                                                className="w-full h-full object-cover"
                                            />

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

                                        {/* Price and Address */}
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
                                                    src={listing.agentImg || logo}
                                                    alt="agent"
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                                <p className="font-semibold text-gray-700 text-sm">
                                                    {listing.posted_by.name || "Clement Friday"}
                                                </p>
                                            </div>
                                            <p className="text-sm text-gray-600 flex items-center gap-1">
                                                📅 {listing.created_at || "07/04/2025"}
                                            </p>
                                        </div>
                                    </div>
                                </Link>

                            );
                        })}
                    </div>
                )}

                {/* Toggle Button */}
                <div className="mt-12 flex justify-center">
                    {filteredListings.length > 3 && !showAll && (
                        <ButtonBg
                            className="bg-[#0018a8] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-900 transition-all"
                            onClick={() => {
                                window.location.href = "/dashboard";
                            }}
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
