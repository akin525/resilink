import { useLocation, useOutlet } from "react-router-dom";
import SideNav from "../../shared/sideNav/SideNav";
import TopNav from "../../shared/topNav/TopNav";
const DashboardLayout = () => {
  const outlet = useOutlet();
  const location = useLocation();
  const currentRoute = location.pathname;
  console.log(currentRoute);


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
