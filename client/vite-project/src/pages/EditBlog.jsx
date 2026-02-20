import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    const response = await fetch(
      `http://localhost:4000/api/v1/allblogs/${id}`
    );
    const data = await response.json();

    if (data.blog) {
      setTitle(data.blog.title);
      setContent(data.blog.content);
      setImage(data.blog.image);
    }
  };

  const handleUpdate = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);

  if (image) {
    formData.append("image", image);
  }

  const response = await fetch(
    `http://localhost:4000/api/v1/updateblog/${id}`,
    {
      method: "PUT",
      headers: {
        token,
      },
      body: formData,
    }
  );

  const data = await response.json();

  if (data.success) {
    alert("Blog updated successfully");
    navigate("/myblogs");
  } else {
    alert(data.message);
  }
};


  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleUpdate}
        className="flex flex-col gap-4 w-[400px]"
      >
        <h1 className="text-2xl font-bold">Edit Blog</h1>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border p-2"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="border p-2"
        />

        <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="border p-2"
        />


        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
