import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check login state from localStorage
    setIsLoggedIn(!!localStorage.getItem("isLoggedIn"));
  }, [location]);

  // Real-time search handler
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    const path = location.pathname;
    if (path.includes("/men")) {
      navigate(`/men?search=${encodeURIComponent(value)}`);
    } else if (path.includes("/women")) {
      navigate(`/women?search=${encodeURIComponent(value)}`);
    } else if (path.includes("/accessories")) {
      navigate(`/accessories?search=${encodeURIComponent(value)}`);
    }
  };

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  // Only show search bar on men, women, or accessories pages
  const showSearch =
    location.pathname.startsWith("/men") ||
    location.pathname.startsWith("/women") ||
    location.pathname.startsWith("/accessories");

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="nav-btn" onClick={() => navigate("/")}>Home</button>
        <button className="nav-btn" onClick={() => navigate("/men")}>Men</button>
        <button className="nav-btn" onClick={() => navigate("/women")}>Women</button>
        <button className="nav-btn" onClick={() => navigate("/accessories")}>Accessories</button>
      </div>
      <div className="navbar-right">
        {showSearch && (
          <div className="navbar-search-form">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={handleSearchChange}
              className="navbar-search-input"
            />
          </div>
        )}
        <button
          className="nav-btn"
          style={{ marginLeft: "18px" }}
          onClick={handleLoginLogout}
        >
          {isLoggedIn ? "Logout" : "Sign in"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

