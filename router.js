const _helper = require('./helperFunc');
const auth = require('./auth');
/**
 *
 *
 * @param {Object} router
 * @returns {Object} Router object
 */
const routes = (router) => {
    router.route('/login')
        .post((req, res) => {
            let { username, password } = req.body;
            if(!username || !password) {
                return res.status(401).send('Invalid Field');
            }
            const token = _helper.generateToken(username);
            res.status(200).json({ success: true, data: { username, token }  });
        });
    
    router.route('/patch')
        .patch(auth, (req, res) => {
            let { document, patch } = req.body;
            if(!document || typeof(document) !== 'object' || !patch || typeof(patch) !== 'object') {
                return res.status(401).send('Invalid Field');
            }
            const patchResult = _helper.applyPatch(document, patch);
            const { username } = req.body.decoded;
            const token = _helper.generateToken(username);
            res.status(201).json({ success: true, data: { username, token, patchResult }  });
        });
    return router;
};

module.exports = routes;