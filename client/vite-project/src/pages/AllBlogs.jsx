import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

const truncateText = (text, maxLength = 150) => {
  if (!text) return "";
  return text.length > maxLength
    ? text.slice(0, maxLength) + "..."
    : text;
};

const truncateTextContent = (text, maxLength = 20) => {
  if (!text) return "";
  return text.length > maxLength
    ? text.slice(0, maxLength) + "..."
    : text;
};


const AllBlogs = () => {
  const[blogs,setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(()=>{
    fetchBlogs();
  },[]);

  const fetchBlogs=async()=>{
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
        {loading?(
          <div className='flex justify-center items-center h-[70vh]'>
            <ClipLoader color='#2563eb' size={50}/>
          </div>
        ):(  
        <div className='grid grid-cols-3 gap-10 mt-4 w-[80vw] flex-wrap justify-start '>
          {
          blogs.map((blog)=>(
            <div key={blog._id} className='shadow-md shadow-zinc-400 p-5 w-[400px] hover:scale-105 hover:shadow-lg hover:shadow-zinc-800 transition-all duration-300 cursor-pointer' onClick={() => navigate(`/allblogs/${blog._id}`)}>
            <img src={blog.image} alt={blog.title} className='w-full h-[200px] object-cover mb-4 rounded-md'/>
              <h2 className='text-2xl pb-4'>{truncateTextContent(blog.title)}</h2>
              <p className="text-zinc-700">{truncateText(blog.content)}</p>
              <button onClick={() => navigate(`/allblogs/${blog._id}`)}className="text-blue-600 font-semibold mt-2">Read More →</button>
              <p className='text-lg italic mt-2 text-zinc-600'>By-{blog.author.name}</p>
              <p className='text-sm'>{new Date(blog.createdAt).toLocaleDateString('en-GB')}</p>
            </div>
        ))}
        </div>
        )}  
    </div>
  );
}

export default AllBlogs