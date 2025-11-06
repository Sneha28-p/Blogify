import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">B<span>logify</span></Link>
      </div>

      <div className="nav-right">
        {user ? (
          <>
            <span className="nav-welcome">Hii, {user.name}</span>
            <Link to="/">Home</Link>
            <Link to="/create">Create</Link>
            <Link to="/myposts">My Posts</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/auth">Login / Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
