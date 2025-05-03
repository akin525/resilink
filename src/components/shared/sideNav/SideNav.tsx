import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleSidenav } from "../../../features/unauth-features/ActionSlice";
import Logo from "../../common/logo/Logo";
// import { RootState } from "../../../types/Interface";
import { useLocation, useNavigate } from "react-router-dom";
import { CiGrid42 } from "react-icons/ci";
import { HiMiniQueueList } from "react-icons/hi2";
import { HiOutlineLogout } from "react-icons/hi";
import { IoIosPeople } from "react-icons/io";
import { GoGear } from "react-icons/go";
import { useUser } from "../../../context/UserContext.tsx";

const SideNav: React.FC = () => {
  // const dispatch = useDispatch();
  // const { sidenav } = useSelector((state: RootState) => state.action);
  const location = useLocation();
  const { user } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const handleNavClick = (link: string) => {
    setLoading(true);
    setTimeout(() => {
      navigate(link);
      setLoading(false);
    }, 800); // Simulate a delay for navigation
  };

  const links = [
    {
      icon: <CiGrid42 size={20} />,
      label: "Homepage",
      link: "/",
    },
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
      icon: <GoGear />,
      label: "Settings",
      link: "/dashboard/settings",
    },
  ];

  if (user?.type === "agent" || user?.type === "admin") {
    links.push({
      icon: <IoIosPeople size={20} />,
      label: "Add Properties",
      link: "/dashboard/listings/add",
    });
  }

  return (
      <section className="hidden lg:flex flex-col w-60 h-screen bg-[#0000D6] text-white p-5 justify-between">
        {/* Top - Logo & User */}
        <div>
          <div
              className="flex justify-center mb-8 cursor-pointer"
              onClick={() => handleNavClick("/")}
          >
            <Logo color="white" />
          </div>

          <div className="flex flex-col items-center gap-1 mb-10">
            <img
                src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=Brown&facialHairType=BeardMedium&clotheType=Hoodie&clotheColor=Blue03&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light"
                alt="profile"
                className="w-16 h-16 rounded-full border-2 border-white"
            />
            <p className="text-white font-semibold text-sm">{user?.name || "User"}</p>
            <p className="text-xs text-white/70">{user?.type || "User"}</p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-5">
            {links.map((item, index) => {
              const isActive = location.pathname === item.link;
              return (
                  <button
                      key={index}
                      onClick={() => handleNavClick(item.link)}
                      disabled={loading}
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-sm w-full text-left ${
                          isActive ? "bg-white text-[#0000D6]" : "hover:bg-white/20"
                      }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
              );
            })}
          </nav>

          {/* Optional loading text */}
          {loading && (
              <div className="text-center text-sm mt-4 animate-pulse text-white">Loading...</div>
          )}
        </div>

        {/* Bottom - Logout */}
        <div className="px-4 pb-6">
          <button
              onClick={() => handleNavClick("/")}
              className="flex items-center gap-2 text-sm font-medium hover:underline"
              disabled={loading}
          >
            <HiOutlineLogout />
            Sign Out
          </button>
        </div>
      </section>
  );
};

export default SideNav;
