const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if(!authorization) {
        return res.status(401).send('unauthorized');
    }

    jwt.verify(authorization, 'secret', (err, decoded) => {
        if(err) {
            return res.status(401).send('unauthorized');
        }else {
            next();
        }
    });
};