import React from "react";
import "./Women.css";
import { useNavigate } from "react-router-dom";

const womenItems = [
  {
    name: "Floral Summer Dress",
    img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ7xWG53T5twW-Rm3ovWHvdI25iyb9STSZHK1WWVTQuyTqEglwY7Zrj4UBXXGEWTaHWtQm2Pk4UME7cKOka3Sx4rQ8Gp8Lw8aqMUhmUPMHBb9mjKPs4_H6P",
    price: "₹1,799"
  },
  {
    name: "Elegant Handbag",
    img: "https://i.etsystatic.com/14982558/r/il/1b821b/5820063395/il_570xN.5820063395_455l.jpg",
    price: "₹2,299"
  },
  {
    name: "Stylish Heels",
    img: "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/18274390/2022/5/14/c64644f6-840f-4496-bb42-19359e9881771652523841987RoadsterMenBrownTexturedPUSneakers1.jpg",
    price: "₹1,499"
  },
  {
    name: "Denim Jacket",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaDRHvn9THJYMXPEPEu6Klt4cTyXq1C5SfwA&s",
    price: "₹2,199"
  },
  {
    name: "Printed Scarf",
    img: "https://cdn.pixelbin.io/v2/black-bread-289bfa/original/rk-part-2/410361880001/410361880001_1.jpg",
    price: "₹599"
  },
  {
    name: "Classic Sunglasses",
    img: "https://shadesworld.in/wp-content/uploads/2023/05/black-aviator-classic-sunglasses-for-men-and-women-front-center-view.png",
    price: "₹1,299"
  }
];

function Women() {
  const navigate = useNavigate();

  return (
    <div>
      <section className="women-hero">
        <div className="women-hero-title">Women's Collection</div>
        <div className="women-hero-subtitle">
          Explore our exclusive range of women's fashion!
        </div>
      </section>
      <section className="women-items">
        {womenItems.map(item => (
          <div key={item.name} className="women-card">
            <img src={item.img} alt={item.name} className="women-img" />
            <div className="women-title">{item.name}</div>
            <div className="women-price">{item.price}</div>
            <button className="buy-btn">Buy Now</button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Women;

