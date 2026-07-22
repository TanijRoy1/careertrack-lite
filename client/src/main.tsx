import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/router.tsx";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./contexts/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
    </AuthProvider>
  </StrictMode>,
);
