import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {  MdOutlineBedroomParent } from "react-icons/md";
import { BsFillStarFill, BsTelephone, BsWhatsapp } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchListingDetails } from "../../features/auth-features/ListingSlice";
import { RootState } from "../../types/Interface";
import { ButtonBg } from "../../components/shared/buttons/Buttons";

const ListingDetail: React.FC = () => {
  const location = useLocation();
  const listingId = location.pathname.split("/")[3];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListingDetails(listingId));
  }, [dispatch, listingId]);

  const { listing_details, listing_details_loading } = useSelector(
    (state: RootState) => state.listing
  );
  console.log(listing_details_loading, listing_details);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (listing_details_loading) {
    return <div className="spinner">Loading...</div>;
  }

  return (
    <section className="w-full h-full overflow-y-scroll p-4 py-24">
      <section className="mb-6 text-center">
        <h2 className="text-3xl tracking-wide text-[#202224] font-bold">
          Listing Details
        </h2>
      </section>

      <section className="w-full mb-6">
        {/* <Slider {...settings}>
          {listing_details.images.map((image, index) => (
            <div className="w-full h-[400px]" key={index}>
              <div
                className="bg-cover bg-center h-full rounded-lg shadow-md"
                style={{ backgroundImage: `url(${image})` }}
              ></div>
            </div>
          ))}
        </Slider> */}

        <Slider {...settings}>
          {listing_details.images.map((image, index) => (
            <section className="w-full h-[400px]">
              <section
                className="bg-cover bg-no-repeat h-full object-center"
                key={index}
                style={{ backgroundImage: `url(${image})` }}
              >
                <section
                  className="flex bg-cover bg-no-repeat h-full object-center flex-col md:px-14 px-2 py-28"
                  style={{ backgroundImage: `url(${image})` }}
                ></section>
              </section>
            </section>
          ))}
        </Slider>
      </section>

      <section className="p-6 bg-white shadow-lg rounded-lg mb-6">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <div>
            <h2 className="capitalize text-2xl font-semibold text-gray-900 mb-2">
              {listing_details.title}
            </h2>
            <span className="inline-block py-1 px-3 text-white bg-bc rounded-md text-sm">
              For {listing_details.type}
            </span>
          </div>
          <div className="text-right">
            <div className="flex gap-1 text-yellow-500 justify-end mb-1">
              {[...Array(5)].map((_, idx) => (
                <BsFillStarFill key={idx} />
              ))}
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 font-Kriss">
              {new Intl.NumberFormat("en-US", { style: "currency", currency: "NGN" }).format(listing_details.price)}

            </h2>
          </div>
        </div>
        <p className="text-gray-600 mb-4">{listing_details.location.address}</p>
        <ul className="flex flex-wrap gap-4 text-gray-700">
          <li className="flex items-center gap-2">
            <MdOutlineBedroomParent className="text-lg" />
            <span>{listing_details.rooms} Rooms</span>
          </li>
          {/*<li className="flex items-center gap-2">*/}
          {/*  <MdOutlineBathroom className="text-lg" />*/}
          {/*  <span>4 Bedrooms</span>*/}
          {/*</li>*/}
        </ul>
      </section>

      <section className="p-6 bg-white shadow-lg rounded-lg mb-6">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">
          Property Details
        </h4>
        <div className="grid md:grid-cols-3 gap-6">
          <ul className="space-y-2">
            <li>
              <span className="font-medium">Property Type:</span> Rent
            </li>
            <li>
              <span className="font-medium">Property ID:</span>{" "}
              {listing_details._id}
            </li>
            <li>
              <span className="font-medium">Property Status:</span> For{" "}
              {listing_details.status}
            </li>
            <li>
              <span className="font-medium">Operating Since:</span>{" "}
              {new Date(listing_details.createdAt).toDateString()}
            </li>
          </ul>
          <ul className="space-y-2">
            <li>
              <span className="font-medium">Price:</span> ₦
              {listing_details.price}
            </li>
            <li>
              <span className="font-medium">Property Size:</span> NaN
            </li>
            <li>
              <span className="font-medium">City:</span> Benin
            </li>
          </ul>
          {/* <ul className="space-y-2">
            <li>
              <span className="font-medium">Rooms:</span> 7
            </li>
            <li>
              <span className="font-medium">Bedrooms:</span> 3
            </li>
            <li>
              <span className="font-medium">Bathrooms:</span> 4
            </li>
          </ul> */}
        </div>
      </section>

      <section className="p-6 bg-white shadow-lg rounded-lg mb-6">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">
          Brief Description
        </h4>
        <p className="text-gray-700 mb-4">{listing_details.description}</p>

        <h4 className="text-xl font-semibold text-gray-800 mb-4">
          Contact Agent
        </h4>
        <div className="flex flex-wrap gap-4">
          <a href={`tel:+2348032926144`} className="w-full sm:w-auto">
            <ButtonBg className="bg-bc text-white py-2 px-4 flex gap-2 items-center w-full sm:w-auto rounded-md shadow-md">
              Call <BsTelephone />
            </ButtonBg>
          </a>
          <a href={`https://wa.link/fynvpj`} className="w-full sm:w-auto">
            <ButtonBg className="bg-green-500 text-white py-2 px-4 flex gap-2 items-center w-full sm:w-auto rounded-md shadow-md">
              Whatsapp <BsWhatsapp />
            </ButtonBg>
          </a>
        </div>
      </section>
    </section>
  );
};

export default ListingDetail;
