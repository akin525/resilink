import { useParams } from "react-router-dom";
import { BsFillStarFill } from "react-icons/bs";
import { BASE_URLNew } from "../../utils/apiRoutes.tsx";
import { useEffect, useState } from "react";
import logo from "/src/assets/react.svg";

const ListingDetails = () => {
    const { id } = useParams();
    const [listing, setListing] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState<string>("");

    // const formatPhoneNumber = (phone: any) => {
    //     if (!phone) return '';
    //     const digits = phone.replace(/\D/g, '');
    //     return digits.startsWith('0') ? `234${digits.slice(1)}` : digits;
    // };

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await fetch(`${BASE_URLNew}/api/propertyid/${id}`);
                const data = await response.json();
                const property = data?.data;

                let parsedImages: string[] = [];
                try {
                    if (typeof property.images === "string") {
                        parsedImages = JSON.parse(property.images).map((img: string) =>
                            `${BASE_URLNew}/public${img.replace("https://admin.resilink.com.ng", "")}`
                        );
                    } else if (Array.isArray(property.images)) {
                        parsedImages = property.images.map((img: string) =>
                            `${BASE_URLNew}/public${img.replace("https://admin.resilink.com.ng", "")}`
                        );
                    }
                } catch (error) {
                    console.error("Error parsing images:", error);
                }

                setListing({ ...property, images: parsedImages });
                setMainImage(parsedImages[0] || "");
                setLoading(false);
            } catch (error) {
                console.error("Error fetching property:", error);
                setLoading(false);
            }
        };

        fetchListing();
    }, [id]);

    if (loading) return <div className="p-10 text-center">Loading...</div>;
    if (!listing) return <div className="p-10 text-center">Property not found</div>;

    return (
        <div className="bg-gray-50 w-full h-full overflow-y-scroll p-4 pb-20">
            <div className="max-w-4xl mx-auto">
                {/* Main Image */}
                <div className="rounded-xl overflow-hidden shadow-lg">
                    <img
                        src={mainImage}
                        alt="Main Property"
                        className="w-full h-[300px] sm:h-[400px] md:h-[450px] object-cover"
                    />
                </div>

                {/* Thumbnails */}
                {listing.images.length > 1 && (
                    <div className="mt-4 grid grid-cols-5 gap-2 overflow-x-auto">
                        {listing.images.slice(0, 5).map((img: string, i: number) => (
                            <div
                                key={i}
                                className={`h-24 rounded-md overflow-hidden border-2 ${mainImage === img ? "border-[#0000A3]" : "border-transparent"} cursor-pointer`}
                                onClick={() => setMainImage(img)}
                            >
                                <img
                                    src={img}
                                    alt={`Thumbnail ${i}`}
                                    className="w-full h-full object-cover hover:opacity-80"
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Title and Features */}
                <div className="mt-6 text-center">
                    <h1 className="text-xl font-semibold text-gray-900">
                        {listing.title} in {listing.address} for rent
                    </h1>
                    <div className="mt-2 text-gray-600 text-sm flex justify-center gap-6 flex-wrap">
                        <span>• {listing.type || null}</span>
                        {/*<span>• 1 Parlour</span>*/}
                        {/*<span>• {listing.kitchen || 1} Kitchen</span>*/}
                    </div>
                </div>

                {/* Price */}
                <div className="text-center mt-6 text-yellow-500 text-2xl font-bold">
                    NGN {Number(listing.price).toLocaleString()}.00
                    <span className="text-sm text-gray-500 font-normal">/Yr</span>
                </div>

                {/* Agent Card */}
                <div className="mt-8 bg-[#f4f6ff] rounded-xl p-5 flex flex-col sm:flex-row justify-between items-center">
                    <div className="flex items-center gap-4">
                        <img
                            src={logo}
                            alt="Agent"
                            className="w-14 h-14 rounded-full object-cover border-2 border-white"
                        />
                        <div>
                            <h3 className="text-md font-semibold text-gray-800">{listing.posted_by.name}</h3>
                            <p className="text-sm text-gray-600">{listing.posted_by.type}</p>
                            <div className="flex items-center text-yellow-500 text-sm mt-1">
                                <BsFillStarFill />
                                <span className="ml-1">4.5</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 sm:mt-0 text-gray-600 text-sm">{listing.created_at}</div>
                </div>

                {/* Contact Button */}
                <div className="mt-6 flex justify-center">
                    <a
                        href={`https://wa.link/wrv6d0`}
                        // href={`https://wa.me/${formatPhoneNumber(listing.posted_by.phone)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="bg-[#0000A3] hover:bg-blue-900 text-white font-semibold px-8 py-3 rounded-md transition">
                            Contact Now
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ListingDetails;
