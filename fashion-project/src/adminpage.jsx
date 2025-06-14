import React, { useState } from "react";
import "./adminpage.css";

const initialData = {
  men: [
    { name: "Classic Denim Jacket", img: "", price: "" },
    { name: "Slim Fit Shirt", img: "", price: "" },
  ],
  women: [
    { name: "Floral Summer Dress", img: "", price: "" },
    { name: "Elegant Handbag", img: "", price: "" },
  ],
  accessories: [
    { name: "Wallet", img: "", price: "" },
    { name: "Sunglasses", img: "", price: "" },
  ],
};

function AdminPage() {
  const [tab, setTab] = useState("men");
  const [data, setData] = useState(initialData);
  const [form, setForm] = useState({ name: "", img: "", price: "" });
  const [editIdx, setEditIdx] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!form.name || !form.img || !form.price) return;
    setData({ ...data, [tab]: [...data[tab], form] });
    setForm({ name: "", img: "", price: "" });
  };

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setForm(data[tab][idx]);
  };

  const handleUpdate = () => {
    const updated = data[tab].map((item, idx) =>
      idx === editIdx ? form : item
    );
    setData({ ...data, [tab]: updated });
    setEditIdx(null);
    setForm({ name: "", img: "", price: "" });
  };

  const handleDelete = (idx) => {
    setData({ ...data, [tab]: data[tab].filter((_, i) => i !== idx) });
    setEditIdx(null);
    setForm({ name: "", img: "", price: "" });
  };

  return (
    <div className="admin-page-container">
      <h2 className="admin-title">Admin Panel</h2>
      <div className="admin-tabs">
        <button className={tab === "men" ? "active" : ""} onClick={() => setTab("men")}>Men</button>
        <button className={tab === "women" ? "active" : ""} onClick={() => setTab("women")}>Women</button>
        <button className={tab === "accessories" ? "active" : ""} onClick={() => setTab("accessories")}>Accessories</button>
      </div>
      <div className="admin-list">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image URL</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data[tab].map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>
                  {item.img ? (
                    <img src={item.img} alt={item.name} style={{ width: 40, height: 40 }} />
                  ) : (
                    <span style={{ color: "#aaa" }}>No Image</span>
                  )}
                </td>
                <td>{item.price}</td>
                <td>
                  <button onClick={() => handleEdit(idx)}>Edit</button>
                  <button onClick={() => handleDelete(idx)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="admin-form">
        <h3>{editIdx !== null ? "Edit Item" : "Add New Item"}</h3>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="img"
          placeholder="Image URL"
          value={form.img}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />
        {editIdx !== null ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={handleAdd}>Add</button>
        )}
        {editIdx !== null && (
          <button onClick={() => { setEditIdx(null); setForm({ name: "", img: "", price: "" }); }}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
