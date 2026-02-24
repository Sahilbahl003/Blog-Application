import React from "react";

const DeleteBlogModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-[350px] rounded-xl shadow-xl p-6 text-center">
        <h2 className="text-lg font-semibold mb-2">Delete Blog</h2>
        <p className="text-gray-500 mb-5">
          Are you sure you want to delete this blog?
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBlogModal;