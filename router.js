const User = require('./models/User');
const auth = require('./auth');
/**
 * Handles all routing processes
 *
 * @param {*} router
 */
const routes = (router) => {
    router.route('/login')
        .post((req, res) => {
            let { username, password } = req.body;
            if(!username || !password) {
                return res.status(401).send('Invalid Field');
            }
            
            let user = new User(username, password);
            res.status(200).json({ success: true, data: user.sendUserDetails() });
        });
    
    router.route('/test')
        .get(auth, (req, res) => {
            res.send('working');
        });
    return router;
};

module.exports = routes;