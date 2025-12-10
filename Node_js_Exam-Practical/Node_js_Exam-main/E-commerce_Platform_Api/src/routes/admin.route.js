const express = require("express");
const { verifytoken, Roleverify } = require("../middleware/verifytoken.middleware");
const { Editadmin } = require("../controller/admin.controller");

const routes = express.Router();

routes.put("/Editadmin/:id", verifytoken, Roleverify("Admin"), Editadmin);

module.exports = routes;