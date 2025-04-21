import React, { useRef, useState } from 'react'
import { CustomInput } from '../../components/common/inputs/CustomInput'
import { CustomUpload } from '../../components/common/inputs/CustomUpload';
import { CustomTextArea } from '../../components/common/inputs/CustomTextArea';
import { ButtonBg } from '../../components/shared/buttons/Buttons';
import { CustomSelect } from '../../components/common/inputs/CustomSelect';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { toastOptions } from '../../utils/helpers';
import { toast } from 'react-toastify';
import { addListing } from '../../features/auth-features/ListingSlice';

const AddListing: React.FC = () => {
    const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        title: "",
        type: "SINGLE_ROOM",
        mode: "RENT",
        price: 0,
        rooms: 1,
        address: "",
        city: "",
        state: "",
        country: "",
        description: "",
    });
    console.log(data);

    interface ImagePreview {
        preview: string;
        data: File
    }
    const [images, setImages] = useState<ImagePreview[]>([]);
    const inputRef: any = useRef(null);
    const handleClick = () => {
        inputRef.current.click();
    };
    const [editingIndex, setEditingIndex] = useState<number | null>(null)

    const handleEdit = (index: number) => {
        setEditingIndex(index);
    };

    const handleRemove = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newImage: ImagePreview = {
                preview: URL.createObjectURL(files[0]),
                data: files[0],
            };

            if (editingIndex !== null) {
                // If we're editing an image, replace it
                setImages((prev) => prev.map((img, i) => (i === editingIndex ? newImage : img)));
                setEditingIndex(null);
            } else {
                const newImages: ImagePreview[] = Array.from(files).slice(0, 6 - images.length).map((file) => ({
                    preview: URL.createObjectURL(file),
                    data: file,
                }));

                setImages((prev) => [...prev, ...newImages]);
            }
        }
    };
    const handleSubmit = async (event: any) => {
        event.preventDefault();

        setLoading(true);
        if (images) {
            console.log(images);

            let formData = new FormData();
            formData.append("title", data.title);
            formData.append("type", data.type);
            formData.append("mode", data.mode);
            formData.append("price", data.price.toString());
            formData.append("rooms", data.rooms.toString());
            formData.append("location[address]", data.address);
            formData.append("location[city]", data.city);
            formData.append("location[state]", data.state);
            formData.append("location[country]", data.country);
            formData.append("description", data.description);
            images.forEach(img => formData.append('images', img.data));
            const payload = formData;
            console.log(payload);

            dispatch(addListing(payload))
                .unwrap()
                .then((res: any) => {
                    console.log(res);
                    setLoading(false);
                    if (res.status === false) {
                        toast.error(res.message, toastOptions);
                        setLoading(false);
                    }
                    if (res.status === true) {
                        toast.success(res.message, toastOptions);
                        setTimeout(() => {
                            window.location.pathname = "/dashboard";
                        }, 3000);
                        setLoading(false);
                    }
                })
                .catch((err: any) => {
                    console.log(err);
                    setLoading(false);
                    toast.error("Something went wrong", toastOptions);
                    toast.error(
                        "Try to check if your connection is stable",
                        toastOptions
                    );
                });
        } else {
            toast.error("Image upload failed", toastOptions);
        }
    };

    const handleChange = (event: { target: { name: string; value: string; }; }) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const listingTypes = [
        {
            "text": "Single Room",
            "value": "SINGLE_ROOM"
        },
        {
            "text": "Self Contain",
            "value": "SELF_CONTAIN"
        },
        {
            "text": "Two Bed-Room Flat",
            "value": "TWO_BEDROOM_FLAT"
        },
        {
            "text": "Three Bed-Room Flat",
            "value": "THREE_BEDROOM_FLAT"
        },
    ]
    const listingMode = [
        {
            "text": "Rent",
            "value": "RENT"
        },
        {
            "text": "Sale",
            "value": "SALE"
        }
    ]

    return (
        <section className="w-full h-full overflow-y-scroll p-6 pb-40 bg-[#F4F6FB]">
            {/* Top Bar with Search */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl tracking-wide text-[#202224] font-bold">Add Property</h2>
                <div className="flex items-center bg-[#FFF2C6] rounded-xl px-2 py-1 w-64">
                    <input
                        type="text"
                        placeholder="Search"
                        className="flex-1 bg-transparent text-sm px-3 py-1 text-[#202224] placeholder:text-[#202224] outline-none"
                    />
                    <button className="bg-[#FFB400] text-white px-4 py-2 rounded-xl text-sm font-semibold">
                        Search
                    </button>
                </div>
            </div>

            {/* Main Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left: Upload Box */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-sm font-semibold mb-2 text-[#202224]">
                        Upload your property image here. Please click Upload Image button
                    </h3>
                    <p className="text-xs text-gray-500 mb-4">
                        Supports .JPG, .PNG, .PDF, or .MP4. Max file size: 10MB
                    </p>
                    <CustomUpload
                        label={"Upload Image"}
                        images={images}
                        handleClick={handleClick}
                        handleFileChange={handleFileChange}
                        inputRef={inputRef}
                        handleEdit={handleEdit}
                        handleRemove={handleRemove}
                    />
                </div>

                {/* Right: Form Box */}
                <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
                    <CustomInput
                        label={"Title:"}
                        type={"text"}
                        name={"title"}
                        placeholder={"Property Title"}
                        handleChange={handleChange}
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <CustomSelect
                            label={"Type:"}
                            options={listingTypes}
                            name={"type"}
                            handleChange={handleChange}
                        />
                        <CustomSelect
                            label={"Mode:"}
                            options={listingMode}
                            name={"mode"}
                            handleChange={handleChange}
                        />
                    </div>
                    <CustomInput
                        label={"Price:"}
                        type={"number"}
                        name={"price"}
                        placeholder={"₦0.00"}
                        handleChange={handleChange}
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <CustomInput
                            label={"Commission:"}
                            type={"number"}
                            name={"commission"}
                            placeholder={"₦0.00"}
                            handleChange={handleChange}
                        />
                        <CustomSelect
                            label={"State:"}
                            options={[
                                {text: "Edo", value: "EDO"},
                                {text: "Lagos", value: "LAGOS"},
                            ]}
                            name={"state"}
                            handleChange={handleChange}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <CustomInput
                            label={"Rooms:"}
                            type={"number"}
                            name={"rooms"}
                            placeholder={"0"}
                            handleChange={handleChange}
                        />
                        <CustomInput
                            label={"No of rooms:"}
                            type={"number"}
                            name={"rooms"}
                            placeholder={"0"}
                            handleChange={handleChange}
                        />
                    </div>
                    <CustomInput
                        label={"Address:"}
                        type={"text"}
                        name={"address"}
                        placeholder={"Property Address"}
                        handleChange={handleChange}
                    />
                    <CustomTextArea
                        label={"Description:"}
                        name={"description"}
                        rows={4}
                        placeholder={"Write a short description..."}
                        handleChange={handleChange}
                    />
                    <ButtonBg className="bg-[#0000C8] text-white w-full py-3 mt-2 rounded-xl font-semibold text-sm">
                        {loading ? "Submitting..." : "Add Property"}
                    </ButtonBg>
                </div>
            </section>
        </section>

    )
}

export default AddListing