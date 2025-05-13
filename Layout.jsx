import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

const Layout = () => {
  const location = useLocation();

  return (
    <div>
      <Navbar />
      {location.pathname !== "/" && (
        <div className="border-gray-400 border-t w-[100%] self-center text-center"></div>
      )}
      <Outlet />
    </div>
  );
};

export default Layout;
