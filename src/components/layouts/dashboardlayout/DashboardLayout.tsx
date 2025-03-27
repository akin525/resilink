import { useLocation, useOutlet } from "react-router-dom";
import SideNav from "../../shared/sideNav/SideNav";
import TopNav from "../../shared/topNav/TopNav";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../../../features/auth-features/AccountSlice";
import { useEffect } from "react";
import { fetchListings } from "../../../features/auth-features/ListingSlice";

const DashboardLayout = () => {
  const outlet = useOutlet();
  const location = useLocation();
  const currentRoute = location.pathname;
  console.log(currentRoute);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(fetchListings());
  }, [dispatch]);

  return (
    <>
      <section className="overflow-hidden h-screen p-0 w-full flex">
        <section className="w-full flex">
          <SideNav />
          <section className="w-full lg:w-10/12 bg-[#FAFAFA]">
            <TopNav />
            {outlet}
          </section>
        </section>
      </section>
    </>
  );
};

export default DashboardLayout;
