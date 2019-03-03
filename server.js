const express = require('express');

const logger = require('./logger');

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => logger.log({
    level: 'info',
    message: `App running on port: ${ PORT }`
}));