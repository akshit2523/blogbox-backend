const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const { Schema } = mongoose
const { defaultFields, defaultSchemaOptions } = require('./model-utils')

const BlogSchema = new Schema({
  _id: { type: Schema.Types.String, required: true, default: uuidv4 },
  blogName: { type: Schema.Types.String, required: true },
  blogType: { type: Schema.Types.String, required: true },
  description: { type: Schema.Types.String, required: false },
  ...defaultFields
}, {
  ...defaultSchemaOptions
})

const BlogStore = mongoose.model('blog', BlogSchema, 'Blog-List')

module.exports = BlogStore

