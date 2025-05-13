import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PaymentErrorPage = () => {
  const [shake, setShake] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      setShake(true);
    }, 800);
  }, []);

  return (
    <div className="flex justify-center h-screen bg-white">
      <motion.div
        className="bg-white p-10 shadow-lg text-center h-[40%] w-[30%] mt-20"
        animate={shake ? { x: [-5, 5, -5, 5, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="flex items-center justify-center w-16 h-16 mx-auto mb-4 border-4 border-red-500 rounded-full"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.div>
        </motion.div>
        <h2 className="text-2xl font-semibold text-gray-800">Payment Failed</h2>
        <p className="text-lg text-gray-600 mt-2">Something went wrong with your transaction.</p>
        <button className="mt-6 px-6 py-2 bg-red-600 text-white hover:opacity-70 cursor-pointer">
          Try Again
        </button>
      </motion.div>
    </div>
  );
};

export default PaymentErrorPage;
