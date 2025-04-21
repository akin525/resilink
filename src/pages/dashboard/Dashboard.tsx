// import React, { useEffect } from 'react';
import {  useSelector } from 'react-redux';
import { RootState } from '../../types/Interface';
// import { fetchListings } from '../../features/auth-features/ListingSlice';

import { AiFillStar } from 'react-icons/ai';

const Dashboard: React.FC = () => {
    // const dispatch = useDispatch();
    const { data } = useSelector((state: RootState) => state.account);
    const { listings, listings_loading } = useSelector((state: RootState) => state.listing);

    // useEffect(() => {
    //     dispatch(listings());
    // }, [dispatch]);
    //
    // // Lock scroll when loading
    // useEffect(() => {
    //     if (loading) {
    //         document.body.style.overflow = 'hidden';
    //     } else {
    //         document.body.style.overflow = 'auto';
    //     }
    //
    //     return () => {
    //         document.body.style.overflow = 'auto';
    //     };
    // }, [loading]);

    return (
        <section className='bg-gray-50 w-full h-full overflow-y-scroll p-4 pb-20'>

            {/* Fullscreen Loading Overlay */}
            {listings_loading && (
                <div className="fixed inset-0 bg-white bg-opacity-75 z-50 flex items-center justify-center">
                    <div className="text-blue-800 text-lg font-semibold animate-pulse">
                        Loading listings...
                    </div>
                </div>
            )}

            <section className="p-6 w-full overflow-y-scroll">
                {/* Top Row */}
                <section className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <section>
                        <h3 className="text-lg font-semibold text-gray-700">Hello, Welcome Back!</h3>
                        <p className="text-sm text-gray-500">{data?.firstName} {data?.lastName}</p>
                    </section>
                    <section className="mt-4 md:mt-0">
                        <input
                            type="text"
                            placeholder="Search"
                            className="rounded-full px-5 py-2 w-64 shadow-sm focus:outline-none border text-sm"
                        />
                    </section>
                </section>

                {/* Stats */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    <div className="bg-white rounded-lg shadow p-4 text-center">
                        <p className="text-xs text-gray-400">Customer Ratings</p>
                        <div className="flex justify-center mt-2">
                            {[...Array(4)].map((_, i) => <AiFillStar key={i} className="text-yellow-400"/>)}
                            <AiFillStar className="text-gray-300"/>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 text-center">
                        <p className="text-xs text-gray-400">Online Sales</p>
                        <p className="text-xl font-semibold text-gray-700">200</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 text-center">
                        <p className="text-xs text-gray-400">Active Listings</p>
                        <p className="text-xl font-semibold text-gray-700">150</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 text-center">
                        <p className="text-xs text-gray-400">Total Listings</p>
                        <p className="text-xl font-semibold text-gray-700">250</p>
                    </div>
                </section>

                {/* Main Body */}
                <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Listings Section */}
                    <section className="lg:col-span-3">
                        <h4 className="text-lg font-semibold mb-4">Active Listing</h4>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {listings?.map((listing: any, i: number) => (
                                <div key={i} className="bg-white rounded-lg shadow overflow-hidden">
                                    <div className="relative">
                                        <img src={listing?.images?.[0]} alt="listing"
                                             className="w-full h-40 object-cover"/>
                                        <span
                                            className="absolute top-2 left-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded">For rent</span>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-orange-500 font-semibold text-sm mb-1">
                                            NGN {parseFloat(listing?.price).toLocaleString()}/yr
                                        </h3>
                                        <p className="text-xs text-gray-500">{listing?.address}</p>
                                        <ul className="text-xs text-gray-600 mt-2">
                                            <li>{listing?.bedrooms} Bedrooms</li>
                                            <li>{listing?.bathrooms} Bathrooms</li>
                                            <li>{listing?.kitchens} Kitchen</li>
                                        </ul>
                                        <div className="flex justify-between items-center mt-4">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={listing?.agent?.profilePic}
                                                    alt=""
                                                    className="w-6 h-6 rounded-full object-cover"
                                                />
                                                <span className="text-xs">{listing?.agent?.firstName}</span>
                                            </div>
                                            <span className="text-xs text-gray-400">
                                                {new Date(listing?.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Features Panel */}
                    <section className="bg-white p-4 rounded-lg shadow h-fit">
                        <h4 className="font-semibold text-lg mb-4">Features</h4>
                        <p className="text-sm text-gray-500 mb-2">
                            Upload your property image here. Please click <strong>Upload Image</strong> button.
                        </p>
                        <p className="text-xs text-gray-400 mb-4">
                            Supports JPG, PNG, PDF, or MP4. Max file size: 10MB
                        </p>
                        <button
                            className="w-full bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-900 text-sm">
                            Upload Image
                        </button>
                    </section>
                </section>
            </section>
        </section>
    );
};

export default Dashboard;
