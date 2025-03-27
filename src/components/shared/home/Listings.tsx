import React from "react";
import { useSelector } from "react-redux";
import PropList from "../../common/propList/PropList";
import { RootState } from "../../../types/Interface";
import Heading from "./headingTitle";

const Listings: React.FC = () => {
    const { listings, listings_loading } = useSelector(
        (state: RootState) => state.listing
    );

    return (
        <section id="listings" className="bg-gray-50 md:px-10 px-4 py-20">
            <Heading heading="Best Rent Properties" subheading="Featured Properties" />

            <div className="w-full py-10">
                {listings_loading ? (
                    <div className="flex justify-center items-center h-40 text-lg font-semibold text-gray-500">
                        Loading Properties...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {listings.map((propList: any, i: number) => (
                            <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
                                <PropList propList={propList} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Listings;
