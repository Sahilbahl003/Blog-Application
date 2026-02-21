import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/v1/allblogs");
      const data = await res.json();
      setBlogs(data.blogs?.slice(0, 3) || []);
    } catch (error) {
      console.log(error);
    }
  };

  // Only truncate titles, not HTML content
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className="relative w-[100vw] bg-black overflow-x-hidden mt-20">
      <img
        src="/bg-hero.png"
        width="100%"
        height="100%"
        className="z-[20]"
      />
      <div className="h-[100vh] w-[100vw] flex flex-col items-center justify-center text-center px-4 absolute top-[2%] left-[0%]">
        <h1 className="text-4xl md:text-5xl font-bold text-[#0A2440]">
          Create & Share Your Ideas
        </h1>

        <p className="text-lg text-[#1b3e64] mt-10 mb-8 max-w-2xl">
          Start writing blogs and express your thoughts with the world.
        </p>

        <Link
          to="/allblogs"
          className="bg-[#0A2440] text-2xl text-white px-8 py-3 rounded-lg hover:bg-[#27578a] transition mt-[50px]"
        >
          View All Blogs<span className="ml-2 w-[30px]">→</span>
        </Link>

        <div className="max-w-5xl mx-auto py-16 px-4">
          <h2 className="text-2xl font-semibold mb-4 text-center text-[#0A2440]">
            Latest Blogs
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {blogs.length === 0 ? (
              <p className="col-span-3 text-center text-gray-600">
                No blogs available.
              </p>
            ) : (
              blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-[#4f7eb0] hover:bg-[#6ca8e8] cursor-pointer text-white hover:text-[#0A2440] shadow rounded-lg p-4 hover:scale-105 hover:shadow-md hover:shadow-zinc-400 hover:transition-all hover:duration-300"
                  onClick={() => navigate(`/allblogs/${blog._id}`)}
                >
                  {/* Title with limit and ellipsis */}
                  <h3
                    className="text-lg font-semibold mb-2 break-words [overflow-wrap:anywhere] truncate"
                    style={{ maxWidth: "100%" }}
                    title={blog.title} // Tooltip on hover
                  >
                    {truncateText(blog.title, 50)}
                  </h3>

                  {/* Render HTML content preview */}
                  <div
                    className="text-sm mb-4 break-words [overflow-wrap:anywhere] prose max-w-none text-white overflow-hidden"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 5, // limit to 5 lines
                      WebkitBoxOrient: "vertical",
                    }}
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />

                  <div className="text-white hover:underline text-sm">
                    Read More →
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;