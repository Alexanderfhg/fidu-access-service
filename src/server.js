const express = require('express');

const app = express();

// Settings
app.set('port', process.env.PORT || '4000')

// Middlewares
app.use(express.urlencoded({extended: false}));

// Routes
app.use(require('./routes/index.routes'));

module.exports = app;
