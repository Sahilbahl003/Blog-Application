import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import LogoutModal from "./logoutModal";

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [errors, setErrors] = useState({});

  const profilePlaceholder = "https://placehold.co/200x200?text=Profile";

  useEffect(() => {
    if (!token) return navigate("/login");

    fetch("http://localhost:4000/api/v1/profile", {
      headers: { token },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setName(data.user.name);
      });
  }, []);

  const updateProfile = async () => {
    if (errors.image || loading) return;

    setLoading(true);

    const form = new FormData();
    form.append("name", name);
    if (image) form.append("image", image);

    try {
      const res = await fetch("http://localhost:4000/api/v1/updateProfile", {
        method: "PUT",
        headers: { token },
        body: form,
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        return toast.error(data.message);
      }

      toast.success("Profile updated");
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  const confirmLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const handleImageChange = (file) => {
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        image: "Only JPG, JPEG and PNG formats are allowed",
      }));
      setImage(null);
      return;
    }

    setErrors((prev) => ({ ...prev, image: "" }));
    setImage(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setErrors((prev) => ({ ...prev, image: "" }));
  };

  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white shadow-xl px-8 py-6 w-[420px] rounded-xl flex flex-col gap-5">
        <h2 className="text-2xl font-bold text-center text-blue-500">
          Your Profile
        </h2>

        <div className="flex flex-col items-center gap-3">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.profileImage || profilePlaceholder
            }
            className="w-24 h-24 rounded-full object-cover shadow-md cursor-pointer hover:scale-105 transition"
            onClick={() => setShowPreview(true)}
          />

          <div className="flex gap-3">
            <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition text-sm">
              Upload Profile
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  handleImageChange(file);
                }}
              />
            </label>

            {image && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition text-sm"
              >
                Remove Profile
              </button>
            )}
          </div>

          {errors.image && (
            <p className="text-red-600 text-xs">{errors.image}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow-sm px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          onClick={updateProfile}
          disabled={loading}
          className={`${
            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded-md h-10 transition flex justify-center items-center gap-2`}
        >
          {loading && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
          {loading ? "Saving..." : "Save Changes"}
        </button>

        <button
          onClick={() => navigate("/change-password")}
          className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-md h-10 transition"
        >
          Change Password
        </button>

        <button
          onClick={() => setShowLogoutModal(true)}
          className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-md h-10 transition"
        >
          Logout
        </button>
      </div>

      {showPreview && (
        <div
          className="fixed inset-0 bg-zinc-500 bg-opacity-70 flex justify-center items-center"
          onClick={() => setShowPreview(false)}
        >
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.profileImage || profilePlaceholder
            }
            className="w-80 h-80 rounded-lg object-cover"
          />
          <div
            className="text-zinc-200 pb-90 cursor-pointer"
            onClick={() => setShowPreview(false)}
          >
            <RxCross1 className="w-6 h-6" />
          </div>
        </div>
      )}

      {showLogoutModal && (
        <LogoutModal
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={confirmLogout}
        />
      )}
    </div>
  );
};

export default Profile;