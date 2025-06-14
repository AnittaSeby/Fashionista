const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
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

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
