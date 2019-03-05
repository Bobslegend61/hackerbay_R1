const jwt = require('jsonwebtoken');
const jsonPatch = require('fast-json-patch');
const path = require('path');
const request = require('request');
const fs = require('fs');
const sharp = require('sharp');

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
            return jsonPatch.applyOperation(document, patch).newDocument;
        }
    },

    /**
     * Check if the url is an image url
     *
     * @param {String} imageUrl
     * @returns Boolean if imageUrl is valid or not
     */
    validateImageUrl(imageUrl) {
        if(['.jpeg', '.png', '.jpg'].indexOf(path.extname(imageUrl)) === -1) {
            return false;
        }
        return true;
    },

    /**
     * Download the image sent by the user.
     *
     * @param {String} imageUrl image url
     * @param {*} callback A function that runs if this function is done excuting
     */
    downloadImage(imageUrl, callback) {
        request
            .get(imageUrl)
            .on('error', (err) => callback(err))
            .pipe(fs.createWriteStream(`img/${ path.parse(imageUrl).name }${ path.extname(imageUrl) }`))
            .on('close', () => callback(null, path.join(__dirname, `/img/${ path.parse(imageUrl).name }${ path.extname(imageUrl) }`)));     
    },

    /**
     * Resizes an image 
     *
     * @param {String} imageUrl
     * @param {*} callback Function containing the resized image
     */
    resizeImage(imageUrl, callback) {
        sharp(imageUrl)
            .resize(50, 50)
            .toFile(path.join(__dirname, `/img/${path.parse(imageUrl).name}_resized${path.extname(imageUrl)}`), () => {
                return callback(null, path.join(__dirname, `/img/${path.parse(imageUrl).name}_resized${path.extname(imageUrl)}`));
            });
    }
};