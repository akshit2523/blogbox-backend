const router = require('express').Router()

const { getBlogs, addBlog } = require('../../controllers/blog')

// Dummies routes - /v1/dummies

router.get('/', getBlogs)
router.post('/', addBlog)

module.exports = router
