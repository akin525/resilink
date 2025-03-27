import React from 'react'
import { BsFillHousesFill, BsHouseSlashFill } from 'react-icons/bs'
import { FaChartLine } from 'react-icons/fa'
import { FaHouseSignal } from 'react-icons/fa6'
import { RootState } from '../../types/Interface'
import { useSelector } from 'react-redux'

const Dashboard: React.FC = () => {
    const dashboardGrids = [
        {
            label: "Total Listings",
            total: "567",
            icon: <BsFillHousesFill />
        },
        {
            label: "Active Listings",
            total: "238",
            icon: <FaHouseSignal />
        },
        {
            label: "Impressions",
            total: "80",
            icon: <FaChartLine />
        },
        {
            label: "Inactive Listings",
            total: "340",
            icon: <BsHouseSlashFill />
        },
    ]
    const renderData = [
        {
            firstName: "David",
            lastName: "Horjet",
            phoneNumber: "090283829209",
            room_no: "8283",
            email: "david@gmail.com"
        },
        {
            firstName: "David",
            lastName: "Horjet",
            phoneNumber: "090283829209",
            room_no: "8283",
            email: "david@gmail.com"
        },
        {
            firstName: "David",
            lastName: "Horjet",
            phoneNumber: "090283829209",
            room_no: "8283",
            email: "david@gmail.com"
        },
        {
            firstName: "David",
            lastName: "Horjet",
            phoneNumber: "090283829209",
            room_no: "8283",
            email: "david@gmail.com"
        },
        {
            firstName: "David",
            lastName: "Horjet",
            phoneNumber: "090283829209",
            room_no: "8283",
            email: "david@gmail.com"
        },
        {
            firstName: "David",
            lastName: "Horjet",
            phoneNumber: "090283829209",
            room_no: "8283",
            email: "david@gmail.com"
        },
    ]
    const { data, uLoading } = useSelector((state: RootState) => state.account);
    console.log(uLoading);

    return (
        <section className='w-full h-full overflow-y-scroll pb-20 p-4'>
            <section className='mb-10'>
                <section className='text-left py-4'>
                    {uLoading ? (
                        <div className="animate-pulse">
                            <div className="space-y-3">
                                <div className="grid grid-cols-5 gap-4">
                                    <div className="h-5 bg-slate-500 rounded col-span-1"></div>
                                </div>
                            </div>
                        </div>) : (
                        <h2 className='text-2xl tracking-wide text-[#202224] font-bold'>Hi {data?.firstName}</h2>)}
                </section>
                <section className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
                    {dashboardGrids.map((item, i) => (
                        <section key={i} className='bg-white rounded-lg p-5 shadow-md flex items-center justify-between'>
                            <section>
                                <h5 className='text-para text-sm mb-3'>{item.label}</h5>
                                <h2 className='text-black text-3xl'>{item.total}</h2>
                            </section>
                            <section className='text-3xl'>
                                {item.icon}
                            </section>
                        </section>
                    ))}
                </section>
            </section>
            <section>
                <section className='text-left py-4'>
                    <h2 className='text-2xl tracking-wide text-[#202224] font-bold'>Recent tenants</h2>
                </section>
                <section className="mb-5 h-[60vh] overflow-scroll">
                    <table className="w-full border border-neutral-500 p-2 text-left text-sm font-light text-surface">
                        <thead className='border-b border-neutral-800 p-2 font-medium'>
                            <tr>
                                <th scope="col" className='px-6 py-4 text-center'>S/N</th>
                                <th scope="col" className='px-6 py-4 text-center'>Listing</th>
                                <th scope="col" className='px-6 py-4 text-center'>Firstname</th>
                                <th scope="col" className='px-6 py-4 text-center'>Lastname</th>
                                <th scope="col" className='px-6 py-4 text-center'>Email</th>
                                <th scope="col" className='px-6 py-4 text-center'>Phone</th>
                                <th scope="col" className='px-6 py-4 text-center'>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderData.map((item, i) => (
                                <tr key={i}>
                                    <td className='whitespace-nowrap px-6 py-4 text-center'>{i + 1}</td>
                                    <td className='whitespace-nowrap px-6 py-4 text-center'>{item.room_no}</td>
                                    <td className='whitespace-nowrap px-6 py-4 text-center'>{item.firstName}</td>
                                    <td className='whitespace-nowrap px-6 py-4 text-center'>{item.lastName}</td>
                                    <td className='whitespace-nowrap px-6 py-4 text-center'>{item.email}</td>
                                    <td className='whitespace-nowrap px-6 py-4 text-center'>{item.phoneNumber}</td>
                                    <td className='whitespace-nowrap px-6 py-4 text-center'>{item.room_no}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </section>
        </section>
    )
}

export default Dashboard