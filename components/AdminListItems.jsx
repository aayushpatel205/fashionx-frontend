import React, { useEffect, useState } from "react";
import { getAllProducts } from "../src/api/userApis";

const AdminListItems = () => {
  const [allProducts, setAllProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllProductsData = async () => {
      const data = await getAllProducts("asc");
      setAllProducts(data?.data);
      setLoading(false);
    };
    getAllProductsData();
  }, []);

  return (
    <div className="flex flex-col gap-3 border-l-1 pl-10 border-gray-400 py-4">
      <p className="text-xl text-gray-400 font-medium">All Products List</p>

      {loading ? (
        <div className="flex justify-center mt-20 h-screen">
          <div className="w-16 h-16 border-4 border-black rounded-full border-t-transparent animate-spin"></div>
        </div>
      ) : (
        <div>
          <div className="flex px-3 py-1 border border-gray-400">
            <p className="w-[15%]">Image</p>
            <p className="w-[35%]">Name</p>
            <p className="w-[15%]">Category</p>
            <p className="w-[20%]">Price</p>
            <p className="w-[15%]">Action</p>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            {allProducts?.map((element, index) => {
              return (
                <div
                  key={index}
                  className="flex px-3 py-2 border border-gray-400 items-center"
                >
                  <img
                    className="w-[5%] h-16"
                    src={element?.imgUrl}
                    alt="Product"
                  />
                  <p className="w-[35%] ml-[10%]">{element?.productName}</p>
                  <p className="w-[15%] ml-[0%]">{element?.category}</p>
                  <p className="w-[20%]">${element?.price}</p>
                  <p className="w-[15%]">Action</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminListItems;
