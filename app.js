require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mainRouter = require('./routes/mainRouter');
const accessControlHeadersApp = require('./utilities/accessControlHeaders/accessControlHeaders');
const startupMiddlewaresApp = require('./utilities/startupMiddlewares/startupMiddlewares');
const databaseConnectorApp = require('./utilities/database/databaseConnector');
const { startListeningServer } = require('./utilities/listener/listener')

const path = require("path");

app.use(cors());
const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(startupMiddlewaresApp);
app.use(accessControlHeadersApp);
app.use(mainRouter);
app.use(databaseConnectorApp);
startListeningServer(app);

module.exports = app;
