import React, { useEffect, useState } from "react";
import "./Acc.css";

function Acc() {
  const [accessoriesItems, setAccessoriesItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/accessories")
      .then(res => res.json())
      .then(data => setAccessoriesItems(data))
      .catch(() => setAccessoriesItems([]));
  }, []);

  return (
    <div>
      <section className="acc-hero">
        <div className="acc-hero-title">Accessories Collection</div>
        <div className="acc-hero-subtitle">
          Explore our exclusive range of accessories!
        </div>
      </section>
      <section className="acc-items">
        {accessoriesItems.map(item => (
          <div key={item._id || item.name} className="acc-card">
            <img src={item.img || item.image} alt={item.name} className="acc-img" />
            <div className="acc-title">{item.name}</div>
            <div className="acc-price">{item.price}</div>
            <button className="buy-btn">Buy Now</button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Acc;
   