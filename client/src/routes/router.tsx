import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import Register from "../pages/Auth/Register";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,

    errorElement: <NotFound />,

    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);

export default router;
