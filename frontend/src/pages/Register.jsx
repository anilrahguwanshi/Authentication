import { useState } from "react";
import api from "../apis/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register({ setLoggedIn }) {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleRegister = async (e) => {
    e.preventDefault();
    await api.post("/users/Register", form);
    setLoggedIn(true);
    nav("/profile");
  };

  return (
    <div className="h-screen flex">
      <div className="w-1/2 bg-gradient-to-b from-black to-red-900 flex items-center justify-center text-4xl font-bold text-red-500">
        Start Your Journey 🚀
      </div>

      <div className="w-1/2 flex items-center justify-center">
        <form onSubmit={handleRegister} className="cardContainer w-[450px] space-y-5">
          <h2 className="text-2xl font-bold text-red-500 text-center">Create an Account</h2>

          <input
            placeholder="Full Name"
            className="inputField"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
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

          <button className="primaryBtn text-white">Register</button>

          <p className="text-center text-gray-400">
            Already member? <Link className="text-red-500 hover:underline" to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
