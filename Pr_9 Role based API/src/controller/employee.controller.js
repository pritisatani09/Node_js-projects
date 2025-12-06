const UserModel = require("../models/user.schema");
const bcrypt = require("bcrypt");  

exports.getMyProfile = async (req, res) => {
  res.json(req.user);
};

exports.updateMyProfile = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updated = await UserModel.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated successfully", updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllEmployees = async (req, res) => {
  const employees = await UserModel.find({ role: "Employee", isDeleted: false });
  res.json(employees);
};

exports.getEmployeeById = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);

  if (!user || user.isDeleted) return res.status(404).json({ message: "User not found" });

  if (req.user.role === "Employee" && req.user._id.toString() !== id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  res.json(user);
};
