import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { user, token, loading } = useAuth();

  console.log({
    user,
    token,
    loading,
  });

  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600">CareerTrack Lite</h1>
    </div>
  );
};

export default Home;
