const router = require('express').Router()

const { getBlogs, getBlogsByLimit, getBlogById, addBlog, editBlog, deleteBlog, filterBlog, filterBlogByCategory, getLatestBlogs, getLatestBlogsByLimit } = require('../../controllers/blog')

// Dummies routes - /v1/dummies

// router.get('/', getBlogs)
router.get('/limit', getBlogsByLimit)

// Create blog
router.post('/', addBlog)

// Get blog by ID
// router.get('/:slug', getBlogById)

// Edit blog
router.put('/:id', editBlog)

// Delete blog
router.delete('/:id', deleteBlog)

// Filter blogs by title/description
router.post('/filter', filterBlog)

// Filter blogs by blog category
router.post('/filter-category', filterBlogByCategory)

// Get latest blogs
router.get('/latest', getLatestBlogs)

// Get latest blogs with pagination
// router.get('/latest/limit', getLatestBlogsByLimit)

module.exports = router
