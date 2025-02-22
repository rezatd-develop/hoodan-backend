const express = require('express');
const cors = require('cors');
const accessControlHeadersApp = express();

accessControlHeadersApp.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization'],
}));

accessControlHeadersApp.use((req, res, next) => {
    res.header('Access-Control-Expose-Headers', 'Authorization');
    next();
});

module.exports = accessControlHeadersApp;