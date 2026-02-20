import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateField, validateForm } from "../utils/validation";
import { toast } from "react-toastify";
import { IoAlertCircleOutline } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignUp = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
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

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((p) => p - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setFormError("");

    try {
      const response = await fetch("http://localhost:4000/api/v1/register-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setFormError(data.msg || "Failed to send OTP");
        return;
      }

      toast.success(data.msg);
      setStep(2);
      setTimer(900);
    } catch {
      setFormError("Something went wrong");
    }
  };

  const verifyOtpHandler = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/verify-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.msg);
        return;
      }

      toast.success("Account created successfully");
      navigate("/login");
    } catch {
      toast.error("Verification failed");
    }
  };

  const formatTime = () => {
    const m = Math.floor(timer / 60);
    const s = timer % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-50">
      <form onSubmit={submitHandler} className="bg-white shadow-xl px-10 py-8 w-[420px] rounded-xl flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-blue-500 text-center mb-2">Register</h2>

        {step === 1 && (
          <>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Name</label>
              <input name="name" value={formData.name} onChange={changeHandler} onBlur={blurHandler} placeholder="Enter your name" className="shadow-sm shadow-zinc-300 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-400" />
              {errors.name && <p className="text-red-600 text-xs">{errors.name}</p>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Email</label>
              <input name="email" value={formData.email} onChange={changeHandler} onBlur={blurHandler} placeholder="Enter your email" className="shadow-sm shadow-zinc-300 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-400" maxLength={50}/>
              {errors.email && <p className="text-red-600 text-xs">{errors.email}</p>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium relative">
                Password
                <div className="absolute right-3 top-0 group cursor-pointer">
                  <IoAlertCircleOutline className="text-gray-400 text-lg" />
                  <div className="absolute hidden group-hover:block right-0 -top-20 w-64 bg-black text-white text-xs rounded-md p-2 shadow-lg z-10">
                    Must include uppercase, number, special character <br />
                    Password must be at least 8 characters
                  </div>
                </div>
              </label>

              <div className="relative">
                <input name="password" type={showPassword ? "text" : "password"} placeholder="Enter password" value={formData.password} onChange={changeHandler} onBlur={blurHandler} className="shadow-sm shadow-zinc-300 px-4 py-2 pr-10 rounded-md w-full outline-none focus:ring-2 focus:ring-blue-400" />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <AiOutlineEyeInvisible className="text-gray-500 text-lg" /> : <AiOutlineEye className="text-gray-500 text-lg" />}
                </div>
              </div>
              {errors.password && <p className="text-red-600 text-xs">{errors.password}</p>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Confirm Password</label>
              <div className="relative">
                <input name="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="Confirm password" value={formData.confirmPassword} onChange={changeHandler} onBlur={blurHandler} className="shadow-sm shadow-zinc-300 px-4 py-2 pr-10 rounded-md w-full outline-none focus:ring-2 focus:ring-blue-400" />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <AiOutlineEyeInvisible className="text-gray-500 text-lg" /> : <AiOutlineEye className="text-gray-500 text-lg" />}
                </div>
              </div>
              {errors.confirmPassword && <p className="text-red-600 text-xs">{errors.confirmPassword}</p>}
            </div>

            {formError && <p className="text-red-600 text-sm text-center">{formError}</p>}

            <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md h-10 mt-2 transition">
              Register
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              name="otp"
              placeholder="Enter OTP"
              onChange={changeHandler}
              className="shadow-sm shadow-zinc-300 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-green-400"
            />

            <p className="text-sm text-gray-500 text-center">
              OTP expires in: {formatTime()}
            </p>

            <button
              type="button"
              onClick={verifyOtpHandler}
              className="bg-green-500 hover:bg-green-600 text-white rounded-md h-10 mt-2 transition"
            >
              Verify OTP
            </button>

            {timer === 0 && (
              <button
                type="button"
                onClick={submitHandler}
                className="text-blue-500 underline text-sm"
              >
                Resend OTP
              </button>
            )}
          </>
        )}

        <p className="text-sm text-center">
          Already have an account?
          <span className="text-blue-600 cursor-pointer ml-1" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
