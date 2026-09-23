const router = require('express').Router()
const { getBlogs, getLatestBlogsByLimit, getBlogById } = require('../../controllers/blog')

// const { login, register } = require('../../controllers/user')

// router.post('/login', login)
// router.post('/register', register)
router.get('/', getBlogs)
router.get('/:slug', getBlogById)
router.get('/latest/limit', getLatestBlogsByLimit)


module.exports = router
