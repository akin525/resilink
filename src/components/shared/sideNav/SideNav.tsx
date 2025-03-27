import { useDispatch, useSelector } from "react-redux";
import { toggleSidenav } from "../../../features/unauth-features/ActionSlice";
import Logo from "../../common/logo/Logo";
import { RootState } from "../../../types/Interface";
import { Link } from "react-router-dom";
import { CiGrid42 } from "react-icons/ci";
import { HiMiniQueueList } from "react-icons/hi2";
import { TbDeviceAnalytics } from "react-icons/tb";
import { GoGear } from "react-icons/go";
import { HiOutlineLogout } from "react-icons/hi";
import { IoIosPeople } from "react-icons/io";

const SideNav: React.FC = () => {
  const dispatch = useDispatch();
  const { sidenav } = useSelector((state: RootState) => state.action);
  const onToggle = () => {
    dispatch(toggleSidenav(!sidenav));
  };
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
    <>
      <section
        className={`sidenav hidden shadow-2xl  lg:inline-flex w-full lg:w-2/12 h-full bg-white text-[#202224] border-r flex-col justify-start items-center gap-9  ${sidenav ? "sidenav-true" : "sidenav-false"
          }`}
      >
        <section className="h-full flex-col gap-y-[40px] items-center inline-flex py-[26px] ">
          <section className="h-full flex-col gap-y-[8px] justify-between items-start inline-flex">
            <section className="mb-7" onClick={onToggle}>
              <Logo color="black" />
            </section>
            <section className="">
              <ul className="flex flex-col gap-10">
                {links.map((item, i) => (
                  <li key={i}>
                    <Link className="flex hover:text-bc items-center gap-1 text-lg" to={item.link}>
                      {item.icon}{item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
            <section className="">
              <ul className="flex flex-col gap-10">
                {links2.map((item, i) => (
                  <li key={i}>
                    <Link className="flex items-center gap-1 text-lg" to={item.link}>
                      {item.icon}{item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </section>
        </section>
      </section>
    </>
  );
};

export default SideNav;
