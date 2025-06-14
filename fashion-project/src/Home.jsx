import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "Men",
    img: "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/14582818/2024/6/8/ddf8646d-b33b-4cfc-8c47-b00d7a002a221717819948985-Voyage-Unisex-Black-Lens-Oval-Sunglasses-with-UV-Protected-L-1.jpg",
    desc: "Trendy menswear for every occasion.",
    link: "/men",
  },
  {
    title: "Women",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy1TSXWrbsAr07EEEmnXhbxPP2QMFfqESuqg&s",
    desc: "Elegant styles for modern women.",
    link: "/women",
  },
  {
    title: "Accessories",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLjHOY0lpLXfGR3AYxbLJuYq4hK0v0G2Vn_g&s",
    desc: "Complete your look with chic accessories.",
    link: "/accessories",
  },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <section className="hero">
        <div className="hero-title">FASHIONISTA</div>
        <div className="hero-subtitle">
          Discover the latest trends in fashion and elevate your style.
          <br />
          Shop exclusive collections for men, women, and more!
        </div>
        <button className="cta-btn">Shop Now</button>
      </section>
      <section className="categories">
        {categories.map((cat) => (
          <div
            key={cat.title}
            className="category-card"
            onClick={() => cat.link && navigate(cat.link)}
            style={cat.link ? { cursor: "pointer" } : {}}
          >
            <img src={cat.img} alt={cat.title} className="category-img" />
            <div className="category-title">{cat.title}</div>
            <div className="category-desc">{cat.desc}</div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Home;
