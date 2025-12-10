const express = require("express");
const { verifytoken, Roleverify } = require("../middleware/verifytoken.middleware");
const { Edituser, Deleteuser, viewUser } = require("../controller/user.controller");

const routes = express.Router();

routes.put("/Edituser/:id", verifytoken, Roleverify("Admin", "User"), Edituser);
routes.put("/Deleteuser/:id", verifytoken, Roleverify("Admin", "User"), Deleteuser);
routes.get("/viewAllUser", verifytoken, Roleverify("Admin"), viewUser);

module.exports = routes;