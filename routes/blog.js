const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const authMiddleware = require('../middleware/auth');

// Protected: Add blog (Admin only)
router.post('/blogs', authMiddleware, async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content)
    return res.status(400).json({ message: 'Title and content required' });

  const blog = new Blog({ title, content });
  await blog.save();

  res.status(201).json(blog);
});

// Public: Get all blogs
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// ✅ Protected: Update blog
router.put('/blogs/:id', authMiddleware, async (req, res) => {
  const { title, content } = req.body;

  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update blog' });
  }
});

// ✅ Protected: Delete blog
router.delete('/blogs/:id', authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete blog' });
  }
});

module.exports = router;
