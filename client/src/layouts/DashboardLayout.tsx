import { Outlet } from "react-router";

import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />

      <div className="flex flex-1 flex-col">
        <DashboardNavbar />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
