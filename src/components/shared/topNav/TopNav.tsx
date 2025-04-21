import React, { useEffect, useState } from 'react'
import { BsBellFill, BsList } from 'react-icons/bs'
// import { LuChevronDownCircle } from 'react-icons/lu'
import { toggleTopnav } from '../../../features/unauth-features/ActionSlice';
import { Link } from 'react-router-dom';
import { RootState } from '../../../types/Interface';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../common/logo/Logo';
import { GoGear } from 'react-icons/go';
import { IoIosPeople } from 'react-icons/io';
import { HiOutlineLogout } from 'react-icons/hi';
import { TbDeviceAnalytics } from 'react-icons/tb';
import { HiMiniQueueList } from 'react-icons/hi2';
import { CiGrid42 } from 'react-icons/ci';
import { CgArrowLongLeft } from 'react-icons/cg';

const TopNav: React.FC = () => {
    const dispatch = useDispatch();
    const { topnav } = useSelector((state: RootState) => state.action);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const { data, uLoading } = useSelector((state: RootState) => state.account);
    const onToggle = () => {
        dispatch(toggleTopnav(!topnav));
        setIsSidebarOpen(!isSidebarOpen);
    };
    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isSidebarOpen]);
    const links = [
        {
            icon: <CiGrid42 />,
            label: "Dashboard",
            link: "/dashboard",
        },
        {
            icon: <HiMiniQueueList />,
            label: "Listings",
            link: "/dashboard/listings",
        },
        {
            icon: <TbDeviceAnalytics />,
            label: "Analytics",
            link: "/dashboard/analytics",
        },
        {
            icon: <IoIosPeople />,
            label: "Tenants",
            link: "/dashboard/tenants",
        },
    ]
    const links2 = [
        {
            icon: <GoGear />,
            label: "Settings",
            link: "/dashboard/settings",
        },
        {
            icon: <HiOutlineLogout />,
            label: "Logout",
            link: "/",
        },
    ]
    return (
        <section className="py-3 px-4 shadow-2xl w-full bg-white">
            <section className="flex items-center justify-between">
                <BsList
                    className="block lg:hidden text-2xl cursor-pointer"
                    onClick={onToggle}
                />

                <section className="flex items-center gap-5">
                    <BsBellFill className="text-2xl"/>
                    {uLoading ? (
                        <section className="animate-pulse w-32">
                            <section className="flex w-full items-center cursor-pointer">
                                <section className="rounded-full bg-slate-500 w-12 h-10 mr-2"></section>
                                <section className="flex flex-col gap-1 w-full">
                                    <section className="h-5 w-full bg-slate-500 rounded col-span-1"></section>
                                    <section className="h-5 w-full bg-slate-500 rounded col-span-1"></section>
                                </section>
                            </section>
                        </section>
                    ) : (
                        <section className="flex items-center gap-3 cursor-pointer">
                            <img className="w-12 h-12 rounded-full object-cover" src={data?.profilePic} alt="profile"/>
                            <section className="flex flex-col">
                <span className="font-bold">
                  {data?.firstName} {data?.lastName}
                </span>
                                <span className="text-sm">Agent</span>
                            </section>
                        </section>
                    )}
                </section>
            </section>

            {/* Mobile Sidebar */}
            <section
                className={`fixed top-0 left-0 h-full w-[250px] bg-[#0100fe] text-white z-20 transition-transform duration-300 ease-in-out ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-[300px]'
                }`}
            >
                <section className="h-full w-full flex flex-col items-center gap-y-10 py-[26px]">
                    {/* Top: Back + Logo */}
                    <section className="flex flex-col items-center gap-5 w-full">
                        <CgArrowLongLeft
                            onClick={onToggle}
                            className="text-2xl self-start ml-4 cursor-pointer"
                        />
                        <Logo color="white"/>
                    </section>

                    {/* Profile */}
                    {!uLoading && (
                        <section className="flex flex-col items-center gap-2 mt-4">
                            <img
                                src={data?.profilePic}
                                alt="Profile"
                                className="w-20 h-20 rounded-full object-cover border-4 border-white"
                            />
                            <p className="font-semibold">{data?.firstName} {data?.lastName}</p>
                            <span className="text-sm text-gray-200">Agent</span>
                        </section>
                    )}

                    {/* Navigation */}
                    <section className="w-full flex-1 flex flex-col justify-between mt-10 px-5">
                        <ul className="flex flex-col gap-6">
                            {links.map((item, i) => (
                                <li key={i}>
                                    <Link
                                        className="flex items-center gap-2 text-base hover:text-[#ffffffcc]"
                                        to={item.link}
                                        onClick={onToggle}
                                    >
                                        {item.icon} {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <ul className="flex flex-col gap-6 mt-10">
                            {links2.map((item, i) => (
                                <li key={i}>
                                    <Link
                                        className="flex items-center gap-2 text-base hover:text-[#ffffffcc]"
                                        to={item.link}
                                        onClick={onToggle}
                                    >
                                        {item.icon} {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                </section>
            </section>
        </section>
    )
}

export default TopNav