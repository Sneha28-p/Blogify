import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setMessage("");
    setFormData({ name: "", email: "", password: "" });
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    try {
      if (isLogin) {
        const res = await axios.post("http://localhost:5000/api/users/login", { email, password });
        login(res.data.user, res.data.token);
        navigate("/", { replace: true });
      } else {
        await axios.post("http://localhost:5000/api/users/register", { name, email, password });
        setMessage("Registration successful! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>{isLogin ? "Welcome Back" : "Create an Account"}</h2>
        <p>{isLogin ? "Login to Blogify" : "Join Blogify — it's free"}</p>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="input-group">
              <label>Name</label>
              <input name="name" value={formData.name} onChange={handleChange} required />
            </div>
          )}

          <div className="input-group">
            <label>Email</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input name="password" type="password" value={formData.password} onChange={handleChange} required />
          </div>

          <button className="auth-btn" type="submit">{isLogin ? "Login" : "Register"}</button>
          {message && <p className="auth-msg">{message}</p>}
        </form>

        <div className="switch">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button type="button" onClick={toggleMode} className="switch-btn">
              {isLogin ? " Register" : " Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
