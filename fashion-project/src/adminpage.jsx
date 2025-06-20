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
  const [form, setForm] = useState({
    name: "",
    price: "",
    img: "",
    description: "",
    image1: "",
    image2: "",
    image3: ""
  });
  const [editId, setEditId] = useState(null);

  // Fetch products for selected category
  useEffect(() => {
    fetch(`http://localhost:5000/${category}`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setProducts([]));
    setForm({
      name: "",
      price: "",
      img: "",
      description: "",
      image1: "",
      image2: "",
      image3: ""
    });
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

    const payload = {
      name: form.name,
      price: form.price,
      img: form.img,
      description: form.description,
      images: [form.image1, form.image2, form.image3].filter(Boolean),
      category
    };

    if (editId) {
      // Edit
      await fetch(`http://localhost:5000/admin/edit-product/${category}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } else {
      // Add
      await fetch("http://localhost:5000/admin/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }
    // Refresh list
    fetch(`http://localhost:5000/${category}`)
      .then(res => res.json())
      .then(data => setProducts(data));
    setForm({
      name: "",
      price: "",
      img: "",
      description: "",
      image1: "",
      image2: "",
      image3: ""
    });
    setEditId(null);
  };

  // Delete product
  const handleDelete = async id => {
    await fetch(`http://localhost:5000/admin/delete-product/${category}/${id}`, {
      method: "DELETE"
    });
    setProducts(products.filter(p => p._id !== id));
  };

  // Edit product (populate form, including detailed info)
  const handleEdit = async product => {
    // Fetch detailed info
    let detailed = {};
    try {
      const res = await fetch(`http://localhost:5000/detailed/${product._id}`);
      if (res.ok) {
        detailed = await res.json();
      }
    } catch {
      detailed = {};
    }
    setForm({
      name: product.name,
      price: product.price,
      img: product.img || product.image,
      description: detailed.description || "",
      image1: (detailed.images && detailed.images[0]) || "",
      image2: (detailed.images && detailed.images[1]) || "",
      image3: (detailed.images && detailed.images[2]) || ""
    });
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
          placeholder="Main Image URL"
          value={form.img}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          style={{ resize: "vertical" }}
        />
        <input
          name="image1"
          placeholder="Detailed Image 1 URL"
          value={form.image1}
          onChange={handleChange}
        />
        <input
          name="image2"
          placeholder="Detailed Image 2 URL"
          value={form.image2}
          onChange={handleChange}
        />
        <input
          name="image3"
          placeholder="Detailed Image 3 URL"
          value={form.image3}
          onChange={handleChange}
        />
        <button type="submit">{editId ? "Update" : "Add"} Product</button>
        {editId && <button type="button" onClick={() => {
          setForm({
            name: "",
            price: "",
            img: "",
            description: "",
            image1: "",
            image2: "",
            image3: ""
          });
          setEditId(null);
        }}>Cancel</button>}
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
