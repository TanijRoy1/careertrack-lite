import { NavLink } from "react-router";

const DashboardSidebar = () => {
  return (
    <aside className="w-64 border-r bg-gray-100 p-5">
      <h2 className="mb-6 text-xl font-bold">
        Dashboard
      </h2>

      <nav className="flex flex-col gap-3">
        <NavLink to="/dashboard">
          Home
        </NavLink>

        <NavLink to="/applications">
          Applications
        </NavLink>

        <NavLink to="/applications/new">
          Add Application
        </NavLink>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;