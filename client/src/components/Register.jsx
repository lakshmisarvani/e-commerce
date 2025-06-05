import { useState } from "react";
import { register } from "../api/auth";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError(""); setSuccess("");
    try {
      await register(form);
      setForm({ name: "", email: "", password: "" });
      setSuccess("Registration successful! Please log in.");
    } catch (err) {
      setError(err.response?.data?.message || "Error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto p-4 bg-white rounded shadow mt-8">
      <h2 className="text-xl mb-4 font-bold text-center">Register</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}
      <input name="name" placeholder="Name" value={form.name} onChange={onChange}
        className="w-full mb-2 p-2 border rounded" autoFocus required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange}
        className="w-full mb-2 p-2 border rounded" required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange}
        className="w-full mb-4 p-2 border rounded" required />
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Register</button>
    </form>
  );
}