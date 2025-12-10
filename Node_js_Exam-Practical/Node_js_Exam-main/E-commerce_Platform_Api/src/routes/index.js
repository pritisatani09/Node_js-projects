const express = require("express");

const routes = express.Router();

routes.use("/auth", require("./auth.routes"));
routes.use("/admin", require("./admin.route"));
routes.use("/user", require("./user.routes"));
routes.use("/product", require("./product.routes"));

module.exports = routes;