// require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const { farazSMS } = require('@aspianet/faraz-sms')
const express = require('express');
const mainRouter = require('./routes/mainRouter');
const accessControlHeadersApp = require('./utilities/accessControlHeaders/accessControlHeaders');
const startupMiddlewaresApp = require('./utilities/startupMiddlewares/startupMiddlewares');
const databaseConnectorApp = require('./utilities/database/databaseConnector');
const { startListeningServer } = require('./utilities/listener/listener');

const path = require("path");
const app = express();
farazSMS.init('OWVjMjZiMmQtOWM5Yy00NjU0LWFiODItZjE5YjZjZTFhYTFlNTc1OGQwMmVhZWJlYjIyMGJkMTU5NDM2NDlkNDVkZmY=');

app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(startupMiddlewaresApp);
app.use(accessControlHeadersApp);
app.use(mainRouter);
app.use(databaseConnectorApp);
startListeningServer(app);

module.exports = app;
