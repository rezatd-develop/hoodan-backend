const express = require('express');
const searchRouter = express.Router();
const { searchAll } = require('../../../controllers/public/search/searchController');

searchRouter.get('/', searchAll);

module.exports = searchRouter;
