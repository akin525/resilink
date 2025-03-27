import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import { PaystackButton } from 'react-paystack';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListingDetails } from '../../features/auth-features/ListingSlice';
import { RootState } from '../../types/Interface';
import { ButtonBg } from '../../components/shared/buttons/Buttons';
import { initiatePayment } from '../../features/unauth-features/PaymentSlice';

const Payment: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        paymentType: 'inspection',
    });

    // const [transactionSuccess, setTransactionSuccess] = useState(false);
    // const [transactionDetails, setTransactionDetails] = useState<any>(null);

    const location = useLocation();
    const paymentType = location.pathname.split("/")[2];
    const listingId = location.pathname.split("/")[3];
    const dispatch = useDispatch();
    // const queryParams = new URLSearchParams(location.search);
    // const amount = queryParams.get('amount') || '0';
    // const propertyId = queryParams.get('propertyId') || '';

    useEffect(() => {
        dispatch(fetchListingDetails(listingId));
    }, [dispatch, listingId]);

    const { listing_details, listing_details_loading } = useSelector((state: RootState) => state.listing);

    // const publicKey = 'pk_test_f0c794b241648f744c89ddc5cff595065c802af5';

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // const handleSuccess = (response: any) => {
    //     console.log('Payment successful:', response);
    //     setTransactionDetails(response);
    //     setTransactionSuccess(true);
    //     alert('Payment Successful!');
    //     // Add your logic for successful payment, e.g., updating the backend
    // };

    // const handleClose = () => {
    //     console.log('Payment closed');
    // };

    // const paymentConfig = {
    //     reference: new Date().getTime().toString(),
    //     email: formData.email,
    //     amount: (listing_details.price) * 100, // Paystack expects the amount in kobo
    //     publicKey: publicKey,
    //     metadata: {
    //         custom_fields: [
    //             {
    //                 display_name: "Name",
    //                 variable_name: "name",
    //                 value: formData.firstName + formData.lastName,
    //             },
    //             {
    //                 display_name: "Phone",
    //                 variable_name: "phone",
    //                 value: formData.phone,
    //             },
    //             {
    //                 display_name: "Property ID",
    //                 variable_name: "property_id",
    //                 value: propertyId,
    //             },
    //         ],
    //     },
    //     onSuccess: handleSuccess,
    //     onClose: handleClose,
    // };

    const { loading, paymentDetails } = useSelector((state: RootState) => state.payment);

    console.log(paymentDetails);
    

    const handlePaymentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            amount: listing_details.price,
            listingId: listingId,
        };

        dispatch(initiatePayment(payload));
    };

    useEffect(() => {
        if (paymentDetails?.data?.paymentUrl) {
            console.log(paymentDetails?.data?.paymentUrl);
            
            window.location.href = paymentDetails?.data?.paymentUrl;
        }
    }, [paymentDetails]);

    if (listing_details_loading) {
        return <div>Loading..........</div>;
    }

    return (
        <section className="p-10">
            <h2 className="text-3xl text-center font-bold mb-10">Tenant Details Form</h2>
            {/* {transactionSuccess ? (
                <div className="p-6 border rounded bg-green-100">
                    <h3 className="text-xl font-semibold mb-4">Payment Receipt</h3>
                    <p><strong>Transaction Reference:</strong> {transactionDetails.reference}</p>
                    <p><strong>Payment Type:</strong> {paymentType === "inspection" ? "Inspection Fee" : "Main Payment"}</p>
                    <p><strong>Amount:</strong> ₦{(parseInt(amount) / 100).toFixed(2)}</p>
                    <p><strong>Property ID:</strong> {propertyId}</p>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 mt-4 rounded"
                        onClick={() => window.print()}
                    >
                        Print Receipt
                    </button>
                </div>
            ) : ( */}
                <>
                    <div className='mb-10 grid gap-5 grid-cols-3'>
                        <div>
                            <label className='font-semibold text-lg' htmlFor="title">
                                Apartment Name:
                            </label>
                            <span className='text-base pl-10'>{listing_details.title}</span>
                        </div>
                        <div>
                            <label className='font-semibold text-lg' htmlFor="title">
                                Agent:
                            </label>
                            <span className='text-base pl-10'>{listing_details.postedBy.firstName}{" "}{listing_details.postedBy.lastName}</span>
                        </div>
                        <div>
                            <label className='font-semibold text-lg' htmlFor="title">
                                Payment Type:
                            </label>
                            <span className='text-base pl-10'>{paymentType === "inspection" ? "Inspection Fee" : "Main payment"}</span>
                        </div>
                        <div>
                            <label className='font-semibold text-lg' htmlFor="title">
                                Payment Amount:
                            </label>
                            <span className='text-base pl-10'>N{listing_details.totalPrice}</span>
                        </div>
                    </div>
                    <form className="grid grid-cols-1 gap-4 mb-5">
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-1">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-1">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium mb-1">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                name="phone"
                                id="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="paymentType" className="block text-sm font-medium mb-1">
                                Payment Type
                            </label>
                            <select
                                name="paymentType"
                                id="paymentType"
                                value={formData.paymentType}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="inspection">Inspection Fee</option>
                                <option value="main">Main Payment</option>
                            </select>
                        </div>
                        <ButtonBg onClick={(e: any) => handlePaymentSubmit(e)} className='px-5 py-2 bg-bc rounded-full'>{loading ? "Processing Payment" : "Pay Now"}</ButtonBg>
                    </form>
                    {/* <PaystackButton {...paymentConfig} className="bg-blue-500 text-white py-2 px-4 rounded" >Pay Now</PaystackButton> */}
                </>
            {/* )} */}
        </section>
    );
};

export default Payment;
