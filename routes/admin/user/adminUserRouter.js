const express = require('express');
const adminUserRouter = express.Router({ mergeParams: true });
const verifyAdmin = require('../../../middlewares/auth/verifyAdmin');
const { verifyTokenAndSetUserId } = require('../../../middlewares/auth/verifyTokenAndSetUserId');
const { getAllUsers, getUserDetail, editUser, removeUser, createUser } = require('../../../controllers/admin/user/adminUserRouter');

adminUserRouter.get('/getAllUsers', verifyTokenAndSetUserId, verifyAdmin, getAllUsers);
adminUserRouter.get('/getUserDetail', verifyTokenAndSetUserId, verifyAdmin, getUserDetail);
adminUserRouter.put('/editUser', verifyTokenAndSetUserId, verifyAdmin, editUser);
adminUserRouter.delete('/removeUser', verifyTokenAndSetUserId, verifyAdmin, removeUser);
adminUserRouter.post('/createUser', verifyTokenAndSetUserId, verifyAdmin, createUser);

module.exports = adminUserRouter;
