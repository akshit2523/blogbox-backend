const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const { Schema } = mongoose;
const { defaultFields, defaultSchemaOptions } = require("./model-utils");
const { BLOG_STATUS, BLOG_STATUS_VALUES } = require("../constants/enum");

const BlogSchema = new Schema(
  {
    _id: {
      type: Schema.Types.String,
      required: true,
      default: uuidv4,
    },

    title: {
      type: Schema.Types.String,
      required: true,
    },

    slug: {
      type: Schema.Types.String,
      required: true,
    },

    category: {
      type: Schema.Types.Mixed,
      required: true,
    },

    author: {
      type: Schema.Types.String,
      required: false,
      default: 'Akshit Dhameliya'
    },

    readTime: {
      type: Schema.Types.String,
      required: false,
    },

    tags: {
      type: Schema.Types.Mixed,
      required: false,
    },

    featured: {
      type: Schema.Types.Boolean,
      required: false,
      default: false,
    },

    status: {
      type: Schema.Types.String,
      required: true,
      enum: BLOG_STATUS_VALUES,
      default: BLOG_STATUS.DRAFT,
    },

    description: {
      type: Schema.Types.String,
      required: false,
    },

    shortDescription: {
      type: Schema.Types.String,
      required: false,
    },

    blogData: {
      type: Schema.Types.Mixed,
      required: false,
    },

    cover: {
      type: Schema.Types.Mixed,
      required: false,
    },

    //  seo fields canonicalURL, keywords, metaDescription, metaTitle, sharedImage
    seo: {
      type: Schema.Types.Mixed,
      required: false,
    },

    publishedAt: {
      type: Schema.Types.Date,
      required: false,
    },

    ...defaultFields,
  },
  {
    ...defaultSchemaOptions,
  },
);

const BlogStore = mongoose.model("blog", BlogSchema, "Blog-List");

module.exports = BlogStore;
