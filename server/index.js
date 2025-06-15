const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const uri = 'mongodb://localhost:27017'; // Change if your MongoDB is remote
const client = new MongoClient(uri);
const dbName = 'fashionstore';

async function connectDB() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
  return client.db(dbName);
}

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ msg: 'Missing fields' });

  const db = await connectDB();
  const users = db.collection('users');
  const existing = await users.findOne({ email });
  if (existing) return res.status(409).json({ msg: 'User already exists' });

  const hash = await bcrypt.hash(password, 10);
  await users.insertOne({ email, password: hash });
  res.json({ msg: 'Signup successful' });
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ msg: 'Missing fields' });

  const db = await connectDB();
  const users = db.collection('users');
  const user = await users.findOne({ email });
  if (!user) return res.status(401).json({ msg: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ msg: 'Invalid credentials' });

  res.json({ msg: 'Login successful' });
});

// Admin login endpoint (plain text password)
app.post('/adminlogin', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ msg: 'Missing fields' });

  const db = await connectDB();
  const admins = db.collection('adminlogin');
  const admin = await admins.findOne({ username, password });
  if (!admin)
    return res.status(401).json({ msg: 'Invalid admin credentials' });

  res.json({ msg: 'Admin login successful' });
});

// Fetch all men items
app.get('/men', async (req, res) => {
  try {
    const db = await connectDB();
    const menItems = await db.collection('men').find({}).toArray();
    res.json(menItems);
  } catch (err) {
    console.error("Error fetching men items:", err); // Add error logging
    res.status(500).json({ msg: 'Error fetching men items' });
  }
});

// Fetch all women items
app.get('/women', async (req, res) => {
  try {
    const db = await connectDB();
    const womenItems = await db.collection('women').find({}).toArray();
    res.json(womenItems);
  } catch (err) {
    console.error("Error fetching women items:", err);
    res.status(500).json({ msg: 'Error fetching women items' });
  }
});

// Fetch all accessories items
app.get('/accessories', async (req, res) => {
  try {
    const db = await connectDB();
    const accessoriesItems = await db.collection('accessories').find({}).toArray();
    res.json(accessoriesItems);
  } catch (err) {
    console.error("Error fetching accessories items:", err);
    res.status(500).json({ msg: 'Error fetching accessories items' });
  }
});

// Add product to a collection and detailed page
app.post('/admin/add-product', async (req, res) => {
  const { category, name, price, img, description, images } = req.body;
  if (!category || !name || !price || !img)
    return res.status(400).json({ msg: 'Missing fields' });

  try {
    const db = await connectDB();
    // Insert product and get insertedId
    const result = await db.collection(category).insertOne({ name, price, img });
    const productId = result.insertedId;
    // Insert detailed info with the same _id
    await db.collection('detailed').insertOne({
      _id: productId,
      name,
      price,
      description: description || "",
      images: images || [],
    });
    res.json({ msg: 'Product added successfully' });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ msg: 'Error adding product' });
  }
});

// Edit product in a collection and detailed page
app.put('/admin/edit-product/:category/:id', async (req, res) => {
  const { category, id } = req.params;
  const { name, price, img, description, images } = req.body;
  if (!name || !price || !img)
    return res.status(400).json({ msg: 'Missing fields' });

  try {
    const db = await connectDB();
    await db.collection(category).updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, price, img } }
    );
    await db.collection('detailed').updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, price, description: description || "", images: images || [] } },
      { upsert: true }
    );
    res.json({ msg: 'Product updated successfully' });
  } catch (err) {
    console.error("Error editing product:", err);
    res.status(500).json({ msg: 'Error editing product' });
  }
});

// Delete product from a collection
app.delete('/admin/delete-product/:category/:id', async (req, res) => {
  const { category, id } = req.params;
  try {
    const db = await connectDB();
    await db.collection(category).deleteOne({ _id: new ObjectId(id) });
    res.json({ msg: 'Product deleted successfully' });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ msg: 'Error deleting product' });
  }
});

// Fetch detailed item by id
app.get('/detailed/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const db = await connectDB();
    const item = await db.collection('detailed').findOne({ _id: new ObjectId(id) });
    if (!item) return res.status(404).json({ msg: 'Item not found' });
    res.json(item);
  } catch (err) {
    console.error("Error fetching detailed item:", err);
    res.status(500).json({ msg: 'Error fetching detailed item' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
