const express = require('express');
const startupMiddlewaresApp = express();

startupMiddlewaresApp.use(express.json());

module.exports = startupMiddlewaresApp;