import useAuth from "../../hooks/useAuth";

const DashboardNavbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4">
      <h1 className="text-xl font-semibold">
        CareerTrack Lite
      </h1>

      <div className="flex items-center gap-4">
        <span>{user?.name}</span>

        <button
          onClick={logout}
          className="rounded bg-red-500 px-4 py-2 text-white"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default DashboardNavbar;