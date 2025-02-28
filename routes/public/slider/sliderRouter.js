const express = require('express');
const sliderRouter = express.Router();
const sliderController = require('../../../controllers/public/slider/sliderController');

sliderRouter.get('/', sliderController.getAllSliders);
sliderRouter.get('/:id', sliderController.getSlider);

module.exports = sliderRouter;
