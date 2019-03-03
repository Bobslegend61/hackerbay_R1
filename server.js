const express = require('express');

const logger = require('./logger');
const routes = require('./router');

const router = express.Router();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(routes(router));

app.listen(PORT, () => logger.log({
    level: 'info',
    message: `App running on port: ${ PORT }`
}));