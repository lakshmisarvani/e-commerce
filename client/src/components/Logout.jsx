import { logout } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate("/login");
  };

  return (
    <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={handleLogout}>
      Logout
    </button>
  );
}