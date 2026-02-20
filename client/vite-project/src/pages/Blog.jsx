import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Comments from "../components/Comments";
import { toast } from "react-toastify";
import { FiLink2 } from "react-icons/fi";

const Blog = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const fromMyBlogs = location.state?.fromMyBlogs;

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:4000/api/v1/allblogs/${id}`,
        { headers: { token } }
      );
      const data = await response.json();
      setBlog(data.blog);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const deleteBlog = async () => {
    const confirmDelete = window.confirm("Delete this blog?");
    if (!confirmDelete) return;

    const res = await fetch(
      `http://localhost:4000/api/v1/deleteblog/${id}`,
      { method: "DELETE", headers: { token } }
    );

    const data = await res.json();
    toast.success(data.message || "Blog deleted");
    navigate("/myblogs");
  };

  const copyCurrentUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="flex justify-center w-full px-4 mt-20 mb-10">
      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <ClipLoader color="#2563eb" size={50} />
        </div>
      ) : blog ? (
        <div className="w-full max-w-5xl mt-6 shadow-md shadow-zinc-400 p-6 rounded-lg bg-white">
          {blog.image && (
            <>
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-[350px] object-cover rounded-md mb-2"
              />
              <p className="text-start font-semibold text-lg mb-4">
                -By {blog.author?.name || "Unknown"}
              </p>
            </>
          )}

          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">{blog.title}</h1>
            <button
              onClick={copyCurrentUrl}
              className="bg-blue-500 text-white px-4 py-1 rounded flex justify-center items-center gap-2 cursor-pointer"
            >
              Share <FiLink2 />
            </button>
          </div>

          {fromMyBlogs && (
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => navigate(`/editblog/${blog._id}`)}
                className="bg-green-500 text-white px-4 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={deleteBlog}
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          )}

          <p className="text-lg leading-relaxed text-zinc-800">
            {blog.content}
          </p>

          <div className="mt-4 text-zinc-600 text-sm">
            {blog.createdAt &&
              new Date(blog.createdAt).toLocaleDateString("en-GB")}
          </div>

          <Comments blogId={id} />
        </div>
      ) : (
        <p className="text-lg text-red-500 mt-10">Blog not found</p>
      )}
    </div>
  );
};

export default Blog;