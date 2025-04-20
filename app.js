require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mainRouter = require('./routes/mainRouter');
const accessControlHeadersApp = require('./utilities/accessControlHeaders/accessControlHeaders');
const startupMiddlewaresApp = require('./utilities/startupMiddlewares/startupMiddlewares');
const databaseConnectorApp = require('./utilities/database/databaseConnector');
const { startListeningServer } = require('./utilities/listener/listener')

const path = require("path");
const app = express();

app.use(cors({
    origin: 'http://156.253.5.235',
    origin: ['http://localhost:3000', 'http://localhost:80', 'http://156.253.5.235', 'http://156.253.5.235:3000', 'http://156.253.5.235:5000', 'http://156.253.5.235:3001'],
    credentials: true,
}));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(startupMiddlewaresApp);
app.use(accessControlHeadersApp);
app.use(mainRouter);
app.use(databaseConnectorApp);
startListeningServer(app);

module.exports = app;
