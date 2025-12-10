const User = require("../models/usermodels");

exports.Edituser = async (req, res) => {
    try {
        const userId = req.params.id;

        const singleUser = await User.findById(userId);
        if (!singleUser) {
            return res.json({ status: 404, message: "User not found" });
        }

        // User cannot edit other user
        if (req.user.role === "User" && singleUser.role === "User" && req.user.id != singleUser.id) {
            return res.json({ status: 403, message: "User cannot edit another user" });
        }

        // ⭐ Update user and return updated data
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { ...req.body },
            { new: true }   // Return updated document
        );

        return res.json({
            status: 200,
            message: "User updated successfully!",
            user: updatedUser   // ⭐ Updated user data in response
        });

    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: "Something went wrong" });
    }
};

exports.viewUser = async (req, res) => {
    try {
        const users = await User.find({ isDelete: false });

        return res.json({
            status: 200,
            message: "Users fetched successfully",
            result: users
        });
    } catch (error) {
        console.log(error);
        return res.json({ status: 500, message: 'Server Error' });
    }
};

exports.Deleteuser = async (req, res) => {
    try {

        const userId = req.params.id;
        const singleUser = await User.findById(userId);
        if (!singleUser) {
            return res.json({ status: 404, message: "User not found" });
        }

        if (req.user.role === "User" && req.user.id !== singleUser.id) {
            return res.json({ status: 403, message: "User cannot delete another user" });
        }

        await User.findByIdAndUpdate(userId, { isDelete: true });

        return res.json({ status: 200, message: "User soft deleted successfully!" });

    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: "Something went wrong" });
    }
};