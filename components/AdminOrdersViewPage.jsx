import React, { useEffect, useState } from "react";
import { getAllOrders } from "../src/api/adminApis";
import AdminOrderItemDisplay from "./AdminOrderItemDisplay";

const AdminOrdersViewPage = () => {
  const [allOrders, setAllOrders] = useState([]);
  const getAllOrdersData = async () => {
    try {
      const { data } = await getAllOrders();
      setAllOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  

  useEffect(() => {
    getAllOrdersData();
  }, []);
  
  return (
    <div className="flex flex-col gap-3 border-l-1 pl-10 py-4">
      <p className="text-xl text-gray-400 font-medium">Orders Page</p>

      {allOrders?.map((element) => {
        return (
          <AdminOrderItemDisplay element={element}/>
        );
      })}
    </div>
  );
};

export default AdminOrdersViewPage;
