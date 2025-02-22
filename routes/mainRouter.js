const express = require('express');
const mainRouter = express.Router();

mainRouter.get('/api/test', (req, res) => {
  console.log('*** mainRouter test route hit');
  res.send('Main router is working');
});

module.exports = mainRouter;
