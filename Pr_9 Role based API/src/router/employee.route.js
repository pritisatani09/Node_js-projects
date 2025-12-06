const express = require("express");
const { verifyToken, verifyRole } = require("../middleware/verifyToken.js");
const { getMyProfile, updateMyProfile, getAllEmployees, getEmployeeById } = require("../controller/employee.controller.js");
const upload = require("../middleware/multerImage.js");

const empRouter = express.Router();

empRouter.get("/viewSelf", verifyToken,getMyProfile);
empRouter.put("/editSelf", verifyToken,updateMyProfile);
empRouter.get("/employees", verifyToken , getAllEmployees);
empRouter.get("/singleEmployee/:id", verifyToken, getEmployeeById);


module.exports = empRouter;
