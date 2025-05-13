import React from "react";

const UserOrderItemDisplay = ({ element, status }) => {
  let statusColor = "bg-blue-500";

  if (status === "Packing") {
    statusColor = "bg-yellow-400";
  } else if (status === "Shipped") {
    statusColor = "bg-purple-500";
  } else if (status === "Out for Delivery") {
    statusColor = "bg-orange-400";
  } else if (status === "Delivered") {
    statusColor = "bg-green-600";
  }
  return (
    <div className="border-t-2 border-b-2 w-[100%] border-gray-200 flex justify-between items-center py-3 px-2 my-1">
      <div className="flex gap-3 items-center w-[40%] ">
        <img src={element?.imgUrl} className="h-28 w-24" />

        <div className="flex-col justify-between flex h-25 w-[80%]">
          <p className="text-gray-700 font-medium">{element?.productName}</p>
          <div className="flex gap-6">
            <p className="text-gray-700">${element?.price}</p>
            <p className="text-gray-700">Quantity: {element?.quantity}</p>
            <p className="text-gray-700">Size: {element?.selectedSize}</p>
          </div>

          <span className="text-gray-700">
            Delivery Time:{" "}
            <span className="text-gray-400">{element.deliveryTime}</span>
          </span>
        </div>
      </div>

      <div className="flex gap-3 items-center border-2 border-gray-200 px-3 py-2">
        <div className={`h-3 w-3 rounded-lg ${statusColor}`}></div>
        <p className="text-gray-500">{status}</p>
      </div>
    </div>
  );
};

export default UserOrderItemDisplay;
