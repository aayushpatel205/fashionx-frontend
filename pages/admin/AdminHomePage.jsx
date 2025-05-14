import React, { useState } from "react";
import AdminAddItem from "../../components/AdminAddItem";
import AdminOrdersViewPage from "../../components/AdminOrdersViewPage";
import AdminListItems from "../../components/AdminListItems";
import plusIcon from "../../src/assets/admin_assets/plus.png"
import clipboardIcon from "../../src/assets/admin_assets/clipboard.png"


const AdminHomePage = () => {
  const [activePage, setActivePage] = useState("Add Items");
  const RenderComponent = {
    "Add Items": <AdminAddItem />,
    "List Items": <AdminListItems />,
    "Orders": <AdminOrdersViewPage />,
  };
  return (
    <div className="min-h-[150%] w-[100%] flex">
      <div className="w-[18%] h-full py-10 flex flex-col items-end gap-3">
        <div
          className={`h-10 w-[80%] border border-gray-400 px-3 flex gap-3 items-center bg-white hover:border-y-2 hover:border-l-2 cursor-pointer ${
            activePage === "Add Items" && "invert"
          }`}
          onClick={() => setActivePage("Add Items")}
        >
          <img
            src={plusIcon}
            className="h-6 w-6"
          />
          <p className="font-medium">Add Items</p>
        </div>
        <div
          className={`h-10 w-[80%] border border-gray-400 px-3 flex gap-3 items-center bg-white hover:border-y-2 hover:border-l-2 cursor-pointer ${
            activePage === "List Items" && "invert"
          }`}
          onClick={() => setActivePage("List Items")}
        >
          <img
            src={clipboardIcon}
            className="h-6 w-6"
          />
          <p className="font-medium">List Items</p>
        </div>
        <div
          className={`h-10 w-[80%] border border-gray-400 px-3 flex gap-3 items-center bg-white hover:border-y-2 hover:border-l-2 cursor-pointer ${
            activePage === "Orders" && "invert"
          }`}
          onClick={() => setActivePage("Orders")}
        >
          <img
            src={clipboardIcon}
            className="h-6 w-6"
          />
          <p className="font-medium">Orders</p>
        </div>
      </div>
      <div className="w-[82%] p-10">{RenderComponent[activePage]}</div>
    </div>
  );
};

export default AdminHomePage;
