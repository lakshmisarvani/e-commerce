import { useState } from "react";
import { login } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { setUser } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      const res = await login(form);
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto p-4 bg-white rounded shadow mt-8">
      <h2 className="text-xl mb-4 font-bold text-center">Login</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange}
        className="w-full mb-2 p-2 border rounded" required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange}
        className="w-full mb-4 p-2 border rounded" required />
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
    </form>
  );
}