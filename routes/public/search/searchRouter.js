const express = require('express');
const searchRouter = express.Router({ mergeParams: true });
const { searchAll } = require('../../../controllers/public/search/searchController');

searchRouter.get('/', searchAll);

module.exports = searchRouter;
