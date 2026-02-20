import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateField, validateForm } from "../utils/validation";
import { IoAlertCircleOutline } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ChangePassword = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword1: "",
  });

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    const error = validateField(name, value, updated);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };


  const blurHandler = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value, formData);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChangePassword = async () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setFormError("");

    const res = await fetch("http://localhost:4000/api/v1/changePassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      setFormError(data.message || "Password change failed");
      return;
    }

    toast.success("Password updated successfully");
    navigate("/profile");
  };

  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white shadow-xl px-8 py-6 w-[420px] rounded-xl flex flex-col gap-4">

        <h2 className="text-2xl font-bold text-center text-blue-500">
          Change Password
        </h2>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Current Password</label>
          <div className="relative">
            <input
              name="currentPassword"
              type={showCurrent ? "text" : "password"}
              value={formData.currentPassword}
              onChange={changeHandler}
              onBlur={blurHandler}
              placeholder="Current Password"
              className="shadow-sm shadow-zinc-300 px-4 py-2 pr-10 rounded-md w-full outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowCurrent(!showCurrent)}
            >
              {showCurrent ? <AiOutlineEyeInvisible className="text-gray-500 text-lg" /> : <AiOutlineEye className="text-gray-500 text-lg" />}
            </div>
          </div>
          {errors.currentPassword && <p className="text-red-600 text-xs">{errors.currentPassword}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium relative">
            New Password
            <div className="absolute right-3 top-0 group cursor-pointer">
              <IoAlertCircleOutline className="text-gray-400 text-lg" />
              <div className="absolute hidden group-hover:block right-0 -top-20 w-64 bg-black text-white text-xs rounded-md p-2 shadow-lg z-10">
                Must include uppercase, number, special character <br />
                Password must be at least 8 characters
              </div>
            </div>
          </label>

          <div className="relative">
            <input
              name="newPassword"
              type={showPassword ? "text" : "password"}
              value={formData.newPassword}
              onChange={changeHandler}
              onBlur={blurHandler}
              placeholder="New Password"
              className="shadow-sm shadow-zinc-300 px-4 py-2 pr-10 rounded-md w-full outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible className="text-gray-500 text-lg" /> : <AiOutlineEye className="text-gray-500 text-lg" />}
            </div>
          </div>
          {errors.newPassword && <p className="text-red-600 text-xs">{errors.newPassword}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Confirm Password</label>
          <div className="relative">
            <input
              name="confirmPassword1"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword1}
              onChange={changeHandler}
              onBlur={blurHandler}
              placeholder="Confirm New Password"
              className="shadow-sm shadow-zinc-300 px-4 py-2 pr-10 rounded-md w-full outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible className="text-gray-500 text-lg" /> : <AiOutlineEye className="text-gray-500 text-lg" />}
            </div>
          </div>
          {errors.confirmPassword1 && <p className="text-red-600 text-xs">{errors.confirmPassword1}</p>}
        </div>

        {formError && <p className="text-red-600 text-sm text-center">{formError}</p>}

        <button
          onClick={handleChangePassword}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-md h-10 transition"
        >
          Update Password
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="border border-gray-400 rounded-md h-10"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;