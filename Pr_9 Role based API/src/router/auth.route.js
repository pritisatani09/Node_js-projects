const express = require('express');
const { loginUser, regUser } = require('../controller/auth.controller');
const upload = require('../middleware/multerImage');
const authRouter = express.Router();

authRouter.post('/loginUser', loginUser);
authRouter.post('/regUser', upload.single("photo"), regUser);

module.exports = authRouter;