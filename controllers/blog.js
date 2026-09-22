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

const getBlogsByLimit = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10
    } = req.query

    const pageNumber = Number(page)
    const limitNumber = Number(limit)

    if (pageNumber < 1 || limitNumber < 1) {
      return sendError(
        res,
        'Page and limit must be greater than 0.',
        null,
        400
      )
    }

    const skip = (pageNumber - 1) * limitNumber

    const totalBlogs = await BlogStore.countDocuments()

    const blogs = await BlogStore
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber)

    const totalPages = Math.ceil(totalBlogs / limitNumber)

    sendSuccess(res, {
      data: {
        blogs,
        pagination: {
          currentPage: pageNumber,
          limit: limitNumber,
          totalBlogs,
          totalPages,
          hasNextPage: pageNumber < totalPages,
          hasPreviousPage: pageNumber > 1
        }
      }
    })
  } catch (error) {
    sendError(res, 'Error while getting blogs.', error)
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

const editBlog = async (req, res) => {
  try {
    const { id } = req.params
    const blogInfo = req.body

    if (!id) {
      return sendError(res, 'Blog ID not available.', null, 404)
    }

    if (!blogInfo) {
      return sendError(res, 'Blog data not available.', null, 404)
    }

    const blog = await BlogStore.findByIdAndUpdate(
      id,
      blogInfo,
      {
        new: true,
        runValidators: true
      }
    )

    if (!blog) {
      return sendError(res, 'Blog not found.', null, 404)
    }

    sendSuccess(res, { data: blog })
  } catch (error) {
    sendError(res, 'Error while editing blog.', error)
  }
}

const filterBlog = async (req, res) => {
  try {
    const {
      filter,
      page = 1,
      limit = 10
    } = req.body

    if (!filter) {
      return sendError(res, 'Filter text not available.', null, 400)
    }

    const pageNumber = Number(page)
    const limitNumber = Number(limit)

    if (pageNumber < 1 || limitNumber < 1) {
      return sendError(
        res,
        'Page and limit must be greater than 0.',
        null,
        400
      )
    }

    const skip = (pageNumber - 1) * limitNumber

    const filterQuery = {
      $or: [
        {
          blogName: {
            $regex: filter,
            $options: 'i'
          }
        },
        {
          description: {
            $regex: filter,
            $options: 'i'
          }
        }
      ]
    }

    const totalBlogs = await BlogStore.countDocuments(filterQuery)

    const blogs = await BlogStore
      .find(filterQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber)

    const totalPages = Math.ceil(totalBlogs / limitNumber)

    sendSuccess(res, {
      data: {
        blogs,
        pagination: {
          currentPage: pageNumber,
          limit: limitNumber,
          totalBlogs,
          totalPages,
          hasNextPage: pageNumber < totalPages,
          hasPreviousPage: pageNumber > 1
        }
      }
    })
  } catch (error) {
    sendError(res, 'Error while filtering blogs.', error)
  }
}

const filterBlogByType = async (req, res) => {
  try {
    const {
      filterType,
      page = 1,
      limit = 10
    } = req.body

    if (!filterType) {
      return sendError(res, 'Filter type not available.', null, 400)
    }

    const pageNumber = Number(page)
    const limitNumber = Number(limit)

    if (pageNumber < 1 || limitNumber < 1) {
      return sendError(
        res,
        'Page and limit must be greater than 0.',
        null,
        400
      )
    }

    const skip = (pageNumber - 1) * limitNumber

    const filter = {
      blogType: {
        $regex: filterType,
        $options: 'i'
      }
    }

    const totalBlogs = await BlogStore.countDocuments(filter)

    const blogs = await BlogStore
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber)

    const totalPages = Math.ceil(totalBlogs / limitNumber)

    sendSuccess(res, {
      data: {
        blogs,
        pagination: {
          currentPage: pageNumber,
          limit: limitNumber,
          totalBlogs,
          totalPages,
          hasNextPage: pageNumber < totalPages,
          hasPreviousPage: pageNumber > 1
        }
      }
    })
  } catch (error) {
    sendError(res, 'Error while filtering blogs by type.', error)
  }
}

const getLatestBlogs = async (req, res) => {
  try {
    const oneMonthAgo = new Date()

    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

    const blogs = await BlogStore.find({
      createdAt: {
        $gte: oneMonthAgo
      }
    }).sort({
      createdAt: -1
    })

    sendSuccess(res, { data: blogs })
  } catch (error) {
    sendError(res, 'Error while getting latest blogs.', error)
  }
}

const getLatestBlogsByLimit = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10
    } = req.query

    const pageNumber = Number(page)
    const limitNumber = Number(limit)

    if (pageNumber < 1 || limitNumber < 1) {
      return sendError(
        res,
        'Page and limit must be greater than 0.',
        null,
        400
      )
    }

    const oneMonthAgo = new Date()
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

    const filter = {
      createdOn: {
        $gte: oneMonthAgo
      }
    }

    const skip = (pageNumber - 1) * limitNumber

    const totalBlogs = await BlogStore.countDocuments(filter)

    const blogs = await BlogStore
      .find(filter)
      .sort({ createdOn: -1 })
      .skip(skip)
      .limit(limitNumber)

    const totalPages = Math.ceil(totalBlogs / limitNumber)

    sendSuccess(res, {
      data: {
        blogs,
        pagination: {
          currentPage: pageNumber,
          limit: limitNumber,
          totalBlogs,
          totalPages,
          hasNextPage: pageNumber < totalPages,
          hasPreviousPage: pageNumber > 1
        }
      }
    })
  } catch (error) {
    sendError(res, 'Error while getting latest blogs.', error)
  }
}

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      return sendError(res, 'Blog ID not available.', null, 404)
    }

    const blog = await BlogStore.findByIdAndDelete(id)

    if (!blog) {
      return sendError(res, 'Blog not found.', null, 404)
    }

    sendSuccess(res, { data: blog })
  } catch (error) {
    sendError(res, 'Error while deleting blog.', error)
  }
}


module.exports = {
  getBlogs,
  getBlogsByLimit,
  addBlog,
  editBlog,
  deleteBlog,
  filterBlog,
  filterBlogByType,
  getLatestBlogs,
  getLatestBlogsByLimit
}