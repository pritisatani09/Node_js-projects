const express = require('express');
const authRouter = require('./auth.route');
const adminRouter = require('./admin.route');
const managerRouter = require('./manger.route');
const empRouter = require('./employee.route');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use('/manager', managerRouter);
router.use('/employee', empRouter);

module.exports = router;