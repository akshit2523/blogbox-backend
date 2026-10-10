const router = require("express").Router();
const {
  getBlogs,
  getLatestBlogsByLimit,
  getBlogById,
} = require("../../controllers/blog");
const upload = require("../../middleware/upload");
const { uploadImage, deleteImage } = require("../../controllers/upload");
// const { login, register } = require('../../controllers/user')

// router.post('/login', login)
// router.post('/register', register)
router.get("/", getBlogs);
router.get("/latest/limit", getLatestBlogsByLimit);
router.get("/:slug", getBlogById);
router.post("/image", upload.single("image"), uploadImage);
router.delete("/image", deleteImage);

module.exports = router;
