import { useEffect, useState } from "react";

const Comments = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [showAll, setShowAll] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/v1/comments/${blogId}`);
      const data = await res.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddComment = async () => {
    if (!text) return;

    try {
      const res = await fetch(`http://localhost:4000/api/v1/comments/${blogId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (res.ok) {
        setComments([data.comment, ...comments]);
        setText("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const commentsToShow = showAll ? comments : comments.slice(0, 3);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>

      {token && (
        <div className="mb-6 flex gap-2">
          <input
            type="text"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border p-2 flex-1 rounded"
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-500 text-white px-4 rounded"
          >
            Add
          </button>
        </div>
      )}

      {!token && <p className="text-red-500 mb-4">Login to add a comment</p>}

      {comments.length === 0 && <p>No comments yet.</p>}

      {commentsToShow.map((c) => (
        <div
          key={c._id}
          className="mb-4 p-3 bg-gray-100 rounded flex gap-3 items-start break-words"
          style={{ wordBreak: "break-word" }}
        >
          <img
            src={c.user?.profileImage || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt={c.user?.name || "User"}
            className="w-10 h-10 rounded-full object-cover shadow-sm"
          />
          <div className="flex-1">
            <p className="font-semibold">{c.user?.name || "User"}</p>
            <p
              className="whitespace-pre-wrap break-words"
              style={{ wordBreak: "break-word" }}
            >
              {c.text}
            </p>
            <small className="text-gray-500">
              {new Date(c.createdAt).toLocaleDateString("en-GB")}
            </small>
          </div>
        </div>
      ))}

      {comments.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-blue-600 font-semibold mt-2"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default Comments;