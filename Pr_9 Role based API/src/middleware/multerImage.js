  const multer = require('multer');
  const path = require('path');

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads'); 
    },
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + '-' + file.originalname;
      cb(null, uniqueName);
    }
  });

  const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only .jpeg, .jpg and .png files are allowed!'));
    }
  };

  const upload = multer({
    storage: storage,
    fileFilter: fileFilter
  });

  module.exports = upload;
