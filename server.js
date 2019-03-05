/** Core modules */
const express = require('express');

/** Local modules */
const logger = require('./logger');
const routes = require('./router');

/** Setting up app, router and defining port */
const router = express.Router();
const app = express();
const PORT = process.env.PORT || 3000;

/** Applying middlewares */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes(router));
app.use('**', (req,res) => res.status(404).send('Not Found'));

/** Listening to port */
app.listen(PORT, () => logger.log({
    level: 'info',
    message: `App running on port: ${ PORT }`
}));