const jwt = require('jsonwebtoken');

/**
 *  Authentication middleware
 *  It validates the token sent by the user and proceeds if valid else reject
 *
 * @param {Object} req The request object from the client
 * @param {Object} res  The response object from the server
 * @param {*} next A function called when user is unthenticated
 * @returns
 */
module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if(!authorization) {
        return res.status(401).send('unauthorized');
    }

    jwt.verify(authorization, 'secret', (err, decoded) => {
        if(err && !decoded) {
            return res.status(401).send('unauthorized');
        }else {
            req.body.decoded = decoded;
            next();
        }
    });
};