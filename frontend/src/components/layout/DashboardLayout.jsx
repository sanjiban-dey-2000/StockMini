import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Sidebar from "../../pages/Sidebar";

const DashboardLayout = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
