const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const skip = (page - 1) * limit;
        const users = await User.find().skip(skip).limit(limit);
        const totalUsers = await User.countDocuments();
        const totalPages = Math.ceil(totalUsers / limit);
        res.status(200).json({
            users,
            currentPage: page,
            totalPages,
            totalUsers
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve users', message: err.message });
    }
};

exports.getUserDetail = async (req, res) => {
    const { userId } = req.query;
    if (!userId) {
        return res.status(400).json({ error: 'User id is required.' });
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve user detail', message: err.message });
    }
};

exports.editUser = async (req, res) => {
    const { userId, update } = req.body;
    if (!userId || !update) {
        return res.status(400).json({ error: 'User id and update data are required.' });
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, update, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update user', message: err.message });
    }
};

exports.removeUser = async (req, res) => {
    const { userId } = req.query;
    if (!userId) {
        return res.status(400).json({ error: 'User id is required.' });
    }
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.status(200).json({ message: 'User removed successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to remove user', message: err.message });
    }
};

exports.createUser = async (req, res) => {
    const { phone, firstName, lastName, address, postalCode, role } = req.body;
    if (!phone) {
        return res.status(400).json({ error: 'Phone is required.' });
    }
    try {
        const existingUser = await User.findOne({ phone });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this phone already exists.' });
        }
        const newUser = new User({
            phone,
            firstName,
            lastName,
            address,
            postalCode,
            role: role || 'user'
        });
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: savedUser });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create user', message: err.message });
    }
};
