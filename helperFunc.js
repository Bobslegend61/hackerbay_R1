const jwt = require('jsonwebtoken');
const jsonPatch = require('fast-json-patch');
module.exports = {
    /**
     * Generates a token for future authentication
     * @param {String} username Username of signedin user.
     * @returns {string} A token string.
     */
    generateToken(username) {
        return jwt.sign({ username }, 'secret', { expiresIn: '1h' });
    },

    /**
     * Apply patch to a document
     *
     * @param {Object} document The document to which the patch will be applied
     * @param {(Object|Array)} patch The patch to apply to the document
     * @returns {Object} Result from the applied patch
     */
    applyPatch(document, patch) {
        if(patch.length !== undefined) {
            return jsonPatch.applyPatch(document, patch).newDocument;
        }else {
            return jsonPatch.applyOperation(document, patch);
        }
    }
};