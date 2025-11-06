import { useState } from "react";
import axios from "axios";
import "../styles/CreatePost.css";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/posts",
        { title, content },
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 3000,
        }
      );
      setMessage("Post created successfully!");
      setTitle("");
      setContent("");
    } catch (err) {
      console.error(err);
      setMessage("Error creating post. Try again.");
    }
  };

  return (
    <div className="create-page">
      <div className="create-card">
        <h2>Create a New Blog</h2>
        <p className="create-subtitle">Write, express, and inspire others </p>

        <form onSubmit={handleSubmit} className="create-form">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your post a catchy title..."
            required
          />

          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your blog content here..."
            required
          ></textarea>

          <button type="submit" className="create-btn">
            Publish Post
          </button>
        </form>

        {message && <p className="create-msg">{message}</p>}
      </div>
    </div>
  );
}
