import React, { useEffect, useState } from "react";
import "./adminpage.css";

const categories = [
  { label: "Men", value: "men" },
  { label: "Women", value: "women" },
  { label: "Accessories", value: "accessories" }
];

function AdminPage() {
  const [category, setCategory] = useState("men");
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", img: "" });
  const [editId, setEditId] = useState(null);

  // Fetch products for selected category
  useEffect(() => {
    fetch(`http://localhost:5000/${category}`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setProducts([]));
    setForm({ name: "", price: "", img: "" });
    setEditId(null);
  }, [category]);

  // Handle form input
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update product
  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.price || !form.img) return;

    if (editId) {
      // Edit
      await fetch(`http://localhost:5000/admin/edit-product/${category}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
    } else {
      // Add
      await fetch("http://localhost:5000/admin/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, category })
      });
    }
    // Refresh list
    fetch(`http://localhost:5000/${category}`)
      .then(res => res.json())
      .then(data => setProducts(data));
    setForm({ name: "", price: "", img: "" });
    setEditId(null);
  };

  // Delete product
  const handleDelete = async id => {
    await fetch(`http://localhost:5000/admin/delete-product/${category}/${id}`, {
      method: "DELETE"
    });
    setProducts(products.filter(p => p._id !== id));
  };

  // Edit product (populate form)
  const handleEdit = product => {
    setForm({ name: product.name, price: product.price, img: product.img || product.image });
    setEditId(product._id);
  };

  return (
    <div className="admin-page-container">
      <h2 className="admin-title">Admin Product Management</h2>
      <div>
        <label>Category: </label>
        <select value={category} onChange={e => setCategory(e.target.value)}>
          {categories.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          name="img"
          placeholder="Image URL"
          value={form.img}
          onChange={handleChange}
          required
        />
        <button type="submit">{editId ? "Update" : "Add"} Product</button>
        {editId && <button type="button" onClick={() => { setForm({ name: "", price: "", img: "" }); setEditId(null); }}>Cancel</button>}
      </form>
      <div className="admin-list">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>
                  <img src={p.img || p.image} alt={p.name} style={{ width: 60 }} />
                </td>
                <td>
                  <button onClick={() => handleEdit(p)}>Edit</button>
                  <button onClick={() => handleDelete(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPage;
