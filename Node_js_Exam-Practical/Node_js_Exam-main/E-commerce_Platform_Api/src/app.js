const express = require("express");
const path = require("path");
require("dotenv").config();
const dbConnect = require("./config/dbConnect.config");

const app = express();

// ✅ Middleware → Must be before routes
app.use(express.json());                  // Parse JSON body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded body

// ✅ Static folder
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));

// ✅ Routes
app.use("/E-commerce", require("./routes/index"));

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
