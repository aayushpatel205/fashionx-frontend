import React, { useEffect, useState } from "react";
import { adminLogin } from "../../src/api/adminApis";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center">
      <div className="h-[340px] w-[25%] shadow-md mt-[100px] rounded-lg p-8 flex flex-col gap-4">
        <p className="text-4xl font-semibold">Admin Panel</p>
        <div className="flex flex-col gap-1">
          <p className="text-gray-700">Email Address</p>
          <input
            className="w-[100%] border-2 border-gray-200 h-10 px-2 outline-none"
            type="email"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-gray-700">Password</p>
          <input
            className="w-[100%] border-2 border-gray-200 h-10 px-2 outline-none"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-[100%] uppercase bg-black h-10 text-white text-sm hover:opacity-85 cursor-pointer"
          onClick={async () => {
            try {
              await adminLogin(username, password);
              navigate("/admin/home");
            } catch (error) {
              console.log(error);
            }
          }}
        >
          login
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminLoginPage;
