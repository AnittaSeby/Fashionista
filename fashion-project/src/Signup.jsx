import React, { useState } from "react";
import "./Login.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!email || !password || !confirm) {
      setMsg("Please fill all fields.");
    } else if (password !== confirm) {
      setMsg("Passwords do not match.");
    } else {
      try {
        const res = await fetch("http://localhost:5000/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (res.ok) {
          setMsg("Signup successful!");
          setEmail("");
          setPassword("");
          setConfirm("");
        } else {
          setMsg(data.msg || "Signup failed.");
        }
      } catch (err) {
        setMsg("Server error. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2 className="login-title">Sign Up for Fashionista</h2>
        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
        />
        <button className="login-btn" type="submit">Sign Up</button>
        <div className="login-link">
          Already have an account? <a href="/login">Sign In</a>
        </div>
        {msg && <div className="login-msg">{msg}</div>}
      </form>
    </div>
  );
}

export default Signup;
