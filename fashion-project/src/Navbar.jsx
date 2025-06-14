import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const val = search.trim().toLowerCase();
      if (
        val === "women" ||
        val.includes("women") ||
        val.includes("lady") ||
        val.includes("girl")
      ) {
        navigate("/women");
      } else if (val === "men" || (val.includes("men") && !val.includes("women"))) {
        navigate("/men");
      } else if (
        val === "accessories" ||
        val === "accessory" ||
        val.includes("accessor") ||
        val.includes("bag") ||
        val.includes("watch") ||
        val.includes("wallet") ||
        val.includes("sunglass") ||
        val.includes("ornament")
      ) {
        navigate("/accessories");
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="nav-btn" onClick={() => navigate("/")}>Home</button>
        <button className="nav-btn" onClick={() => navigate("/men")}>Men</button>
        <button className="nav-btn" onClick={() => navigate("/women")}>Women</button>
        <button className="nav-btn" onClick={() => navigate("/accessories")}>Accessories</button>
      </div>
      <div className="navbar-right">
        <input
          className="nav-search"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={handleSearch}
        />
        <button
          className="nav-btn"
          style={{ marginLeft: "18px" }}
          onClick={() => navigate("/login")}
        >
          Sign In
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
