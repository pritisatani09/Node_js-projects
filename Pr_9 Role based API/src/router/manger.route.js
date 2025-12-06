const express = require("express");
const { verifyToken } = require("../middleware/verifyToken.js");
const { createEmployee, deleteUser, updateEmployee, getMAnagers} = require("../controller/manager.controller.js");
const { verifyRole } = require("../middleware/verifyToken.js");
const { getMyProfile, updateMyProfile, getAllEmployees, getEmployeeById } = require("../controller/employee.controller.js");

const managerRouter = express.Router();

managerRouter.get("/viewSelf", verifyToken, verifyRole("Manager"),getMyProfile);
managerRouter.put("/editSelf", verifyToken, verifyRole("Manager"),updateMyProfile);
managerRouter.get("/allManagers", verifyToken ,verifyRole("Manager" , "Admin") , getMAnagers);
managerRouter.get("/singleEmployee/:id", verifyToken, verifyRole("Manager" , "Admin"), getEmployeeById);
managerRouter.get("/allEmployees", verifyToken ,verifyRole("Manager" , "Admin") , getAllEmployees);
managerRouter.post("/addEmployee",verifyToken ,verifyRole("Manager" , "Admin") , createEmployee);
managerRouter.put("/editEmp/:id",verifyToken,verifyRole("Manager", "Admin"),updateEmployee);
managerRouter.delete("/empDelete/:id", verifyToken, verifyRole("Manager" , "Admin"), deleteUser);

module.exports = managerRouter;
