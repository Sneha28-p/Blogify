import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import CreatePost from "./pages/CreatePost";
import MyPosts from "./pages/MyPosts";
import EditPost from "./pages/EditPost";
import PostDetails from "./pages/PostDetails";
import { AuthContext } from "./context/AuthContext";
import "./index.css";

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <p style={{textAlign:'center'}}>Loading...</p>;
  return user ? children : <Navigate to="/auth" replace />;
}

function GuestOnly({ children }) {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <p style={{textAlign:'center'}}>Loading...</p>;
  return user ? <Navigate to="/" replace /> : children;
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/auth"
            element={
              <GuestOnly>
                <Auth />
              </GuestOnly>
            }
          />

          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myposts"
            element={
              <ProtectedRoute>
                <MyPosts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditPost/>
              </ProtectedRoute>
            }
          />

          <Route
            path="/posts/:id"
            element={<PostDetails/>}
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
