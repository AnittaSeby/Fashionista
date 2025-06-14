import React, { useState } from "react";
import "./adminpage.css";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!username || !password) {
      setMsg("Please enter both username and password.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/adminlogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("Admin login successful!");
        navigate("/admin");
      } else {
        setMsg(data.msg || "Invalid admin credentials.");
      }
    } catch (err) {
      setMsg("Server error. Please try again.");
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-box" onSubmit={handleSubmit}>
        <h2 className="admin-login-title">Admin Login</h2>
        <input
          className="admin-login-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="admin-login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="admin-login-btn" type="submit">Login</button>
        {msg && <div className="admin-login-msg">{msg}</div>}
      </form>
    </div>
  );
}

export default AdminLogin;
