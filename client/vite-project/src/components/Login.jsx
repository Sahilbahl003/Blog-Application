import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateField, validateForm } from "../utils/validation";
import { toast } from "react-toastify";
import { IoAlertCircleOutline } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

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

  const submitHandler = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFormError("Invalid email or password");
      return;
    }

    setFormError("");

    try {
      const response = await fetch("http://localhost:4000/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setFormError(data.message || "Invalid email or password");
        return;
      }

      toast.success(data.message);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/allblogs");
    } catch {
      setFormError("Something went wrong");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={submitHandler}
        className="bg-white shadow-xl px-10 py-8 w-[420px] rounded-xl flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-blue-500 text-center mb-2">
          Login
        </h2>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={changeHandler}
            onBlur={blurHandler}
            className="shadow-sm shadow-zinc-300 px-4 py-2 rounded-md w-full outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && (
            <p className="text-red-600 text-xs">{errors.email}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
  <label className="text-sm font-medium">Password</label>

  <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={formData.password}
                onChange={changeHandler}
                onBlur={blurHandler}
                className="shadow-sm shadow-zinc-300 px-4 py-2 pr-10 rounded-md w-full outline-none focus:ring-2 focus:ring-blue-400"
              />
  
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="text-gray-500 text-lg" />
                ) : (
                  <AiOutlineEye className="text-gray-500 text-lg" />
                )}
              </div>
            </div>
  
            {errors.password && (
              <p className="text-red-600 text-xs">{errors.password}</p>
            )}
          </div>


        {formError && (
          <p className="text-red-600 text-sm text-center">{formError}</p>
        )}

        <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md h-10 mt-2 transition">
          Login
        </button>

        <p className="text-sm text-center">
          Create an account?
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer ml-1"
          >
            Register
          </span>
        </p>

        <p className="text-blue-500 cursor-pointer"
        onClick={() => navigate("/forgot-password")}>
        Forgot Password?
      </p>

      </form>
    </div>
  );
};

export default Login;
