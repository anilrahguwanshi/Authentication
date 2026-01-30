import { Link, useNavigate } from "react-router-dom";
import api from "../apis/api";

export default function Navbar({ loggedIn, setLoggedIn }) {
  const nav = useNavigate();

  const handleLogout = async () => {
    await api.post("/users/Logout");
    setLoggedIn(false);
    nav("/login");
  };

  return (
    <div className="flex justify-between items-center px-12 py-4 border-b border-red-900 bg-[#0f0f0f]">
      <h1 className="text-2xl font-bold text-red-500 tracking-wider">EDU-AUTH</h1>

      <div className="space-x-6 text-gray-400 text-lg">
        {!loggedIn ? (
          <>
            <Link to="/login" className="hover:text-red-500">Login</Link>
            <Link to="/register" className="hover:text-red-500">Register</Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="hover:text-red-400">Profile</Link>
            <button onClick={handleLogout} className="hover:text-red-400">Logout</button>
          </>
        )}
      </div>
    </div>
  );
}
