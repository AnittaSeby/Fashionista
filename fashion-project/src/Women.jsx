import React, { useEffect, useState } from "react";
import "./Women.css";
import { useNavigate, useLocation } from "react-router-dom";

function Women() {
  const [womenItems, setWomenItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:5000/women")
      .then(res => res.json())
      .then(data => setWomenItems(data))
      .catch(() => setWomenItems([]));
  }, []);

  // Get search query from URL
  const params = new URLSearchParams(location.search);
  const search = params.get("search")?.toLowerCase() || "";

  // Filter items by search
  const filteredItems = search
    ? womenItems.filter(item =>
        item.name.toLowerCase().includes(search)
      )
    : womenItems;

  const handleBuyNow = (id) => {
    navigate(`/detailed/${id}`);
  };

  return (
    <div>
      <section className="women-hero">
        <div className="women-hero-title">Women's Collection</div>
        <div className="women-hero-subtitle">
          Explore our exclusive range of women's fashion!
        </div>
      </section>
      <section className="women-items">
        {filteredItems.map(item => (
          <div key={item._id || item.name} className="women-card">
            <img src={item.img || item.image} alt={item.name} className="women-img" />
            <div className="women-title">{item.name}</div>
            <div className="women-price">{item.price}</div>
            <button className="buy-btn" onClick={() => handleBuyNow(item._id)}>Show More</button>
          </div>
        ))}
        {filteredItems.length === 0 && (
          <div className="no-results">No products found.</div>
        )}
      </section>
    </div>
  );
}

export default Women;

