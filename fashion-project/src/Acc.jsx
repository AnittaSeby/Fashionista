import React, { useEffect, useState } from "react";
import "./Acc.css";
import { useNavigate, useLocation } from "react-router-dom";

function Acc() {
  const [accessoriesItems, setAccessoriesItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:5000/accessories")
      .then(res => res.json())
      .then(data => setAccessoriesItems(data))
      .catch(() => setAccessoriesItems([]));
  }, []);

  // Get search query from URL
  const params = new URLSearchParams(location.search);
  const search = params.get("search")?.toLowerCase() || "";

  // Filter items by search
  const filteredItems = search
    ? accessoriesItems.filter(item =>
        item.name.toLowerCase().includes(search)
      )
    : accessoriesItems;

  const handleBuyNow = (id) => {
    navigate(`/detailed/${id}`);
  };

  return (
    <div>
      <section className="acc-hero">
        <div className="acc-hero-title">Accessories Collection</div>
        <div className="acc-hero-subtitle">
          Explore our exclusive range of accessories!
        </div>
      </section>
      <section className="acc-items">
        {filteredItems.map(item => (
          <div key={item._id || item.name} className="acc-card">
            <img src={item.img || item.image} alt={item.name} className="acc-img" />
            <div className="acc-title">{item.name}</div>
            <div className="acc-price">{item.price}</div>
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

export default Acc;
