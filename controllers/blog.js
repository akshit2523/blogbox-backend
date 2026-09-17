const { BlogStore } = require('../models')
const { sendSuccess, sendError } = require('./utils')

const getBlogs = async (req, res) => {
  try {
    const blogs = await BlogStore.find().lean()

    sendSuccess(res, { data: blogs })
  } catch (error) {
    sendError(res, 'Error while fetching blogs.', error)
  }
}

const addBlog = async (req, res) => {
  try {
    const blogInfo = req.body

    if (!blogInfo) {
      return sendError(res, 'Blog not available.', null, 404)
    }

    const blog = await new BlogStore(blogInfo)
    await blog.save()

    sendSuccess(res, { data: blog })
  } catch (error) {
    sendError(res, 'Error while adding blog.', error)
  }
}

module.exports = {
  getBlogs,
  addBlog
}