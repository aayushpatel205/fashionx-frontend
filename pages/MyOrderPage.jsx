import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getUserOrders } from "../src/api/userApis";
import { useUserData } from "../src/Context/UserDataContext";
import UserOrderItemDisplay from "../components/UserOrderItemDisplay";

const MyOrderPage = () => {
  const { userData } = useUserData();
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const convertIntoDate = (dateStr) => {
    const date = new Date(dateStr);
    function getOrdinal(num) {
      if (num > 3 && num < 21) return "th";
      switch (num % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    }

    const day = date.getUTCDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getUTCFullYear();

    const formattedDate = `${day}${getOrdinal(day)} ${month}, ${year}`;
    return formattedDate;
  };

  const getMyOrders = async () => {
    try {
      const response = await getUserOrders(userData?.data.id);
      console.log("Order recieved: ", response);
      setUserOrders(response.orders);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyOrders();
    console.log(userOrders);
  }, [userData]);
  const location = useLocation();
  return loading ? (
    <div className="flex justify-center mt-28">
      <div className="w-16 h-16 border-4 border-black rounded-full border-t-transparent animate-spin"></div>
    </div>
  ) : (
    <div className="mt-5 flex flex-col">
      <div className="px-14 flex gap-2">
        <p className="text-gray-500 text-2xl">MY</p>
        <p className="font-semibold text-2xl">ORDERS</p>
        <div className="ml-2 w-10 h-[2px] bg-gray-700 mt-4"></div>
      </div>

      <div className="flex flex-col gap-10 mt-5">
        {userOrders?.map((element) => {
          const date = convertIntoDate(element?.createdAt);
          return (
            <>
              <div className="px-14">
                <div className="bg-white py-8 shadow-md flex flex-col gap-3 px-6">
                  <div className="items-center mb-2">
                    <span className="text-lg text-gray-500">
                      Ordered on {date}
                    </span>
                  </div>

                  {element.productInfo.map((item) => (
                    <UserOrderItemDisplay
                      element={item}
                      status={element.status}
                      date={date}
                    />
                  ))}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrderPage;
