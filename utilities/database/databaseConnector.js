const express = require('express');
const databaseConnectorApp = express();
const db = require('./../../config/db');

db.connect();

databaseConnectorApp.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = databaseConnectorApp;