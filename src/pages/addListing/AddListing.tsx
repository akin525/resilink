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
        <section className='w-full h-full overflow-y-scroll p-4 pb-40'>
            <section className='mb-5 flex justify-between items-center'>
                <section className='text-left py-4'>
                    <h2 className='text-2xl tracking-wide text-[#202224] font-bold'>Add Listing</h2>
                </section>
            </section>
            <section>
                <form onSubmit={handleSubmit}>
                    <section className="w-full mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        <CustomInput
                            label={"Title"}
                            type={"text"}
                            name={"title"}
                            placeholder={"Solicit Hostel"}
                            handleChange={handleChange}
                        />
                        <CustomSelect
                            label={"Property Type"}
                            options={listingTypes}
                            name={"type"}
                            handleChange={handleChange}
                        />
                        <CustomSelect
                            label={"Property Mode"}
                            options={listingMode}
                            name={"mode"}
                            handleChange={handleChange}
                        />
                        <CustomInput
                            label={"Property Price"}
                            type={"number"}
                            name={"price"}
                            placeholder={"50000"}
                            handleChange={handleChange}
                        />
                        <CustomInput
                            label={"Max Rooms"}
                            type={"number"}
                            name={"rooms"}
                            placeholder={"1"}
                            handleChange={handleChange}
                        />
                        <CustomInput
                            label={"Address"}
                            type={"text"}
                            name={"address"}
                            placeholder={"N0 4, HRUM Hostel..."}
                            handleChange={handleChange}
                        />
                        <CustomInput
                            label={"City"}
                            type={"text"}
                            name={"city"}
                            placeholder={"Benin"}
                            handleChange={handleChange}
                        />
                        <CustomInput
                            label={"State"}
                            type={"text"}
                            name={"state"}
                            placeholder={"Edo"}
                            handleChange={handleChange}
                        />
                        <CustomInput
                            label={"Country"}
                            type={"text"}
                            name={"country"}
                            placeholder={"Nigeria"}
                            handleChange={handleChange}
                        />
                    </section>
                    <section className='w-full'>
                        <CustomTextArea
                            label={"Description"}
                            type={"text"}
                            name={"description"}
                            rows={6}
                            placeholder={"Describe your Listing"}
                            handleChange={handleChange}
                        />
                    </section>
                    <section className='w-full mb-10'>
                        <CustomUpload
                            label={"Image (*JPEG*, *PNG*, *JPG*)"}
                            images={images}
                            handleClick={handleClick}
                            handleFileChange={handleFileChange}
                            inputRef={inputRef}
                            handleEdit={handleEdit}
                            handleRemove={handleRemove}
                        />
                    </section>
                    <section className="flex justify-center">
                        <section className='w-fit '>
                            <ButtonBg className='bg-bc px-10 py-3 w-fit'>{loading ? "Submitting..." : "Submit"}</ButtonBg>
                        </section>
                    </section>
                </form>
            </section>
        </section>
    )
}

export default AddListing