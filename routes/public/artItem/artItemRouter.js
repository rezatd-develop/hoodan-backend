const express = require('express');
const artItemRouter = express.Router();
const { getArtItems, getArtItemDetail } = require('../../../controllers/public/artItem/artItemController');

artItemRouter.get('/', getArtItems);
artItemRouter.get('/:id', getArtItemDetail);

module.exports = artItemRouter;
