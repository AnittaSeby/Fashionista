import React, { useEffect, useState } from "react";
import "./Men.css";

function Men() {
  const [menItems, setMenItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/men")
      .then(res => res.json())
      .then(data => setMenItems(data))
      .catch(() => setMenItems([]));
  }, []);

  return (
    <div>
      <section className="men-hero">
        <div className="men-hero-title">Men's Collection</div>
        <div className="men-hero-subtitle">
          Explore our exclusive range of men's fashion!
        </div>
      </section>
      <section className="men-items">
        {menItems.map(item => (
          <div key={item._id || item.name} className="men-card">
            <img src={item.img || item.image} alt={item.name} className="men-img" />
            <div className="men-title">{item.name}</div>
            <div className="men-price">{item.price}</div>
            <button className="buy-btn">Buy Now</button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Men;

