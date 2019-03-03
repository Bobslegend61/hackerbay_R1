const express = require('express');

const logger = require('./logger');
const routes = require('./router');

const router = express.Router();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes(router));
app.use('**', (req,res) => res.status(404).send('Not Found'));

app.listen(PORT, () => logger.log({
    level: 'info',
    message: `App running on port: ${ PORT }`
}));