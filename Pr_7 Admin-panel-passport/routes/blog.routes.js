const express = require("express");
const {
  addBlogPage,
  viewAllBlogsPage,
  deleteBlog,
  addNewBlog,
  editBlogPage,
  updateBlog,
  viewSingleBlog,
  MyBlogsPage,
} = require("../controllers/BlogController");
const uploadImage = require("../middleware/uploadImage");
const routes = express.Router();

function setAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  return res.redirect("/");
}

routes.get("/add-blog", setAuthenticated, addBlogPage);
routes.get("/view-all-blogs", setAuthenticated, viewAllBlogsPage);
routes.get("/my-blogs", setAuthenticated, MyBlogsPage);
routes.get("/single-blog/:id", setAuthenticated, viewSingleBlog);
routes.get("/edit-blog/:id", setAuthenticated, editBlogPage);
routes.get("/delete-blog/:id", setAuthenticated, deleteBlog);

routes.post("/add-blog", setAuthenticated, uploadImage.single("image"), addNewBlog);
routes.post("/update-blog/:id", setAuthenticated, uploadImage.single("image"), updateBlog);

module.exports = routes;
