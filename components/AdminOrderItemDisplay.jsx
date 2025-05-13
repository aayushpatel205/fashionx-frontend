import React, { useState } from "react";
import SortDropDown from "./SortDropDown";

const AdminOrderItemDisplay = ({ element }) => {
  const [currentStatus, setCurrentStatus] = useState(element.status);
  let totalCost = 0;
  const orderStatusArray = [
    "Order Placed",
    "Packing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  const convertDate = (isoDate) => {
    const date = new Date(isoDate);

    // Convert to MM/DD/YY format
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date
      .getFullYear()
      .toString()
      .slice(-2)}`;

    return formattedDate;
  };
  return (
    <div className="w-[88%] min-h-72 shadow-md p-5 flex gap-5 items-start my-2">
      <div className="h-14 w-14 border-2 border-gray-200 flex justify-center items-center ">
        <img
          src="../src/assets/admin_assets/logistics.png"
          className="h-11 w-11"
        />
      </div>
      <div className="flex flex-col gap-3 my-2 ">
        <div className="flex flex-col gap-1">
          {element?.productInfo.map((item) => {
            totalCost += item.price * item.quantity;
            return <p className="text-gray-500">{item.productName}</p>;
          })}
        </div>

        <p className="text-gray-500 font-semibold my-4">
          {element?.userData.name}
        </p>

        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <p className="text-gray-500 font-semibold">Email: </p>
            <p className="text-gray-500">{element?.userData.email}</p>
          </div>

          <div className="flex gap-2">
            <p className="text-gray-500 font-semibold">UserId: </p>
            <p className="text-gray-500">{element?.userData.id}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col ml-8 my-2 gap-4">
        <p className="text-gray-500">Items: {element?.productInfo.length}</p>
        <p className="text-gray-500">Method: Card</p>
        <p className="text-gray-500">Date: {convertDate(element.createdAt)}</p>
      </div>
      <div className="mx-7 my-2">
        <p className="text-gray-500">${totalCost}</p>
      </div>
      <SortDropDown
        category={"Order Status"}
        optionsArray={orderStatusArray}
        width={true}
        state={currentStatus}
        setState={setCurrentStatus}
        orderId={element?._id}
      />
    </div>
  );
};

export default AdminOrderItemDisplay;
