const User = require("../models/usermodels");

exports.Editadmin = async (req, res) => {
    try {

        const userId = req.params.id;
        const singleUser = await User.findById(userId);
        if (!singleUser) {
            return res.json({ status: 404, message: "Admin not found" });
        }

        if (req.user.role === "Admin" && singleUser.role === "Admin" && req.user.id != singleUser.id) {
            return res.json({ status: 403, message: "Admin cannot edit another admin" });
        }

        await User.findByIdAndUpdate(
            userId,
            { ...req.body },
            { new: true }
        );

        return res.json({ status: 200, message: "Admin updated successfully" });

    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: "Something went wrong" });
    }
};