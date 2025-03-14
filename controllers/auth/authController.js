const accessAccepted = (req, res) => {
    res.status(200).json({ accessAccepted: true })
};

module.exports = accessAccepted;