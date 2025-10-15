const express = require("express");
const router = express.Router();
const blogController = require("../controllers/BlogController");
const upload = require("../middleware/uploadImage");

// ADD BLOG
router.get("/add-blog", blogController.addBlogPage);
router.post("/add-blog", upload.single("image"), blogController.addNewBlog);

// VIEW ALL BLOGS
router.get("/view-all-blogs", blogController.viewAllBlogsPage);

// MY BLOGS
router.get("/my-blogs", blogController.MyBlogsPage);

// SINGLE BLOG
router.get("/single-blog/:id", blogController.viewSingleBlog);

// EDIT BLOG
router.get("/edit-blog/:id", blogController.editBlogPage);
router.post("/update-blog/:id", upload.single("image"), blogController.updateBlog);

// DELETE BLOG
router.get("/delete-blog/:id", blogController.deleteBlog);

module.exports = router;