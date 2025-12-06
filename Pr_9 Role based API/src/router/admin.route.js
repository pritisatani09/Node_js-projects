const express = require("express");
const { verifyToken } = require("../middleware/verifyToken.js");
const { getAllUsers, deleteUser, createUser, updateUser, } = require("../controller/admin.controller.js");
const { verifyRole } = require("../middleware/verifyToken.js");
const { getEmployeeById } = require("../controller/manager.controller.js");
const { getMyProfile, updateMyProfile, getAllEmployees } = require("../controller/employee.controller.js");

const adminRouter = express.Router();

adminRouter.get("/viewSelf", verifyToken, verifyRole("Admin"), getMyProfile);
adminRouter.put("/editSelf", verifyToken, verifyRole("Admin"), updateMyProfile);
adminRouter.get("/all", verifyToken, verifyRole("Admin"), getAllUsers);
adminRouter.post("/add", verifyToken, verifyRole("Admin"), createUser);
adminRouter.get("/allEmployee", verifyToken, verifyRole("Admin"), getAllEmployees);
adminRouter.put("/editUser/:id", verifyToken, verifyRole("Admin"), updateUser);
adminRouter.delete("/:id", verifyToken, verifyRole("Admin"), deleteUser);

module.exports = adminRouter;