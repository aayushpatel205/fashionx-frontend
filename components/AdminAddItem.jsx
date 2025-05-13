import React, { useState, useRef } from "react";
import uploadArea from "./../src/assets/admin_assets/upload_area.png";
import SortDropDown from "./SortDropDown";
import { uploadImage } from "../uploadImageFunction";
import { addProduct } from "../src/api/adminApis";

const AdminAddItem = () => {
  const [imagePath, setImagePath] = useState();
  const [imagePreview, setImagePreview] = useState(null);
  const [deliveryTime, setDeliveryTime] = useState("1 Day");
  const [productDetails, setProductDetails] = useState({
    productName: "",
    productDescription: "",
    price: 0,
  });
  const [categoryDropDown, setCategoryDropDown] = useState({
    category: "",
    subCategory: "",
  });
  const fileInputRef = useRef(null);

  const optionsArrayCategory = ["Men", "Women", "Kids"];
  const optionsArraySubCategory = ["Topwear", "Bottomwear", "Winterwear"];
  const deliveryTimeArray = ["1 Day", "2 Days", "3-5 Days", "7 Days"];

  const clearAllFields = () => {
    setProductDetails((prevDetails) =>
      Object.fromEntries(Object.keys(prevDetails).map((key) => [key, ""]))
    );
    setCategoryDropDown((prevDetails) =>
      Object.fromEntries(Object.keys(prevDetails).map((key) => [key, ""]))
    );
    setImagePreview("");
    setImagePath("");
  };

  const addItem = async () => {
    try {
      if (Object.values(productDetails).some((value) => !value) || !imagePath)
        return;
      if (productDetails.price < 0) return;
      const imgUrl = await uploadImage(imagePath,"product");
      await addProduct({
        ...productDetails,
        ...categoryDropDown,
        deliveryTime,
        imgUrl,
      });
      clearAllFields();
    } catch (error) {
      console.log("Error is: ",error);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePath(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5 border-l-1 pl-10 border-gray-400 py-4">
        <p className="text-xl text-gray-400 font-medium">Upload Image</p>
        <div className="h-28 w-28 flex gap-2" onClick={handleImageClick}>
          <img
            src={imagePreview || uploadArea}
            alt="Upload"
            className={`h-full w-full cursor-pointer object-cover ${
              imagePreview && "border-2 border-gray-200"
            }`}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <p>{imagePath?.name}</p>

        <div className="flex flex-col gap-1">
          <p className="text-gray-700">Product Name</p>
          <input
            value={productDetails.productName}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                productName: e.target.value,
              })
            }
            placeholder="Product name..."
            className="w-[30%] border-2 border-gray-200 h-10 px-2 outline-none"
            type="text"
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-gray-700">Product Description</p>
          <textarea
            value={productDetails.productDescription}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                productDescription: e.target.value,
              })
            }
            placeholder="Please add description..."
            className="h-36 border-2 w-[40%] resize-none p-2 border-gray-200 outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-gray-700">Product Price</p>
          <input
            onChange={(e) =>
              setProductDetails({ ...productDetails, price: e.target.value })
            }
            value={productDetails.price}
            placeholder="Product price..."
            className="w-[30%] border-2 border-gray-200 h-10 px-2 outline-none"
            type="number"
            min="0"
            max="100"
          />
        </div>

        <div className="flex gap-5 w-[100%]">
          <div className="gap-1 flex flex-col w-[20%]">
            <p className="text-gray-700">Category</p>
            <SortDropDown
              setCategoryDropDown={setCategoryDropDown}
              categoryDropDown={categoryDropDown}
              category={"Category"}
              optionsArray={optionsArrayCategory}
            />
          </div>
          <div className="gap-1 flex flex-col w-[25%]">
            <p className="text-gray-700">Sub Category</p>
            <SortDropDown
              setCategoryDropDown={setCategoryDropDown}
              categoryDropDown={categoryDropDown}
              category={"Sub Category"}
              optionsArray={optionsArraySubCategory}
            />
          </div>
          <div className="gap-1 flex flex-col w-[25%]">
            <p className="text-gray-700">Delivery Time</p>
            <SortDropDown
              state={deliveryTime}
              setState={setDeliveryTime}
              category={"Delivery Time"}
              optionsArray={deliveryTimeArray}
            />
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <input type="checkbox" className="h-4 w-4 accent-black" />
          <span>Add to Bestseller</span>
        </div>
        <button
          className="w-[12%] mt-3 uppercase bg-black h-10 text-white text-sm hover:opacity-85 cursor-pointer"
          onClick={() => addItem()}
        >
          add item
        </button>
      </div>
    </>
  );
};

export default AdminAddItem;
