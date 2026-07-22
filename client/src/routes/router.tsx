import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import Applications from "../pages/Dashboard/Applications";
import AddApplication from "../pages/Application/AddApplication";
import EditApplication from "../pages/Application/EditApplication";
import AIAnalyzer from "../pages/Dashboard/AIAnalyzer";

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
      {
        path: "/login",
        Component: Login,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "dashboard",
            Component: DashboardHome,
          },
          {
            path: "applications",
            Component: Applications,
          },
          {
            path: "applications/new",
            Component: AddApplication,
          },
          {
            path: "applications/:id/edit",
            Component: EditApplication,
          },
          {
            path: "/ai-analyzer",
            Component: AIAnalyzer,
          },
        ],
      },
    ],
  },
]);

export default router;
