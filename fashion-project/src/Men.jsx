import React, { useEffect, useState } from "react";
import "./Men.css";
import { useNavigate, useLocation } from "react-router-dom";

function Men() {
  const [menItems, setMenItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:5000/men")
      .then(res => res.json())
      .then(data => setMenItems(data))
      .catch(() => setMenItems([]));
  }, []);

  // Get search query from URL
  const params = new URLSearchParams(location.search);
  const search = params.get("search")?.toLowerCase() || "";

  // Filter items by search
  const filteredItems = search
    ? menItems.filter(item =>
        item.name.toLowerCase().includes(search)
      )
    : menItems;

  const handleBuyNow = (id) => {
    navigate(`/detailed/${id}`);
  };

  return (
    <div>
      <section className="men-hero">
        <div className="men-hero-title">Men's Collection</div>
        <div className="men-hero-subtitle">
          Explore our exclusive range of men's fashion!
        </div>
      </section>
      <section className="men-items">
        {filteredItems.map(item => (
          <div key={item._id || item.name} className="men-card">
            <img src={item.img || item.image} alt={item.name} className="men-img" />
            <div className="men-title">{item.name}</div>
            <div className="men-price">{item.price}</div>
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

export default Men;

