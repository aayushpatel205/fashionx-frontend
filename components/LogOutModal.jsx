import React from "react";

const LogoutModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-8 w-96 relative shadow-2xl border border-gray-300">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Confirm Logout
        </h2>
        <p className="text-gray-600 mb-8">
          Are you sure you want to log out of your account?
        </p>

        <div className="flex justify-between gap-4">
          <button
            onClick={onConfirm}
            className="w-full uppercase bg-black h-10 text-white text-sm hover:opacity-85 cursor-pointer"
          >
            Yes, Logout
          </button>
          <button
            onClick={onCancel}
            className="w-full uppercase bg-gray-300 h-10 text-gray-800 text-sm hover:bg-gray-400 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
