import React, { useEffect, useState } from "react";

const CartItemDisplay = ({
  element,
  setUserCartData,
  userCartData,
}) => {
  const [quantity, setQuantity] = useState(element?.quantity);
  useEffect(() => {
    setUserCartData(
      userCartData.map((item) => {
        if (
          item._id === element._id &&
          item.selectedSize === element.selectedSize
        ) {
          return { ...item, quantity: Number(quantity) };
        }
        return item;
      })
    );
  }, [quantity]);

  return (
    <>
      <div className="border-t-2 border-b-2 w-[100%] border-gray-200 flex justify-between items-center py-3 px-2 ">
        <div className="flex gap-3 items-center w-[35%]">
          <img src={element?.imgUrl} className="h-28 w-24" />

          <div className="flex flex-col self-start gap-3 mt-1 w-[85%]">
            <p className="text-gray-700 font-medium">{element?.productName}</p>
            <div className="flex gap-6 items-center">
              <p className="text-gray-700">${element?.price}</p>
              <div className="h-10 w-10 border-2 flex justify-center items-center bg-gray-100 border-gray-200">
                {element?.selectedSize}
              </div>
            </div>
          </div>
        </div>
        <input
          onChange={(e) => {
            if (e.target.value < 1) {
              setQuantity(1);
            } else {
              setQuantity(e.target.value);
            }
          }}
          type="number"
          value={quantity}
          className="h-8 w-24 px-2 py-2 outline-none border-2 border-gray-200 text-center cursor-pointer caret-transparent"
        />

        <div
          onClick={() => {
            if (userCartData.length === 1) {
              sessionStorage.removeItem("cart");
              sessionStorage.removeItem("totalCost");
            }
            setUserCartData(
              userCartData.filter(
                (item) =>
                  !(
                    item._id === element._id &&
                    item.selectedSize === element.selectedSize
                  )
              )
            );
          }}
        >
          <img
            src="../src/assets/admin_assets/bin.png"
            className="h-6 w-6 cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

export default CartItemDisplay;
