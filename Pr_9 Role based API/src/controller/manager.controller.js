const UserModel = require("../models/user.schema");
const bcrypt = require("bcrypt");
const { sendCredentialsMail } = require("../utils/mailTemplates");

exports.getMAnagers = async (req, res) => {
  const Managers = await UserModel.find({ role: "Manager", isDeleted: false });
  res.json(Managers);
};


exports.createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, contactNo ,password, role } = req.body;

    if (role === "Admin") {
      return res.status(403).json({ message: "Manager cannot create Admin" });
    }

    const existing = await UserModel.findOne({ email, isDeleted: false });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await UserModel.create({
      firstName,
      lastName,
      contactNo,
      email,
      password: hashedPassword,
      role: role || "Employee",
    });
          sendCredentialsMail(employee, password);

    res.status(201).json({ message: "Employee created & Mail Sent", employee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteUser = async (req, res) => {
  await UserModel.findByIdAndUpdate(req.params.id, { isDeleted: true });
  res.json({ message: "User deleted" });
};

exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, contactNo , password, role } = req.body;
    console.log(id);
    

    const employee = await UserModel.findById(id);
    console.log(employee);
    
    if (!employee || employee.isDeleted) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (employee.role === "Admin") {
      return res.status(403).json({ message: "Managers cannot edit Admins" });
    }

    if (firstName) employee.firstName = firstName;
    if (lastName) employee.lastName = lastName;
    if (email) employee.email = email;
    if (contactNo) employee.contactNo = contactNo;
    if (role && role !== "Admin") {
      employee.role = role; 
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      employee.password = hashedPassword;
    }

    await employee.save();

    res.json({ message: "Employee updated successfully", employee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};