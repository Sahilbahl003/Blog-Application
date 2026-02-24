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

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className="relative w-[100vw] bg-black overflow-x-hidden mt-20">
      <img src="/bg-hero.png" className="z-[20] w-full h-[900px]" />

      <div className="h-[100vh] w-[100vw] flex flex-col items-center justify-center text-center px-4 absolute mt-[100px] top-[2%] left-[0%]">
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
          View All Blogs →
        </Link>

        <div className="max-w-6xl mx-auto py-16 px-4">
          <h2 className="text-2xl font-semibold mb-8 text-center text-[#0A2440]">
            Latest Blogs
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {blogs.length === 0 ? (
              <p className="col-span-3 text-center text-gray-600">
                No blogs available.
              </p>
            ) : (
              blogs.map((blog) => (
                <div
                  key={blog._id}
                  onClick={() => navigate(`/allblogs/${blog._id}`)}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                >
                  
                  <div className="h-44 w-full overflow-hidden">
                    <img
                      src={blog.image || "/default-blog.jpg"}
                      alt="blog"
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>

                 
                  <div className="p-5 text-left">
                    <h3
                      className="text-lg font-semibold text-[#0A2440] mb-2 break-words"
                      title={blog.title}
                    >
                      {truncateText(blog.title, 55)}
                    </h3>

                    <div
                      className="text-sm text-gray-600 mb-4 overflow-hidden"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                      }}
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    <div className="text-[#0A2440] font-medium group-hover:underline">
                      Read More →
                    </div>
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