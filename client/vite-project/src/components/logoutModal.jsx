import React from "react";

const LogoutModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-[350px] rounded-xl shadow-xl p-6 text-center">

        <h2 className="text-lg font-semibold mb-2">Logout Confirmation</h2>
        <p className="text-gray-500 mb-5">
          Are you sure you want to logout?
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Confirm
          </button>

          <button
            onClick={onCancel}
            className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default LogoutModal;
