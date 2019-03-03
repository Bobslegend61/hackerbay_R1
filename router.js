
/**
 * Handles all routing processes
 *
 * @param {*} router
 */
const routes = (router) => {
    router.route('/')
        .get((req, res) => {
            res.send('working');
        });

    return router;
};

module.exports = routes;