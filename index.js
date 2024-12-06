const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

require('dotenv').config();

// Middleware
app.use(cors());  // This will enable CORS for all routes
app.use(bodyParser.json());
app.use(express.json());

// In-memory storage for posts
let posts = [];
let currentId = 1;

// Routes

// Create a new post
app.post('/posts', (req, res) => {
    const { author, text } = req.body;
    if (!author || !text) {
        return res.status(400).json({ message: 'Author and text are required.' });
    }

    const newPost = {
        id: currentId++,
        author,
        text,
        date: new Date().toISOString()
    };

    posts.push(newPost);
    res.status(201).json(newPost);
});

// Get all posts
app.get('/posts', (req, res) => {
    res.json(posts);
});

// Get a specific post by ID
app.get('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
    }
    res.json(post);
});

// Edit a post by ID
app.put('/posts/:id', (req, res) => {
    const { text } = req.body;
    const post = posts.find(p => p.id === parseInt(req.params.id));

    if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
    }

    if (!text) {
        return res.status(400).json({ message: 'Text is required to update the post.' });
    }

    post.text = text;
    post.date = new Date().toISOString(); // Update the date
    res.json(post);
});

// Delete a post by ID
app.delete('/posts/:id', (req, res) => {
    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));

    if (postIndex === -1) {
        return res.status(404).json({ message: 'Post not found.' });
    }

    posts.splice(postIndex, 1);
    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
