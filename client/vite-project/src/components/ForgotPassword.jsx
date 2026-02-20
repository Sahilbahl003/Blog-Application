import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(0);

  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((p) => p - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const sendOtp = async () => {
    const res = await fetch("http://localhost:4000/api/v1/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email }),
    });

    const data = await res.json();
    res.ok ? toast.success(data.msg) : toast.error(data.msg);

    if (res.ok) {
      setStep(2);
      setTimer(900);
    }
  };

  const verifyOtp = async () => {
    const res = await fetch("http://localhost:4000/api/v1/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email, otp: form.otp }),
    });

    const data = await res.json();
    res.ok ? toast.success(data.msg) : toast.error(data.msg);

    if (res.ok) setStep(3);
  };

  const resetPassword = async () => {
    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const res = await fetch("http://localhost:4000/api/v1/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.email,
        newPassword: form.newPassword,
      }),
    });

    const data = await res.json();
    res.ok ? toast.success(data.msg) : toast.error(data.msg);

    if (res.ok) {
      setTimeout(() => navigate("/login"), 1200);
    }
  };

  const formatTime = () => {
    const m = Math.floor(timer / 60);
    const s = timer % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="flex flex-col items-center mt-40 gap-16 mb-60">
      {step === 1 && (
        <>
          <input name="email" placeholder="Enter Email" onChange={handleChange} className="border p-2" />
          <button onClick={sendOtp} className="bg-blue-500 text-white px-4 py-2">
            Send OTP
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input name="otp" placeholder="Enter OTP" onChange={handleChange} className="border p-2" />
          <p className="text-sm text-gray-500">OTP expires in: {formatTime()}</p>
          <button onClick={verifyOtp} className="bg-green-500 text-white px-4 py-2">
            Verify OTP
          </button>
          {timer === 0 && (
            <button onClick={sendOtp} className="text-blue-500 underline">
              Resend OTP
            </button>
          )}
        </>
      )}

      {step === 3 && (
        <>
          <input type="password" name="newPassword" placeholder="New Password" onChange={handleChange} className="border p-2" />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="border p-2" />
          <button onClick={resetPassword} className="bg-purple-500 text-white px-4 py-2">
            Update Password
          </button>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
