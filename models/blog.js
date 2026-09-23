const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const { Schema } = mongoose
const { defaultFields, defaultSchemaOptions } = require('./model-utils')
const { BLOG_STATUS, BLOG_STATUS_VALUES } = require("../constants/enum")


const BlogSchema = new Schema({
  _id: { type: Schema.Types.String, required: true, default: uuidv4 },
  name: { type: Schema.Types.String, required: true },
  slug: { type: Schema.Types.String, required: true },
  category: { type: Schema.Types.String, required: true },
  author: { type: Schema.Types.String, required: true },
  readTime: { type: Schema.Types.String, required: false },
  tags: { type: [Schema.Types.String], required: false },
  featured: { type: Schema.Types.Boolean, required: false },
  status: { type: Schema.Types.String, required: true, enum: BLOG_STATUS_VALUES, default: BLOG_STATUS.DRAFT },
  description: { type: Schema.Types.String, required: false },
  shortDescription: { type: Schema.Types.String, required: false },
  ...defaultFields
}, {
  ...defaultSchemaOptions
})

const BlogStore = mongoose.model('blog', BlogSchema, 'Blog-List')

module.exports = BlogStore

