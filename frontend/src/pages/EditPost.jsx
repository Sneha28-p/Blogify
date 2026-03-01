import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/EditPost.css";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`https://blogify-0z15.onrender.com/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const post=res.data;
        setTitle(post.title);
        setContent(post.content);
      })
      .catch((err) => {
        setMessage(
          err.response?.data?.message||
          err.response?.data?.error||
          "Failed to load post"
        );
      });

  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://blogify-0z15.onrender.com/api/posts/${id}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/myposts");
    } catch (err) {
      setMessage("Error updating post");
    }
  };

  return (
    <div className="edit-page">
      <div className="edit-card">
        <h2>Edit Post</h2>
        <form onSubmit={handleSubmit} className="edit-form">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Content</label>
          <textarea
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>

          <button type="submit" className="save-btn">Save Changes</button>
          {message && <p className="msg">{message}</p>}
        </form>
      </div>
    </div>
  );
}
