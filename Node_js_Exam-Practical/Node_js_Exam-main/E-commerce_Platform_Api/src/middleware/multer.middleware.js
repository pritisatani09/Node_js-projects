const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/uploads"); // folder must exist
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `IMG-${Date.now()}${ext}`);
    }
});

const uploadImage = multer({ storage: storage });
module.exports = uploadImage;
