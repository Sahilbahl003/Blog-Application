import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const Editor = ({ value, onChange }) => {
  const { quill, quillRef } = useQuill({
    theme: "snow",
    placeholder: "Write your content here...",
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
    },
  });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        onChange(quill.root.innerHTML);
      });
    }
  }, [quill]);

  return <div ref={quillRef} className="h-60 border rounded-md overflow-hidden" />;
};

const Write = () => {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);

  const navigate = useNavigate();
  const defaultCover = "https://placehold.net/800x600.png";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, []);

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (file) => {
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      setErrors({ image: "Only JPG, JPEG, and PNG are allowed" });
      setImage(null);
      return;
    }

    setErrors({ ...errors, image: "" });
    setImage(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setErrors({ ...errors, image: "" });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      toast.error("Title and content are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);

      if (image) {
        data.append("image", image);
      } else {
        data.append("defaultImage", defaultCover);
      }

      const response = await fetch("http://localhost:4000/api/v1/createBlog", {
        method: "POST",
        headers: { token },
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to create blog");
        return;
      }

      toast.success(result.message || "Blog created");
      navigate("/allblogs");
    } catch (error) {
      toast.error("Error creating blog");
      console.log(error);
    }
  };

  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={submitHandler}
        className="bg-white shadow-xl p-8 w-[650px] rounded-xl flex flex-col gap-6 mt-20 mb-20"
      >
        <h2 className="text-2xl font-bold text-center text-blue-500">
          Write a Blog
        </h2>

        <div className="flex flex-col items-center gap-3">
          {image && (
            <img
              src={URL.createObjectURL(image)}
              className="w-80 h-52 object-cover rounded-md shadow-md cursor-pointer"
              onClick={() => setShowPreview(true)}
            />
          )}

          <div className="flex gap-3">
            <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition text-sm">
              Add Cover Image
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => handleImageChange(e.target.files[0])}
              />
            </label>

            {image && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition text-sm cursor-pointer"
              >
                Remove
              </button>
            )}
          </div>

          {errors.image && (
            <p className="text-red-600 text-xs">{errors.image}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={changeHandler}
            className="shadow-sm px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
            maxLength={100}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Content</label>
          <Editor
            value={formData.content}
            onChange={(content) =>
              setFormData((prev) => ({ ...prev, content }))
            }
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-md h-10 transition cursor-pointer"
        >
          Submit Blog
        </button>
      </form>

      {showPreview && image && (
        <div
          className="fixed inset-0 bg-zinc-500 bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setShowPreview(false)}
        >
          <img
            src={URL.createObjectURL(image)}
            className="max-w-[90vw] max-h-[90vh] rounded-lg object-contain"
          />
          <div
            className="absolute top-5 right-5 text-white cursor-pointer"
            onClick={() => setShowPreview(false)}
          >
            <RxCross1 className="w-6 h-6" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Write;