import React, { useEffect, useState } from "react";
import { getUserDetails } from "../src/api/userApis";
import { useUserData } from "../src/Context/UserDataContext";
import { deleteFromWishlist } from "../src/api/userApis";
import { toast, ToastContainer } from "react-toastify";
import { toastStyle } from "../src/toastStyle";
import { useNavigate } from "react-router-dom";

const UserWishlist = () => {
  const navigate = useNavigate();
  const [userWishlist, setUserWishlist] = useState([]);
  const { userData } = useUserData();
  const [loading, setLoading] = useState(true);

  const getWishlistData = async () => {
    try {
      const category = "wishlist";
      const response = await getUserDetails(userData?.data.id, category);
      setLoading(false);
      setUserWishlist(response?.data.userWishlist);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getWishlistData();
  }, [userData]);

  if (loading) {
    return (
      <div className="flex justify-center mt-24 h-screen">
        <div className="w-20 h-20 border-4 border-black rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }
  return (
    <>
      <div className="w-full overflow-y-auto">
        <div className="flex gap-2 px-10 mt-5">
          <p className="text-gray-500 text-2xl">USER</p>
          <p className="font-semibold text-2xl">WISHLIST</p>
          <div className="ml-2 w-10 h-[2px] bg-gray-700 mt-4"></div>
        </div>
        {/* Set a fixed height and enable scrolling */}
        <div className="flex flex-col gap-5 items-center mt-6">
          {!loading && userWishlist?.length === 0 ? (
            <div className="flex gap-8 items-center">
              <img
                src="../src/assets/admin_assets/wishlist.png"
                className="h-24 w-24"
              />
              <p className="text-gray-700 font-medium text-3xl">
                Your wishlist is empty
              </p>
            </div>
          ) : (
            userWishlist?.map((element, index) => {
              return (
                <div
                  key={index}
                  className="flex py-2 border border-gray-400 items-center w-[95%]"
                >
                  <img
                    onClick={() => {
                      navigate(`/product/${element?._id}`);
                    }}
                    className="h-14 w-14 ml-4 cursor-pointer"
                    src={element?.imgUrl}
                    alt="Product"
                  />
                  <p className="w-[50%] ml-[10%] pr-2">
                    {element?.productName}
                  </p>
                  <p className="w-[15%]">{element?.category}</p>
                  <p className="w-[10%]">${element?.price}</p>
                  <button
                    onClick={async () => {
                      try {
                        setUserWishlist(
                          userWishlist.filter(
                            (item) => item._id !== element?._id
                          )
                        );
                        await deleteFromWishlist(
                          userData?.data.id,
                          element?._id
                        );
                        toast.error("Removed from wishlist", toastStyle);
                      } catch (error) {
                        console.log("error while deleting !!!");
                      }
                    }}
                    className="w-[12%] uppercase bg-black h-10 text-white text-sm hover:opacity-85 cursor-pointer mr-4"
                  >
                    remove
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UserWishlist;
