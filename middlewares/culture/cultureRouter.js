const cultureDetectorMiddleware = (req, res, next) => {
    console.log('***req', req.params)
};

module.exports = { cultureDetectorMiddleware }