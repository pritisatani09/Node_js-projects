const express = require("express");
const { verifytoken, Roleverify } = require("../middleware/verifytoken.middleware");
const router = express.Router();
const uploadImage = require("../middleware/multer.middleware");
const { registerUser, loginUser, getUserProfile } = require("../controller/auth.controller");

// ✅ Register route → optional image
router.post("/register", uploadImage.single("profileImage"), registerUser);

// Login
router.post("/login", loginUser);

router.get("/profile", verifytoken, getUserProfile);


module.exports = router;
