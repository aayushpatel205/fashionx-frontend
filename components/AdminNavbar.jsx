import React from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();
  return (
    <div className="h-28 px-14 flex justify-between items-center  border border-gray-400">
      <div className="flex flex-col gap-1">
        <p
          className="text-4xl font-medium cursor-pointer"
          onClick={() => navigate("/")}
        >
          Fashion<span className="text-gray-600 font-extralight">X</span>
        </p>
        <p className="font-semibold border-2 border-gray-200 text-center hover:text-white hover:bg-black text-sm p-1 cursor-pointer">
          ADMIN PANEL
        </p>
      </div>
      <button
        className="w-[12%] uppercase bg-black h-10 text-white text-sm hover:opacity-85 cursor-pointer"
        onClick={async () => {
          try {
            await axiosInstance.delete("/admin/login");
            navigate("/admin");
          } catch (error) {
            console.log("Error is: ", error);
          }
        }}
      >
        log out
      </button>
    </div>
  );
};

export default AdminNavbar;
