import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Home.css";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Error loading posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to <span>Blogify</span></h1>
          <p>
            Blogify is your space to create, explore, and connect. Publish blogs with ease, 
            check other writers, discover trending topics, and build your personal reading 
            library. Whether you're journaling life moments, sharing knowledge, or exploring 
            passions — Blogify helps your voice reach the world.
          </p>
          <a href="/create" className="hero-btn">Start Writing</a>
        </div>
      </section>

      <section className="posts-section">
        <h2>Explore Latest Blogs 📰</h2>
        {loading ? (
          <p>Loading blogs...</p>
        ) : posts.length === 0 ? (
          <p className="no-posts">No blogs yet. Be the first to write!</p>
        ) : (
          <div className="posts-grid">
            {posts.map((post) => (
              <div key={post._id} className="post-card">
                <div className="post-header">
                  <h3>{post.title}</h3>
                  <p className="author">By {post.user?.name || "Unknown"}</p>
                </div>
                <p className="snippet">
                  {post.content.length > 120
                    ? post.content.slice(0, 120) + "..."
                    : post.content}
                </p>
                <div className="post-meta">
                  <p className="date">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <a href={`/posts/${post._id}`} className="read-btn">Read More</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Blogify — Share your story with the world.</p>
        <div className="footer-links">
          <a href="https://github.com/Sneha28-p" target="_blank" rel="noreferrer">GitHub</a>
          <a href="/create">Write a Blog</a>
          <a href="/myposts">My Posts</a>
        </div>
      </footer>
    </div>
  );
}
