import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useProductData } from "../src/Context/ProductDataContext";
import axiosInstance from "../axiosInstance";
import { useUserData } from "../src/Context/UserDataContext";
import { getUserDetails, userLogout } from "../src/api/userApis";
import dropdownIcon from "../src/assets/frontend_assets/dropdown_icon.png"
import bookmarkDark from "../src/assets/frontend_assets/bookmark-dark.png"
import bookmarkLight from "../src/assets/frontend_assets/bookmark.png"
import shoppingBag from "../src/assets/admin_assets/shopping-bag.png"
import profileCandidate from "../src/assets/admin_assets/profile-candidate.png"
import LogoutModal from "./LogOutModal";
const Navbar = () => {
  const { userData, setUserData } = useUserData();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [savedPageOpen, setSavedPageOpen] = useState(true);
  const path = location.pathname;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onConfirm = async () => {
    try {
      await userLogout();
      setUserData({ data: {}, isVerified: false });
      setIsModalOpen(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setIsModalOpen(false);
    }
  };

  const onCancel = () => {
    setIsModalOpen(false);
  };


  useEffect(() => {
    verifyUser();
  }, []);

  useEffect(() => {
    if (location.pathname === "/user-wishlist") {
      setSavedPageOpen(true);
    } else {
      setSavedPageOpen(false);
    }
  }, [location.pathname]);

  const verifyUser = async () => {
    try {
      const response = await axiosInstance.get("user/auth/verify");
      const res = await getUserDetails(
        response.data.user.id,
        "profile-picture"
      );
      setUserData({
        isVerified: true,
        data: {
          name: response.data.user.name,
          email: response.data.user.email,
          id: response.data.user.id,
        },
        profilePicture: res?.data.userProfilePicture,
      });
      setIsLoading(false);
    } catch (error) {
      setUserData({ ...userData, isVerified: false });
      setIsLoading(false);
      return error;
    }
  };
  return (
    <>
      <div className={`h-20 px-8 flex justify-between items-center w-[100%]`}>
        <Link to={"/"}>
          {" "}
          <p className="text-4xl font-medium cursor-pointer">
            Fashion<span className="text-gray-600 font-extralight">X</span>
          </p>
        </Link>
        <div className="flex justify-between w-[30%] items-center relative">
          <Link to="/">
            <p
              className={`cursor-pointer text-black bg-white py-1 ${
                path === "/" ? "invert px-2" : ""
              }`}
            >
              HOME
            </p>
          </Link>

          <Link to="/collections">
            <p
              className={`cursor-pointer text-black bg-white py-1 ${
                path === "/collections" ? "invert px-2" : ""
              }`}
            >
              COLLECTION
            </p>
          </Link>

          <Link to="/about-us">
            <p
              className={`cursor-pointer text-black bg-white py-1 ${
                path === "/about-us" ? "invert px-2" : ""
              }`}
            >
              ABOUT
            </p>
          </Link>

          {/* Dropdown menu */}
          <div
            className="relative group"
            onClick={() => setIsDropDownOpen(!isDropDownOpen)}
          >
            <div className="flex gap-2 items-center cursor-pointer">
              <p className="cursor-pointer text-black bg-white py-1 px-2 transition duration-300">
                USER
              </p>
              <img
                src={dropdownIcon}
                className={`h-4 w-2 transform transition-transform ${
                  isDropDownOpen ? "rotate-270" : "rotate-90"
                }`}
              />
            </div>

            <div
              className={`absolute mt-1 py-2 w-32 shadow-lg z-100 bg-white ${
                isDropDownOpen ? "flex flex-col" : "hidden"
              }`}
            >
              <Link
                to="/my-order"
                className="px-4 py-2 hover:bg-black hover:text-white transition duration-300"
              >
                Orders
              </Link>
              {userData?.isVerified && (
                <Link
                  onClick={async () => {
                    await userLogout();
                    setIsModalOpen(true);
                  }}
                  className="px-4 py-2 hover:bg-black hover:text-white transition duration-300"
                >
                  Logout
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center w-[20%] gap-5">
          {userData?.isVerified && (
            <Link to={"/user-wishlist"}>
              <div className="relative mt-1">
                <img
                  src={
                    savedPageOpen
                      ? bookmarkDark
                      : bookmarkLight
                  }
                  className="h-6 w-6 cursor-pointer"
                />
              </div>
            </Link>
          )}
          <Link to={"/cart"}>
            <div className="relative">
              <img
                src={shoppingBag}
                className="h-8 w-8 cursor-pointer"
              />
              {path !== "/cart" && (
                <p className="bg-black text-white text-xs w-[19px] h-[19px] rounded-full flex justify-center items-center absolute right-0 top-[19px]">
                  !
                </p>
              )}
            </div>
          </Link>

          <div className="pt-1 flex gap-3 items-center">
            {!isLoading ? (
              <Link
                to="/user-profile"
                className={`${
                  userData?.profilePicture
                    ? ""
                    : "h-9 w-9 border rounded-full border-gray-400 flex justify-center items-center"
                }`}
              >
                <img
                  src={
                    userData?.profilePicture
                      ? userData.profilePicture
                      : profileCandidate
                  }
                  className={`cursor-pointer ${
                    userData?.profilePicture
                      ? "h-8 w-8 rounded-full"
                      : "h-[21px] w-[21px]"
                  }`}
                  onClick={() => setIsOpen(!isOpen)}
                />
              </Link>
            ) : (
              <div className="flex justify-center items-center h-screen">
                <div className="w-6 h-6 border-3 border-black rounded-full border-t-transparent animate-spin"></div>
              </div>
            )}
          </div>

          {!userData?.isVerified && !isLoading && (
            <button
              onClick={() => navigate("/login")}
              className="w-[45%] uppercase bg-black h-10 text-white text-sm hover:opacity-85 cursor-pointer"
            >
              login
            </button>
          )}
        </div>
      </div>
      {isModalOpen && <LogoutModal onConfirm={onConfirm} onCancel={onCancel} />}
    </>
  );
};

export default Navbar;
