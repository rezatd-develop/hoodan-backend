const User = require('../../../models/User');

exports.updateProfile = async (req, res) => {
    const { address, postalCode } = req.body;

    if (!address || !postalCode) {
        return res.status(400).json({ error: 'Both address and postalCode are required.' });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { address, postalCode },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update profile', message: err.message });
    }
};
