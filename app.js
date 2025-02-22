require('dotenv').config();
const express = require('express');
const mainRouter = require('./routes/mainRouter');
const accessControlHeadersApp = require('./utilities/accessControlHeaders/accessControlHeaders');
const startupMiddlewaresApp = require('./utilities/startupMiddlewares/startupMiddlewares');
const databaseConnectorApp = require('./utilities/database/databaseConnector');
const { startListeningServer } = require('./utilities/listener/listener')

const app = express();
app.use(startupMiddlewaresApp);
app.use(accessControlHeadersApp);
app.use(mainRouter);
app.use(databaseConnectorApp);
startListeningServer(app);

module.exports = app;
