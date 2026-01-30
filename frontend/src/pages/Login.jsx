import { useState } from "react";
import api from "../apis/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setLoggedIn }) {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    await api.post("/users/Login", form);
    setLoggedIn(true);
    nav("/profile");
  };

  return (
    <div className="h-screen flex">
      <div className="w-1/2 bg-gradient-to-b from-red-900 to-black flex items-center justify-center text-4xl font-bold text-red-500">
        Welcome Back 🔥
      </div>

      <div className="w-1/2 flex items-center justify-center">
        <form onSubmit={handleLogin} className="cardContainer w-[450px] space-y-5">
          <h2 className="text-2xl font-bold text-red-500 text-center">Login to Your Account</h2>

          <input
            placeholder="Email"
            className="inputField"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="inputField"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="primaryBtn text-white">Login</button>

          <p className="text-center text-gray-400">
            New here? <Link className="text-red-500 hover:underline" to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
