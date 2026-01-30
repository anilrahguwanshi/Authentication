import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "./apis/api";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    api.get("/profile/profile")
      .then(() => setLoggedIn(true))
      .catch(() => setLoggedIn(false));
  }, []);

  if (loggedIn === null) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-400 text-xl">
        Checking authentication...
      </div>
    );
  }

  return (
    <div>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

      <Routes>
        <Route path="/" element={<Navigate to={loggedIn ? "/profile" : "/login"} />} />
        <Route path="/login" element={!loggedIn ? <Login setLoggedIn={setLoggedIn} /> : <Navigate to="/profile" />} />
        <Route path="/register" element={!loggedIn ? <Register setLoggedIn={setLoggedIn} /> : <Navigate to="/profile" />} />
        <Route path="/profile" element={loggedIn ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}
