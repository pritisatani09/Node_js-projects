const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadFolder = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolder),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Add User
router.get("/add-user", userController.addUserPage);
router.post("/add-user", upload.single("image"), userController.addNewUser);

// View All Users
router.get("/view-users", userController.viewAllUserPage);

// Edit + Update
router.get("/edit-user/:id", userController.editUserPage);
router.post("/edit-user/:id", upload.single("image"), userController.updateUser);

// Delete
router.get("/delete-user/:id", userController.deleteUser);

module.exports = router;
