import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/PostDetails.css";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`https://blogify-0z15.onrender.com/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error("Error loading post:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return <div className="post-details"><p>Loading...</p></div>;
  }

  if (!post) {
    return <div className="post-details"><p>Post not found 😢</p></div>;
  }

  return (
    <div className="post-details">
      <div className="details-container">
        <h1>{post.title}</h1>
        <p className="author">
            By {post.user?.name ?? "Anonymous"} ·{" "}
            {post.createdAt
            ? new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })
            : "Unknown Date"}
        </p>


        <div className="content">
          <p>{post.content}</p>
        </div>

        <div className="actions">
          <Link to="/" className="back-btn">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
