const express = require('express');
const classRouter = express.Router();
const classController = require('../../../controllers/public/class/classController');

classRouter.get('/', classController.getClasses);
classRouter.get('/:id', classController.getClassDetail);

module.exports = classRouter;
