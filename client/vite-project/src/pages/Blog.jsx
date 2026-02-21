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
          {/* Blog image */}
          {blog.image && (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-[350px] object-cover rounded-md mb-2"
            />
          )}

          {/* Author + Date + Buttons + Share */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <img
                  src={blog.author?.profileImage || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt={blog.author?.name || "Author"}
                  className="w-10 h-10 rounded-full object-cover shadow-sm"
                />
                <p className="text-lg font-semibold">By {blog.author?.name || "Unknown"}</p>
              </div>
              {blog.createdAt && (
                <p className="text-zinc-600 text-sm mt-1">
                  {new Date(blog.createdAt).toLocaleDateString("en-GB")}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              {fromMyBlogs && (
                <>
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
                </>
              )}

              <button
                onClick={copyCurrentUrl}
                className="bg-blue-500 text-white px-4 py-1 rounded flex justify-center items-center gap-2 cursor-pointer"
              >
                Share <FiLink2 />
              </button>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold break-all mb-4">{blog.title}</h1>

<div
  className="prose prose-lg max-w-none break-words [overflow-wrap:anywhere] whitespace-pre-wrap"
  dangerouslySetInnerHTML={{ __html: blog.content }}
></div>

          {/* Comments Section */}
          <div className="mt-8 p-6 bg-gray-50 border border-gray-300 rounded-lg">
            <Comments blogId={id} />
          </div>
        </div>
      ) : (
        <p className="text-lg text-red-500 mt-10">Blog not found</p>
      )}
    </div>
  );
};

export default Blog;