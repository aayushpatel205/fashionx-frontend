import { useState } from "react";
import { updateOrderStatus } from "../src/api/adminApis";
import dropdownIcon from "../src/assets/frontend_assets/dropdown_icon.png"

const SortDropDown = ({
  category,
  optionsArray,
  width,
  setCategoryDropDown,
  categoryDropDown,
  state,
  setState,
  orderId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`relative ${width ? "w-[28%]" : "w-[100%]"}`}>
      <div
        className="border-2 border-gray-200 text-sm h-10 flex items-center px-4 justify-between bg-white cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex gap-1.5">
          <span className="text-gray-500">{category}:</span>
          <span className="text-black">
            {category === "Category"
              ? categoryDropDown.category
              : category === "Sub Category"
              ? categoryDropDown.subCategory
              : state}
          </span>
        </div>
        <img
          src={dropdownIcon}
          className={`w-3 h-5 transform transition-transform ${
            isOpen ? "rotate-270" : "rotate-90"
          }`}
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute w-full bg-white text-black mt-2 shadow-md border-gray-200 border">
          {optionsArray.map((option) => (
            <div
              key={option}
              className="px-4 py-2 hover:bg-black hover:text-white cursor-pointer"
              onClick={async () => {
                if (orderId) {
                  try {
                    setState(option);
                    await updateOrderStatus(orderId, option);
                    setIsOpen(false);
                  } catch (error) {
                    console.log(error);
                  }
                } else {
                  if (category === "Category")
                    setCategoryDropDown({
                      ...categoryDropDown,
                      category: option,
                    });
                  else if (category === "Sub Category")
                    setCategoryDropDown({
                      ...categoryDropDown,
                      subCategory: option,
                    });
                  else setState(option);
                  setIsOpen(false);
                }
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropDown;
