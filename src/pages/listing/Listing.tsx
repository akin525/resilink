import React from 'react'
import PropList from '../../components/common/propList/PropList';
import { ButtonBg } from '../../components/shared/buttons/Buttons';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../types/Interface';

const Listing: React.FC = () => {
    const { listings, listings_loading } = useSelector((state: RootState) => state.listing);
    console.log(listings);
    const navigate = useNavigate()
    return (
        <section className='w-full h-full overflow-y-scroll p-4 pb-20'>
            <section className='mb-10 flex justify-between items-center'>
                <section className='text-left py-4'>
                    <h2 className='text-2xl tracking-wide text-[#202224] font-bold'>Listings</h2>
                </section>
                <section>
                    <ButtonBg className='bg-bc px-5 py-2 gap-1' onClick={() => { navigate("/dashboard/listings/add") }}><FaPlus />Add Listing</ButtonBg>
                </section>
            </section>
            <section>
                <section className="w-100 py-5">
                    {listings.length > 1 && !listings_loading ? (<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {listings.map((propList: any) => (
                            <PropList propList={propList} />
                        ))}
                    </section>) : (<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        <span>Loading...</span>
                    </section>)}
                </section>
            </section>
        </section>
    )

}

export default Listing