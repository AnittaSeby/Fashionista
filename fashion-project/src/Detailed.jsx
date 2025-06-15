import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Detailed.css";

function Detailed() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/detailed/${id}`)
      .then(res => res.json())
      .then(data => setItem(data))
      .catch(() => setItem(null));
  }, [id]);

  if (!item) return <div>Loading...</div>;

  return (
    <div className="detailed-container">
      <h2>{item.name}</h2>
      <div className="detailed-images">
        {item.images && item.images.map((img, idx) => (
          <img key={idx} src={img} alt={`${item.name} ${idx + 1}`} className="detailed-img" />
        ))}
      </div>
      <div className="detailed-description">{item.description}</div>
      <div className="detailed-price">{item.price}</div>
      <button className="detailed-buy-btn">Buy Now</button>
    </div>
  );
}

export default Detailed;

