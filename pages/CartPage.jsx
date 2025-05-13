import React, { useEffect } from "react";
import CartItemDisplay from "../components/CartItemDisplay";
import { useNavigate } from "react-router-dom";
import { useProductData } from "../src/Context/ProductDataContext";

const CartPage = () => {
  const navigate = useNavigate();
  const { userCartData, setUserCartData, totalCost, setTotalCost } =
    useProductData();

  useEffect(() => {
    setTotalCost(
      userCartData?.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
    );
    if (userCartData?.length > 0) {
      sessionStorage.setItem("cart", JSON.stringify(userCartData));
    }
  }, [userCartData]);

  useEffect(() => {
    window.scrollTo(0, 0);
    sessionStorage.getItem("cart") &&
      setUserCartData(JSON.parse(sessionStorage.getItem("cart")));
  }, []);

  return (
    <div className="px-14 mt-16 flex flex-col gap-7">
      <div className="flex gap-2">
        <p className="text-gray-500 text-2xl">YOUR</p>
        <p className="font-semibold text-2xl">CART</p>
        <div className="ml-2 w-10 h-[2px] bg-gray-700 mt-4"></div>
      </div>

      <div className="flex flex-col gap-5">
        {userCartData?.length > 0 ? (
          userCartData?.map((element, index) => {
            return (
              <CartItemDisplay
                element={element}
                key={index}
                setUserCartData={setUserCartData}
                userCartData={userCartData}
              />
            );
          })
        ) : (
          <div className="flex items-center justify-center gap-5 mt-5">
            <p className="text-gray-700 text-4xl">Your cart is empty</p>
            <img
              src="../src/assets/admin_assets/empty-cart.png"
              className="h-20 w-20"
            />
          </div>
        )}
      </div>


      {userCartData?.length > 0 && (
        <div className="self-end mt-10 w-[35%]">
          <div className="flex gap-2">
            <p className="text-gray-500 text-2xl">CART</p>
            <p className="font-semibold text-2xl">TOTALS</p>
            <div className="ml-2 w-10 h-[2px] bg-gray-700 mt-4"></div>
          </div>

          <div className="flex flex-col">
            <div>
              <div className="flex justify-between items-center mt-4 px-2 py-1">
                <p className="text-gray-500">Subtotal</p>
                <p className="text-gray-700">${totalCost}</p>
              </div>
              <div className="h-[1px] bg-gray-200"></div>
            </div>

            <div>
              <div className="flex justify-between items-center mt-4 px-2 py-1">
                <p className="text-gray-500">Shipping Fee</p>
                <p className="text-gray-700">${(0.15 * totalCost).toFixed(2)}</p>
              </div>
              <div className="h-[1px] bg-gray-200"></div>
            </div>

            <div>
              <div className="flex justify-between items-center mt-4 px-2 py-1">
                <p className="text-gray-700 font-semibold">Total</p>
                <p className="text-gray-700">
                  ${(totalCost + 0.15 * totalCost).toFixed(2)}
                </p>
              </div>
            </div>

            <button
              className="w-[50%] mt-5 self-end bg-black h-12 text-white text-sm hover:opacity-85 cursor-pointer"
              onClick={() => navigate("/payment")}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
