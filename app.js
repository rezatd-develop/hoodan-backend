require('dotenv').config();

const cors = require('cors');
const helmet = require('helmet');
const { farazSMS } = require('@aspianet/faraz-sms');
const express = require('express');
const path = require('path');

const mainRouter = require('./routes/mainRouter');
const accessControlHeadersApp = require('./utilities/accessControlHeaders/accessControlHeaders');
const startupMiddlewaresApp = require('./utilities/startupMiddlewares/startupMiddlewares');
const databaseConnectorApp = require('./utilities/database/databaseConnector');
const { startListeningServer } = require('./utilities/listener/listener');

const app = express();

farazSMS.init(process.env.FARAZ_SMS_API_KEY);

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
}));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(startupMiddlewaresApp);
app.use(accessControlHeadersApp);
app.use(mainRouter);
app.use(databaseConnectorApp);

startListeningServer(app);

module.exports = app;