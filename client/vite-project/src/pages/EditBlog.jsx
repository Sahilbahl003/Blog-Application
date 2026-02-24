import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { toast } from "react-toastify";

const Editor = ({ value, onChange }) => {
  const { quill, quillRef } = useQuill({
    theme: "snow",
    placeholder: "Write your content here...",
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        ["clean"],
      ],
    },
  });

  const initialLoad = useRef(false);

  useEffect(() => {
    if (!quill) return;

    if (value && !initialLoad.current) {
      quill.clipboard.dangerouslyPasteHTML(value);
      initialLoad.current = true;
    }

    const handler = () => {
      onChange(quill.root.innerHTML);
    };

    quill.on("text-change", handler);
    return () => quill.off("text-change", handler);
  }, [quill, value]);

  return <div ref={quillRef} className="h-60 border rounded-md overflow-hidden" />;
};

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ title: "", content: "" });
  const [image, setImage] = useState(null);
  const [removedImage, setRemovedImage] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/v1/allblogs/${id}`);
        const data = await res.json();

        if (data.blog) {
          setFormData({
            title: data.blog.title || "",
            content: data.blog.content || "",
          });
          setImage(data.blog.image || null);
        }
      } catch {
        toast.error("Error fetching blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (file) => {
    if (!file) return;
    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowed.includes(file.type)) {
      setErrors({ image: "Only JPG, JPEG, PNG allowed" });
      return;
    }
    setErrors({});
    setRemovedImage(false);
    setImage(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setRemovedImage(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Title and content required");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);

      if (removedImage) data.append("removeImage", "true");
      if (image && typeof image !== "string") data.append("image", image);

      const res = await fetch(`http://localhost:4000/api/v1/updateblog/${id}`, {
        method: "PUT",
        headers: { token },
        body: data,
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Updated successfully");
        navigate("/myblogs");
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleUpdate}
        className="bg-white shadow-xl p-8 w-[650px] rounded-xl flex flex-col gap-6 mt-20 mb-20"
      >
        <h2 className="text-2xl font-bold text-center text-blue-500">Edit Blog</h2>

        <div className="flex flex-col items-center gap-3">
          {image && (
            <img
              src={typeof image === "string" ? image : URL.createObjectURL(image)}
              className="w-80 h-52 object-cover rounded-md shadow-md cursor-pointer"
              onClick={() => setShowPreview(true)}
            />
          )}

          <div className="flex gap-3">
            <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md">
              {image ? "Change Image" : "Add Image"}
              <input
                type="file"
                hidden
                onChange={(e) => handleImageChange(e.target.files[0])}
              />
            </label>

            {image && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
              >
                Remove
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={changeHandler}
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Content</label>
          <Editor
            value={formData.content}
            onChange={(content) =>
              setFormData((prev) => ({ ...prev, content }))
            }
          />
        </div>

        <button className="bg-blue-500 text-white py-2 rounded-md cursor-pointer">
          Update Blog
        </button>
      </form>

      {showPreview && image && (
        <div
          className="fixed inset-0 bg-black/60 flex justify-center items-center"
          onClick={() => setShowPreview(false)}
        >
          <img
            src={typeof image === "string" ? image : URL.createObjectURL(image)}
            className="max-w-[90vw] max-h-[90vh] rounded-lg"
          />
          <RxCross1
            className="absolute top-5 right-5 text-white text-xl"
            onClick={() => setShowPreview(false)}
          />
        </div>
      )}
    </div>
  );
};

export default EditBlog;