import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Write = () => {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const placeholder = "https://placehold.co/400x250?text=Preview+Image";

  let navigate = useNavigate();

  function changeHandler(e) {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, []);

  async function submitHandler(e) {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      toast("Title and content are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);
      if (image) data.append("image", image);

      const response = await fetch('http://localhost:4000/api/v1/createBlog', {
        method: "POST",
        headers: { token },
        body: data
      });

      const result = await response.json();
      toast(result.message);
      navigate("/allblogs");
    } catch (error) {
      toast("Error creating blog");
      console.log(error);
    }
  }

  return (
    <div className='flex justify-center items-center'>
      <form
        onSubmit={submitHandler}
        className='flex flex-col gap-5 justify-center items-center mt-30 w-[650px] h-[500px] p-10 shadow-lg shadow-zinc-400 rounded-lg mb-10'
      >
        <label className='w-full px-10'>
          Title:
          <input
            className='w-full bg-zinc-200 py-2 rounded-sm'
            type="text"
            name="title"
            value={formData.title}
            onChange={changeHandler}
          />
        </label>

        <label className='w-full px-10'>
          Content:
          <textarea
            className='w-full bg-zinc-200 py-4'
            name="content"
            value={formData.content}
            onChange={changeHandler}
          />
        </label>

        <label className='w-full px-10'>
          Image:
          <input
            className='shadow-md shadow-zinc-400 px-2 py-2 rounded-sm'
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setImage(file);
                setPreview(URL.createObjectURL(file));
              }
            }}
          />
        </label>

        <img
          src={preview || placeholder}
          alt="Preview"
          className='w-40 h-40 object-cover rounded-md shadow-md'
        />

        <button
          type='submit'
          className='bg-blue-500 px-3 py-2 rounded-sm hover:bg-blue-700 hover:text-white'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Write;
