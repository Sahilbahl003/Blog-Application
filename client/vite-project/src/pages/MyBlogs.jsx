import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

const truncateText = (text, maxLength = 150) => {
  if (!text) return "";
  return text.length > maxLength
    ? text.slice(0, maxLength) + "..."
    : text;
};

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const fetchMyBlogs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(
        'http://localhost:4000/api/v1/myblogs',
        { headers: { token } }
      );

      const data = await response.json();
      if (data.success) 
          setBlogs(data.blogs);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching my blogs:", error);
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center w-[100vw] mb-7 mt-20'>
      <h1 className='text-3xl'>My Blogs</h1>

      {loading ? (
        <div className='flex justify-center items-center h-[70vh]'>
          <ClipLoader color='#2563eb' size={50} />
        </div>
      ) : blogs.length === 0 ? (
        <div className='flex justify-center items-center h-[70vh]'>
          <p className='text-xl text-green-600'>
            You haven't created any blogs yet.
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-3 gap-10 mt-4 w-[80vw]'>
          {blogs.map((blog) => ( <div key={blog._id} onClick={() =>navigate(`/myblogs/${blog._id}`, {state: { fromMyBlogs: true } })}
              className='shadow-md shadow-zinc-400 p-5 w-[400px] hover:scale-105 hover:shadow-lg hover:shadow-zinc-800 transition-all duration-300 cursor-pointer'>
              <img src={blog.image} alt={blog.title}
               className='w-full h-[200px] object-cover mb-4 rounded-md'
              />

              <h2 className='text-2xl pb-4'>{blog.title}</h2>

              <p className="text-zinc-700">
                {truncateText(blog.content)}
              </p>

              <button className="text-blue-600 font-semibold mt-2" onClick={() =>navigate(`/myblogs/${blog._id}`, {state: { fromMyBlogs: true } })}>
                Read More →
              </button>

              <p className='text-lg italic mt-2 text-zinc-600'>
                By - {blog.author?.name}
              </p>

              <p className='text-sm'>
                {new Date(blog.createdAt).toLocaleDateString('en-GB')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
