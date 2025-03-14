const express = require('express');
const adminUserRouter = express.Router({ mergeParams: true });
const verifyAdmin = require('../../../middlewares/auth/verifyAdmin');
const { verifyTokenAndSetUserId } = require('../../../middlewares/auth/verifyTokenAndSetUserId');
const { getAllUsers, getUserDetail, editUser, removeUser, createUser } = require('../../../controllers/admin/user/adminUserRouter');

adminUserRouter.get('/en/admin/users/getAllUsers', verifyTokenAndSetUserId, verifyAdmin, getAllUsers);
adminUserRouter.get('/en/admin/users/getUserDetail', verifyTokenAndSetUserId, verifyAdmin, getUserDetail);
adminUserRouter.put('/en/admin/users/editUser', verifyTokenAndSetUserId, verifyAdmin, editUser);
adminUserRouter.delete('/en/admin/users/removeUser', verifyTokenAndSetUserId, verifyAdmin, removeUser);
adminUserRouter.post('/en/admin/users/createUser', verifyTokenAndSetUserId, verifyAdmin, createUser);

module.exports = adminUserRouter;
