const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000;

// MongoDB connection details
const MongoDB_URL = 'mongodb+srv://qwe:qwe12@final.mdkuc.mongodb.net/';

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    const client = new MongoClient(MongoDB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB successfully');

    const db = client.db(); // Access the database
    const collection = db.collection('example'); // Example collection

    // Example endpoint to get data from the collection
    app.get('/data', async (req, res) => {
      try {
        const data = await collection.find({}).toArray();
        res.json(data);
      } catch (err) {
        res.status(500).json({ error: 'Error fetching data' });
      }
    });

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}

// Call the connect function
connectToMongoDB();
