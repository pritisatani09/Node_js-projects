const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/DbConnection");
const indexRoutes = require("./routes/index.routes");
const blogRoutes = require("./routes/blog.routes");
const passport = require("passport");
const localStrategy = require("./middleware/localStrategy");
const session = require("express-session");
const flash = require("connect-flash");
const { flashMessage } = require("./middleware/flashMessage");

dbConnect();

// EJS View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static Files
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/uploads", express.static("uploads")); 

// Middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// ----- Session Configuration -----
app.use(
  session({
    name: "adminanel",
    secret: "node4pm",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

// ----- Flash Messages -----
app.use(flash());

// ----- Passport Authentication -----
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setValidateUser);

// ----- Custom Flash Middleware -----
app.use(flashMessage);

// Routes
app.use("/", indexRoutes);
app.use("/blog", blogRoutes);
// app.use("/web", require('./routes/web.routes'))

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// Server Start
const port = 9090;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
