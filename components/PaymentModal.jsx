import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToOrder } from "../src/api/userApis";
import { useUserData } from "../src/Context/UserDataContext";
import { useProductData } from "../src/Context/ProductDataContext";
import closeIcon from "../src/assets/admin_assets/close.png"

function PaymentModal({ onClose }) {
  const navigate = useNavigate();
  const { userCartData } = useProductData();
  const user = useUserData();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (cardNumber.length === 16 && expiry.length === 5 && cvv.length === 3) {
      setError("");
    }
  }, [cvv, cardNumber, expiry]);

  const handlePayment = async () => {
    try {
      // Basic regex for numbers only
      const cardNumberRegex = /^\d{16}$/;
      const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      const cvvRegex = /^\d{3}$/;

      // Card number validation
      if (!cardNumberRegex.test(cardNumber)) {
        setError("Card number must be 16 digits.");
        return;
      }

      // Expiry date format validation
      if (!expiryRegex.test(expiry)) {
        setError("Expiry date must be in MM/YY format.");
        return;
      }

      // Parse expiry date to check if it's in the future
      const [month, year] = expiry.split("/").map(Number);
      const currentDate = new Date();
      const expiryDate = new Date(
        2000 + year,
        month - 1, // JS months are 0-based
        1
      );

      // Set to end of the expiry month
      expiryDate.setMonth(expiryDate.getMonth() + 1);
      expiryDate.setDate(0); // last day of previous month

      if (expiryDate < currentDate) {
        setError("Your card has expired.");
        return;
      }

      // CVV validation
      if (!cvvRegex.test(cvv)) {
        setError("CVV must be 3 digits.");
        return;
      }

      // If all validations pass
      setError("");

      // Call API to place order
      await addToOrder(user?.userData.data, userCartData);
      navigate("/payment/success");
    } catch (error) {
      console.error(error);
      navigate("/payment/error");
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-7 w-96 relative shadow-2xl border border-gray-300 flex flex-col">
        <img
          src={closeIcon}
          className="h-4 w-4 cursor-pointer self-end"
          onClick={onClose}
        />

        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Enter Card Details
        </h2>

        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="border w-full p-3 mb-4 focus:outline-none focus:ring focus:ring-black-500"
        />
        <input
          type="text"
          placeholder="MM/YY"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          className="border w-full p-3 mb-4 focus:outline-none focus:ring focus:ring-black-500"
        />
        <input
          type="text"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          className="border w-full p-3 mb-4 focus:outline-none focus:ring focus:ring-black-500"
        />

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="flex justify-between">
          <button
            onClick={handlePayment}
            className="w-[100%] uppercase bg-black h-10 text-white text-sm hover:opacity-85 cursor-pointer"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
