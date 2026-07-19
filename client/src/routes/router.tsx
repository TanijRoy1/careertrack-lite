import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";

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
    ],
  },
]);

export default router;
