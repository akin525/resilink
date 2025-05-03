import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../types/Interface';
import { AiFillStar } from 'react-icons/ai';
import {BASE_URLNew} from "../../../src/utils/apiRoutes.tsx";
import {getAuthToken} from "../../utils/auth.tsx";
import {Link} from "react-router-dom";
import logo from "/src/assets/react.svg";

const Dashboard: React.FC = () => {
    const { data: user } = useSelector((state: RootState) => state.account);
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = getAuthToken();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const res = await axios.get(`${BASE_URLNew}/api/properties`, {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : '',
                        'Content-Type': 'application/json',
                    },
                });
                setListings(res.data?.data.data || []);
            } catch (err) {
                console.error('Error fetching listings:', err);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchListings();
        }
    }, [token]);


    const renderListings = () => (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing: any, i: number) => {
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
                    <Link
                        to={`/dashboard/listings/${listing.id || listing._id}`} // ✅ Link to listing detail
                        key={i}
                        className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition block"
                    >
                        <div className="relative">
                            <img
                                src={`https://admin.resilink.com.ng/public/${images[0]}`}
                                alt="listing"
                                className="w-full h-40 object-cover"
                            />
                            <span className="absolute top-2 left-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded">
                            For rent
                        </span>
                        </div>
                        <div className="p-4">
                            <h3 className="text-orange-500 font-semibold text-sm mb-1">
                                NGN {parseFloat(listing?.price).toLocaleString()}/yr
                            </h3>
                            <p className="text-xs text-gray-500">{listing?.address}</p>
                            <ul className="text-xs text-gray-600 mt-2">
                                <li>{listing?.bedrooms || listing?.rooms} Bedrooms</li>
                                <li>{listing?.bathrooms || 'N/A'} Bathrooms</li>
                                <li>{listing?.kitchens || 'N/A'} Kitchen</li>
                            </ul>
                            <div className="flex justify-between items-center mt-4">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={listing?.agent?.profilePic || logo}
                                        alt=""
                                        className="w-6 h-6 rounded-full object-cover"
                                    />
                                    <span className="text-xs">{listing?.posted_by?.name || 'Agent'}</span>
                                </div>
                                <span className="text-xs text-gray-400">
                                {new Date(listing?.created_at).toLocaleDateString()}
                            </span>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );


    const renderAgentDashboard = () => (
        <>
            {/* Stats */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-white rounded-lg shadow p-4 text-center">
                    <p className="text-xs text-gray-400">Customer Ratings</p>
                    <div className="flex justify-center mt-2">
                        {[...Array(4)].map((_, i) => (
                            <AiFillStar key={i} className="text-yellow-400" />
                        ))}
                        <AiFillStar className="text-gray-300" />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 text-center">
                    <p className="text-xs text-gray-400">Online Sales</p>
                    <p className="text-xl font-semibold text-gray-700">200</p>
                </div>
                <div className="bg-white rounded-lg shadow p-4 text-center">
                    <p className="text-xs text-gray-400">Active Listings</p>
                    <p className="text-xl font-semibold text-gray-700">{listings.length}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-4 text-center">
                    <p className="text-xs text-gray-400">Total Listings</p>
                    <p className="text-xl font-semibold text-gray-700">{listings.length}</p>
                </div>
            </section>

            {/* Listings & Sidebar */}
            <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <section className="lg:col-span-3">
                    <h4 className="text-lg font-semibold mb-4">Active Listings</h4>
                    {renderListings()}
                </section>
                <section className="bg-white p-4 rounded-lg shadow h-fit">
                    <h4 className="font-semibold text-lg mb-4">Features</h4>
                    <p className="text-sm text-gray-500 mb-2">
                        Upload your property image here. Please click <strong>Upload Image</strong> button.
                    </p>
                    <p className="text-xs text-gray-400 mb-4">
                        Supports JPG, PNG, PDF, or MP4. Max file size: 10MB
                    </p>
                    <button className="w-full bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-900 text-sm">
                        Upload Image
                    </button>
                </section>
            </section>
        </>
    );

    const renderUserDashboard = () => (
        <section className="bg-white rounded-lg p-6 shadow text-center">
            <h2 className="text-xl font-bold mb-4">Welcome, {user?.name}</h2>
            <p className="text-gray-500 mb-4">
                Browse available property listings and contact agents for more information.
            </p>
            {renderListings()}
        </section>
    );

    return (
        <section className='bg-gray-50 w-full h-full overflow-y-scroll p-4 pb-20'>
            {loading ? (
                <div className="fixed inset-0 bg-white bg-opacity-75 z-50 flex items-center justify-center">
                    <div className="text-blue-800 text-lg font-semibold animate-pulse">
                        Loading listings...
                    </div>
                </div>
            ) : (
                <section className="p-6 w-full overflow-y-scroll">
                    <section className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Hello, Welcome Back!</h3>
                            <p className="text-sm text-gray-500">{user?.name}</p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <input
                                type="text"
                                placeholder="Search"
                                className="rounded-full px-5 py-2 w-64 shadow-sm focus:outline-none border text-sm"
                            />
                        </div>
                    </section>
                    {user?.type === 'agent' ? renderAgentDashboard() : renderUserDashboard()}
                </section>
            )}


        </section>
    );
};

export default Dashboard;
