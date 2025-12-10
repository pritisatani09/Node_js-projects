const jwt = require("jsonwebtoken");
const User = require("../models/usermodels");

exports.verifytoken = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(404).json({ message: "authorization is failed" });
        }

        const token = authorization.split(" ")[1];
        if (!token) {
            return res.status(404).json({ message: "Token invalid" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // FIX HERE 👇 (userId मोकलियो login वखते)
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: "User Not Found" });
        }

        req.user = user; 
        next();

    } catch (error) {
        return res.status(500).json({ message: "Token Error", error: error.message });
    }
};


exports.Roleverify = (...roles) => {
    return (req, res, next) => {
        // req.user.role must exist
        if (!req.user || !req.user.role) {
            return res.json({ status: 403, message: "User role missing" });
        }

        // Check allowed roles
        if (!roles.includes(req.user.role)) {
            return res.json({ status: 403, message: "Invalid Role" });
        }

        next();
    }
};
