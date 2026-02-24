import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:4000/api/v1/allblogs');
      const data = await response.json();
      setBlogs(data.blogs);
      setLoading(false);
    } catch (error) {
      console.error("error fetching blogs:", error);
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center w-[100vw] mt-25 mb-5'>
      <h1 className='text-3xl'>All Blogs</h1>

      {loading ? (
        <div className='flex justify-center items-center h-[70vh]'>
          <ClipLoader color='#2563eb' size={50}/>
        </div>
      ) : (
        <div className='grid grid-cols-3 gap-10 mt-4 w-[80vw] flex-wrap justify-start'>
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className='shadow-md shadow-zinc-400 p-5 w-[400px] hover:scale-105 hover:shadow-lg hover:shadow-zinc-800 transition-all duration-300 cursor-pointer'
              onClick={() => navigate(`/allblogs/${blog._id}`)}
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className='w-full h-[200px] object-cover mb-4 rounded-md'
                />
              )}

              <h2 className='text-2xl pb-4 break-words [overflow-wrap:anywhere]'>
                {blog.title}
              </h2>

             
              <div
                className="prose max-w-none text-zinc-700 overflow-hidden"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 5, 
                  WebkitBoxOrient: "vertical",
                }}
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              <button
                onClick={() => navigate(`/allblogs/${blog._id}`)}
                className="text-blue-600 font-semibold mt-2 cursor-pointer"
              >
                Read More →
              </button>

              <div className='flex items-center gap-2 mt-2'>
                <img
                  src={blog.author.profileImage || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt={blog.author.name}
                  className='w-10 h-10 rounded-full object-cover'
                />
                <p className='text-lg italic text-zinc-600'>
                  By-{blog.author.name}
                </p>
              </div>

              <p className='text-sm mt-1'>
                {new Date(blog.createdAt).toLocaleDateString('en-GB')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllBlogs;