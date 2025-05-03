import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BASE_URLNew} from "../../utils/apiRoutes.tsx";
import {getAuthToken} from "../../utils/auth.tsx";
import {Link} from "react-router-dom";
import logo from "/src/assets/react.svg"


const Listing: React.FC = () => {
    const [listings, setListings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredListings, setFilteredListings] = useState<any[]>([]);
    const token = getAuthToken();

    useEffect(() => {
        axios.get(`${BASE_URLNew}/api/properties`,{
            headers:{
                Authorization: token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                const results = res.data?.data.data || [];
                setListings(results);
                setFilteredListings(results);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching listings:', err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const term = searchTerm.toLowerCase();
        const results = listings.filter((item) => {
            const address = item?.address?.toLowerCase?.() || '';
            const agentName = item?.agent?.name?.toLowerCase?.() || '';
            return address.includes(term) || agentName.includes(term);
        });
        setFilteredListings(results);
    }, [searchTerm, listings]);

    return (
        <section className="w-full h-full overflow-y-scroll p-4 pb-20 bg-[#f4f4f4]">
            {/* Top bar */}
            <section className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-[#202224]">My Listings</h2>
                <div className="flex items-center gap-2 bg-yellow-400 rounded-full px-4 py-2 text-white">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-transparent outline-none placeholder-white text-white text-sm"
                    />
                </div>
            </section>

            {/* Listings grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {!loading ? (
                    filteredListings.map((propList, index) => {
                        let images: string[] = [];

                        if (propList.images) {
                            try {
                                images = JSON.parse(propList.images).map((img: string) =>
                                    img.replace('https://admin.resilink.com.ng', '')
                                );
                            } catch (e) {
                                console.error('Invalid image JSON', e);
                            }
                        }

                        return (
                            <Link to={`/dashboard/listings/${propList.id}`} key={index}>
                                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                                    <div className="relative">
                                        <img
                                            src={`https://admin.resilink.com.ng/public${images?.[0] || '/placeholder.jpg'}`}
                                            className="w-full h-40 object-cover"
                                            alt="property"
                                        />
                                        <span className="absolute top-2 left-2 bg-yellow-400 text-white px-3 py-1 text-xs rounded-full font-semibold">
                For rent
              </span>
                                        <div className="absolute bottom-2 left-2 flex gap-2 text-xs text-white">
                                            <span className="bg-black/60 px-2 py-1 rounded">4 Photos</span>
                                            <span className="bg-black/60 px-2 py-1 rounded">1 Videos</span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-[#f7931e] font-bold text-md">
                                            NGN {Number(propList.price).toLocaleString()}/yr
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">{propList.address}</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            • {propList.bedrooms} Bedrooms • {propList.parlour} Parlour
                                            • {propList.kitchen} Kitchen
                                        </p>
                                        <div className="flex items-center gap-2 mt-4">
                                            <img
                                                src={propList.agent?.avatar || logo}
                                                className="w-8 h-8 rounded-full object-cover"
                                                alt="agent"
                                            />
                                            <div className="text-xs text-gray-700">
                                                <p className="font-semibold">{propList.agent?.name}</p>
                                                <p className="text-gray-400">
                                                    {new Date(propList.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <span>Loading...</span>
                )}
            </section>

        </section>
    );
};

export default Listing;
