const express = require("express");
const router = express.Router();
const { read, write } = require("../utils/fileDb");

// Create
router.post("/", (req, res) => {
  const { title, content, imageUrl } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const posts = read();

  const newPost = {
    id: Date.now(),
    title,
    content,
    imageUrl,
    createdAt: new Date()
  };

  posts.push(newPost);
  write(posts);

  res.status(201).json(newPost);
});

// Read
router.get("/", (req, res) => {
  const posts = read().reverse();
  res.json(posts);
});

module.exports = router;
