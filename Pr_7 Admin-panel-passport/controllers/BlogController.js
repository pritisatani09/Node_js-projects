const Blog = require("../models/blog.model");
const path = require("path");
const fs = require("fs");

// Helper function to pass data to views
const getViewData = (req, extraData = {}) => {
  return {
    user: req.user || null,
    admin: req.cookies.admin || null,
    success: req.flash("success"),
    error: req.flash("error"),
    ...extraData,
  };
};

// ADD BLOG PAGE
exports.addBlogPage = async (req, res) => {
  try {
    return res.render("add_blog", getViewData(req));
  } catch (error) {
    console.error("Error loading add blog page:", error);
    return res.redirect("/");
  }
};

// ADD NEW BLOG (POST)
exports.addNewBlog = async (req, res) => {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    await Blog.create({
      ...req.body,
      author: req.user?.name || "Guest",
      userId: req.user?._id,
      image: imagePath,
    });

    req.flash("success", "🎉 Blog added successfully!");
    return res.redirect("/blog/my-blogs");
  } catch (error) {
    console.error("Error adding new blog:", error);
    req.flash("error", "❌ Something went wrong while adding the blog!");
    return res.redirect("/blog/add-blog");
  }
};

// VIEW ALL BLOGS PAGE (Only View)
exports.viewAllBlogsPage = async (req, res) => {
  try {
    const category = req.query.category || "";
    const filter = category ? { category } : {};

    const blogs = await Blog.find(filter).sort({ createdAt: -1 }).lean();
    const categories = await Blog.distinct("category");
    console.log("Total Blogs Found:", blogs.length);
    return res.render("view-all-blogs", {
      user: req.user || null,
      blogs,
      categories,
      category,
      success: req.flash("success"),
      error: req.flash("error"),
    });
  } catch (error) {
    console.error("Error loading all blogs page:", error);
    return res.redirect("/");
  }
};

// MY BLOGS PAGE (For logged-in user)
exports.MyBlogsPage = async (req, res) => {
  try {
    if (!req.user) {
      req.flash("error", "Please login to view your blogs!");
      return res.redirect("/login");
    }

    const byUserId = await Blog.find({ userId: req.user._id }).lean();
    const byAuthorName = await Blog.find({ author: req.user.name }).lean();
    const combinedBlogs = [...byUserId, ...byAuthorName];
    const uniqueBlogs = combinedBlogs.filter(
      (blog, index, self) =>
        index === self.findIndex(b => b._id.toString() === blog._id.toString())
    );
    uniqueBlogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    console.log("🟢 My Blogs Found:", uniqueBlogs.length);
    uniqueBlogs.forEach(blog => {
      if (!blog.image || blog.image.trim() === "") {
        blog.image = "/uploads/default.jpg";
      } else if (!blog.image.startsWith("/uploads/")) {
        blog.image = `/uploads/${path.basename(blog.image)}`;
      }
    });

    // Render view with data
    return res.render("my-blogs", getViewData(req, { blogs: uniqueBlogs }));

  } catch (error) {
    console.error("❌ Error loading My Blogs page:", error);
    req.flash("error", "Error while loading your blogs!");
    return res.redirect("/dashboard");
  }
};

//  VIEW SINGLE BLOG
exports.viewSingleBlog = async (req, res) => {
  try {
    const blogId = req.params.id.trim();
    const blog = await Blog.findById(blogId).lean();

    if (!blog) {
      req.flash("error", "❌ Blog not found!");
      return res.redirect("/blog/view-all-blogs");
    }

    // Ensure correct image path format
    if (blog.image) {
      // Remove any duplicate slashes and ensure it starts with "/"
      blog.image = blog.image.startsWith("/")
        ? blog.image
        : `/${blog.image}`;
    } else {
      blog.image = "/uploads/default.jpg";
    }

    console.log("Loaded Single Blog:", blog.title, " | Image:", blog.image);

    // Render single blog view with correct data
    return res.render("single-blog", getViewData(req, { blog }));

  } catch (error) {
    console.error("Error loading single blog:", error);
    req.flash("error", "❌ Error while loading blog!");
    return res.redirect("/blog/view-all-blogs");
  }
};

// EDIT BLOG PAGE
exports.editBlogPage = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      console.log("❌ Blog not found");
      return res.render("edit-blog", { blog: null });
    }
    console.log("🟢 Edit Blog Loaded:", blog.title);
    res.render("edit-blog", { blog });
  } catch (error) {
    console.error("❌ Error loading edit blog page:", error);
    res.status(500).send("Server Error");
  }
};

// UPDATE BLOG
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      req.flash("error", "❌ Blog not found!");
      return res.redirect("/blog/my-blogs");
    }

    if (req.file) {
      if (blog.image) {
        const oldImage = path.join(__dirname, "..", blog.image);
        try {
          fs.unlinkSync(oldImage);
        } catch (err) {
          console.error("Error deleting old image:", err);
        }
      }
      req.body.image = `/uploads/${req.file.filename}`;
    }

    await Blog.findByIdAndUpdate(blog._id, req.body, { new: true });
    req.flash("success", "✅ Blog updated successfully!");
    return res.redirect("/blog/my-blogs");
  } catch (error) {
    console.error("Error updating blog:", error);
    req.flash("error", "❌ Something went wrong while updating the blog!");
    return res.redirect("/blog/my-blogs");
  }
};

// DELETE BLOG
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      if (blog.image) {
        const imagePath = path.join(__dirname, "..", blog.image);
        if (fs.existsSync(imagePath)) {
          try {
            fs.unlinkSync(imagePath);
          } catch (err) {
            console.error("Error deleting image:", err);
          }
        }
      }
      await Blog.findByIdAndDelete(req.params.id);
      req.flash("success", "🗑️ Blog deleted successfully!");
    } else {
      req.flash("error", "❌ Blog not found!");
    }

    return res.redirect("/blog/my-blogs");
  } catch (error) {
    console.error("Error deleting blog:", error);
    req.flash("error", "❌ Something went wrong while deleting the blog!");
    return res.redirect("/blog/my-blogs");
  }
};
