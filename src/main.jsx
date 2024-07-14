import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import AuthProvider from "./Providers/AuthProvider";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="max-w-screen-xl mx-auto">
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HelmetProvider>
          <React.StrictMode>
            <RouterProvider router={router} />
          </React.StrictMode>
        </HelmetProvider>
      </AuthProvider>
    </QueryClientProvider>
  </div>
);
