const Blog = require("../models/blog.model");
const path = require("path");
const fs = require("fs");

// ================= ADD BLOG PAGE =================
exports.addBlogPage = async (req, res) => {
  try {
    return res.render("add_blog", { user: null });
  } catch (error) {
    console.error(error);
    return res.redirect("/");
  }
};

// ================= VIEW ALL BLOGS =================
exports.viewAllBlogsPage = async (req, res) => {
  try {
    const category = req.query.category || "";
    let filter = {};
    if (category) filter.category = category;

    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    const categories = await Blog.distinct("category");

    return res.render("view-all-blogs", {
      user: null,
      blogs,
      categories,
      search: "",
      category,
    });
  } catch (error) {
    console.error(error);
    return res.redirect("/");
  }
};

// ================= MY BLOGS PAGE =================
exports.MyBlogsPage = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return res.render("my_blogs", { blogs, user: null });
  } catch (error) {
    console.error(error);
    return res.redirect("/");
  }
};

// ================= ADD NEW BLOG =================
exports.addNewBlog = async (req, res) => {
  try {
    // Fixed invalid template string
    let imagePath = req.file ? `/uploads/${req.file.filename}` : "";
    const author = "Guest";

    await Blog.create({
      ...req.body,
      author,
      userId: null,
      image: imagePath,
    });

    return res.redirect("/blog/my-blogs");
  } catch (error) {
    console.error(error);
    return res.redirect("/blog/add-blog");
  }
};

// ================= EDIT BLOG PAGE =================
exports.editBlogPage = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.redirect("/blog/my-blogs");

    return res.render("edit_blog", { blog, user: null });
  } catch (error) {
    console.error(error);
    return res.redirect("/blog/my-blogs");
  }
};

// ================= UPDATE BLOG =================
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.redirect("/blog/my-blogs");

    if (req.file) {
      if (blog.image) {
        const oldImage = path.join(__dirname, "..", blog.image);
        try {
          fs.unlinkSync(oldImage);
        } catch { }
      }
      // Fixed invalid template string
      req.body.image = `/uploads/${req.file.filename}`;
    }

    await Blog.findByIdAndUpdate(blog._id, req.body, { new: true });
    return res.redirect("/blog/my-blogs");
  } catch (error) {
    console.error(error);
    return res.redirect("/blog/my-blogs");
  }
};

// ================= DELETE BLOG =================
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      // Delete image if exists
      if (blog.image) {
        const imagePath = path.join(__dirname, "..", blog.image);
        if (fs.existsSync(imagePath)) {
          try {
            fs.unlinkSync(imagePath);
            console.log("Blog image deleted successfully.");
          } catch (error) {
            console.log("Error deleting blog image:", error);
          }
        }
      }

      // Delete blog
    await Blog.findByIdAndDelete(req.params.id);
      console.log("Blog deleted successfully.");
    }else {
      console.log("Blog not found.");
    }

// Redirect to My Blogs page (no redirect loop)
    return res.redirect("/blog/my-blogs");
  } catch (error) {
    console.error("Error deleting blog:", error);
    return res.redirect("/blog/my-blogs");
  }
};

// ================= VIEW SINGLE BLOG =================
exports.viewSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.redirect("/blog/view-all-blogs");

    return res.render("single-blog", { blog, user: null });
  } catch (error) {
    console.error(error);
    return res.redirect("/blog/view-all-blogs");
  }
};
