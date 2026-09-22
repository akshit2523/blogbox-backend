const router = require('express').Router()

const { getBlogs, getBlogsByLimit, addBlog, editBlog, deleteBlog, filterBlog, filterBlogByType, getLatestBlogs, getLatestBlogsByLimit } = require('../../controllers/blog')

// Dummies routes - /v1/dummies

// router.get('/', getBlogs)
router.get('/limit', getBlogsByLimit)

// Create blog
router.post('/', addBlog)

// Edit blog
router.put('/:id', editBlog)

// Delete blog
router.delete('/:id', deleteBlog)

// Filter blogs by title/description
router.post('/filter', filterBlog)

// Filter blogs by blog type
router.post('/filter-type', filterBlogByType)

// Get latest blogs
router.get('/latest', getLatestBlogs)

// Get latest blogs with pagination
// router.get('/latest/limit', getLatestBlogsByLimit)

module.exports = router
