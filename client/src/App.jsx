import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";

function Home() {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Welcome {user ? user.name : "Guest"}</h1>
      {user ? <Logout /> : <Link to="/login" className="text-blue-600">Login</Link>}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <nav className="flex gap-4 p-4 bg-gray-200">
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}