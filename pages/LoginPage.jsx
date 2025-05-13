import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userLogin } from "../src/api/userApis";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../src/Context/UserDataContext";
import { toastStyle } from "../src/toastStyle";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { userData, setUserData } = useUserData();
  const path = isPasswordVisible
    ? "../src/assets/frontend_assets/view.png"
    : "../src/assets/frontend_assets/hide.png";
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  return (
    <div className="mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-3">
        <img src="../src/assets/admin_assets/login.svg" />
        <input
          className="w-[85%] border border-gray-700 h-10 px-2 outline-none"
          placeholder="Email"
          value={userDetails.email}
          onChange={(e) =>
            setUserDetails({ ...userDetails, email: e.target.value })
          }
        />
        <div className="w-[85%] border border-gray-700 px-2 flex justify-between items-center">
          <input
            className="w-[87%] outline-none h-10"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
          />
          <img
            src={path}
            className="h-6 w-6 cursor-pointer"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          />
        </div>

        <div className="flex justify-between w-[85%]">
          <p className="text-gray-700 text-sm cursor-pointer">
            Forgot Password?
          </p>
          <Link to={"/sign-up"}>
            <p className="text-gray-700 text-sm cursor-pointer">
              Create account
            </p>
          </Link>
        </div>

        <button
          className="w-[85%] mt-5 uppercase bg-black h-10 text-white text-sm hover:opacity-85 cursor-pointer"
          onClick={async () => {
            try {
              if (!userDetails.email || !userDetails.password) {
                toast.error("Please enter email and password",toastStyle);
                return;
              }
              if (!emailRegex.test(userDetails.email)) {
                toast.error("Please enter a valid email address",toastStyle);
                setUserDetails({ email: "", password: "" });
                return;
              }
              const response = await userLogin(
                userDetails.email,
                userDetails.password
              );
              setUserData({
                ...userData,
                isVerified: true,
                data: {
                  name: response.data.user.name,
                  email: response.data.user.email,
                  token: response.data.token,
                  id: response.data.user._id,
                },
                profilePicture: response?.data.user.profilePicture,
              });
              navigate("/");
            } catch (error) {
              toast.error(error.response.data.message,toastStyle);
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

export default LoginPage;
