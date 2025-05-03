import { useParams } from "react-router-dom";
import { BsFillStarFill } from "react-icons/bs";
import { BASE_URLNew } from "../../utils/apiRoutes.tsx";
import { useEffect, useState } from "react";
import logo from "/src/assets/react.svg";

const ListingDetail = () => {
  const { id } = useParams();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // const formatPhoneNumber = (phone: any) => {
  //   if (!phone) return '';
  //   const digits = phone.replace(/\D/g, '');
  //   return digits.startsWith('0') ? `234${digits.slice(1)}` : digits;
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
        setSelectedImage(parsedImages[0]); // set first image by default
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
                src={selectedImage || listing.images[0]}
                alt="Main Property"
                className="w-full h-[300px] sm:h-[400px] md:h-[450px] object-cover transition duration-300 ease-in-out"
            />
          </div>

          {/* Thumbnails */}
          {listing.images.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-2 overflow-x-auto">
                {listing.images.slice(0, 5).map((img: string, i: number) => (
                    <div
                        key={i}
                        onClick={() => setSelectedImage(img)}
                        className={`h-24 rounded-md overflow-hidden cursor-pointer border-2 ${selectedImage === img ? "border-[#0000A3]" : "border-transparent"}`}
                    >
                      <img src={img} alt={`Thumbnail ${i}`} className="w-full h-full object-cover hover:scale-105 transition" />
                    </div>
                ))}
              </div>
          )}

          {/* Property Info */}
          <div className="mt-6 bg-[#f9f9ff] p-6 rounded-xl shadow-sm">
            <h1 className="text-3xl font-bold text-[#0000A3] mb-2">{listing.title}</h1>

            <div className="mt-4 space-y-2 text-gray-800 text-[15px]">
              <div className="flex items-start gap-2">
                <span className="font-semibold w-[100px]">📍 Address:</span>
                <span className="text-gray-700">{listing.address}</span>
              </div>

              <div className="flex items-start gap-2">
                <span className="font-semibold w-[100px]">🏷️ Designation:</span>
                <span className="text-gray-700">For Rent</span>
              </div>

              <div className="flex items-start gap-2">
                <span className="font-semibold w-[100px]">💰 Price:</span>
                <span className="text-gray-700">NGN {Number(listing.price).toLocaleString()}.00 /Yr</span>
              </div>

              <div className="flex items-start gap-2">
                <span className="font-semibold w-[100px]">🛏️ Rooms:</span>
                <span className="text-gray-700">{listing.type || null}</span>
              </div>

              {/*<div className="flex items-start gap-2">*/}
              {/*  <span className="font-semibold w-[100px]">🛋️ Parlour:</span>*/}
              {/*  <span className="text-gray-700">1</span>*/}
              {/*</div>*/}

              {/*<div className="flex items-start gap-2">*/}
              {/*  <span className="font-semibold w-[100px]">🍽️ Kitchen:</span>*/}
              {/*  <span className="text-gray-700">{listing.kitchen || 1}</span>*/}
              {/*</div>*/}
            </div>
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

export default ListingDetail;
