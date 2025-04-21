import { useDispatch, useSelector } from "react-redux";
import { toggleSidenav } from "../../../features/unauth-features/ActionSlice";
import Logo from "../../common/logo/Logo";
import { RootState } from "../../../types/Interface";
import { Link, useLocation } from "react-router-dom";
import { CiGrid42 } from "react-icons/ci";
import { HiMiniQueueList } from "react-icons/hi2";
// import { TbDeviceAnalytics } from "react-icons/tb";
// import { GoGear } from "react-icons/go";
import { HiOutlineLogout } from "react-icons/hi";
import { IoIosPeople } from "react-icons/io";

const SideNav: React.FC = () => {
  const dispatch = useDispatch();
  const { sidenav } = useSelector((state: RootState) => state.action);
  const location = useLocation();

  const onToggle = () => {
    dispatch(toggleSidenav(!sidenav));
  };

  const links = [
    {
      icon: <CiGrid42 size={20} />,
      label: "Dashboard",
      link: "/dashboard",
    },
    {
      icon: <HiMiniQueueList size={20} />,
      label: "Explore Properties",
      link: "/dashboard/listings",
    },
    {
      icon: <IoIosPeople size={20} />,
      label: "Add Properties",
      link: "/dashboard/listings/add",
    },
  ];

  return (
      <section className={`hidden lg:flex flex-col w-60 h-screen bg-[#0000D6] text-white p-5 justify-between`}>
        {/* Top - Logo & User */}
        <div>
          <div className="flex justify-center mb-8" onClick={onToggle}>
            <Logo color="white" />
          </div>
          <div className="flex flex-col items-center gap-1 mb-10">
            <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="profile"
                className="w-16 h-16 rounded-full border-2 border-white"
            />
            <p className="text-white font-semibold text-sm">Kingston David</p>
            <p className="text-xs text-white/70">Agent</p>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-5">
            {links.map((item, index) => {
              const isActive = location.pathname === item.link;
              return (
                  <Link
                      key={index}
                      to={item.link}
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-sm ${
                          isActive ? "bg-white text-[#0000D6]" : "hover:bg-white/20"
                      }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="px-4 pb-6">
          <Link to="/" className="flex items-center gap-2 text-sm font-medium hover:underline">
            <HiOutlineLogout />
            Sign Out
          </Link>
        </div>
      </section>
  );
};

export default SideNav;
