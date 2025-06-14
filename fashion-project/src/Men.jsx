import React from "react";
import "./Men.css";

const menItems = [
  {
    name: "Classic Denim Jacket",
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=facearea&w=400&q=80",
    price: "₹2,499"
  },
  {
    name: "Slim Fit Shirt",
    img: "https://5.imimg.com/data5/IB/YL/MY-552852/men-slim-fit-shirt-500x500.jpg",
    price: "₹1,299"
  },
  {
    name: "Casual Sneakers",
    img: "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/18274390/2022/5/14/c64644f6-840f-4496-bb42-19359e9881771652523841987RoadsterMenBrownTexturedPUSneakers1.jpg",
    price: "₹1,999"
  },
  {
    name: "Formal Trousers",
    img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSXItfSRzvQU2PXImN4qb9Iy7SJ8zOcyhZ3FUi85Dv0v13lbXIqSLILt9teiFjv-DCqGaOuQ3MmwEU6jqiHNV5zwGkD6r3osFEjBmedk8WqSHdYR_cxt6KWhA",
    price: "₹1,499"
  },
  {
    name: "Leather Belt",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZnuA1PwMFsY1f25xXJCcKgKv_vvo0aQANgA&s",
    price: "₹799"
  },
  {
    name: "Sports Watch",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXXyU9ZkEG684fNMO8YSXZ1n3_RaVFPihjFA&s",
    price: "₹2,299"
  }
];

function Men() {
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
          <div key={item.name} className="men-card">
            <img src={item.img} alt={item.name} className="men-img" />
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
