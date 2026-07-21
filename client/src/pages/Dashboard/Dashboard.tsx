import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Dashboard</h1>

      <p className="mt-4">Welcome, {user?.name}</p>

      <p>{user?.email}</p>
    </div>
  );
};

export default Dashboard;
