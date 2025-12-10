const User = require("../models/usermodels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
exports.registerUser = async (req, res) => {
    try {
        if (!req.body || !req.body.email || !req.body.password) {
            return res.json({ status: 400, message: "Body or Email/Password is missing" });
        }

        let userExists = await User.findOne({ email: req.body.email, isDelete: false });
        if (userExists) {
            return res.json({ status: 400, message: "User Already Exists" });
        }

        const hashPassword = await bcrypt.hash(req.body.password, 10);

        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }

        const user = await User.create({
            ...req.body,
            password: hashPassword,
            profileImage: imagePath
        });

        return res.json({ status: 200, user, message: "User Added Successfully" });

    } catch (error) {
        console.log(error);
        return res.json({ status: 500, message: "Server Error" });
    }
};

// LOGIN
exports.loginUser = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.json({ status: 400, message: "Email and Password required" });
        }

        const user = await User.findOne({ email: req.body.email, isDelete: false });
        if (!user) {
            return res.json({ status: 404, message: "User not found" });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.json({ status: 401, message: "Invalid Credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

        return res.json({ status: 200, message: "Login Success", token, user });

    } catch (error) {
        console.log(error);
        return res.json({ status: 500, message: "Server Error" });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }

        res.status(200).json({
            status: 200,
            message: "User Profile Fetched",
            data: user
        });

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

