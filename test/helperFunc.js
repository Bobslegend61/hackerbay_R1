const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = require('chai').assert;
const _helper = require('../helperFunc');
const path = require('path');

/** @test {_helper} */
describe('Helper function', function() {
    /** @test {_helper.generateToken()} */
    describe('_helper.generateToken', function() {
        const token = _helper.generateToken('Alabi');

        it('Should return a string', function() {
            assert.isString(token, 'Token for authentication');
        });

        it('should have a length of 3 when splited with the . delimeter', function() {
            assert.equal(token.split('.').length, 3, 'Three parts of a token');
        });
    });

    /** @test {_helper.applyPatch()} */
    describe('_helper.applyPatch', function() {
        const document = { firstName: 'Albert', contactDetails: { phoneNumbers: [] } };
        const patch = [
            { 'op': 'replace', 'path': '/firstName', 'value': 'Joachim' },
            { 'op': 'add', 'path': '/lastName', 'value': 'Wester' },
            { 'op': 'add', 'path': '/contactDetails/phoneNumbers/0', 'value': { 'number': '555-123' }  }
        ];

        const newDoc = _helper.applyPatch(document, patch);
        it('should return type object', function() {
            assert.typeOf(newDoc, 'object', 'Modified doc');
        });
    });

    /** @test {_helper.validateImageUrl()} */
    describe('_helper.validateImageUrl', function() {
        it('Should return a boolean', function() {
            assert.isBoolean(_helper.validateImageUrl('example.png'), 'True or false');
        });

        it('Should return false', function() {
            assert.isFalse(_helper.validateImageUrl('example.html'));
        });
    });

    /** @test {_helper.downloadImage()} */
    describe('_helper.downloadImage', function() {
        it('Should download the image', function() {
            _helper.downloadImage('https://homepages.cae.wisc.edu/~ece533/images/cat.png', function(err, downloadedPath) {
                assert.equal(downloadedPath, path.join(__dirname, '../img/cat.png'));
            });
        });
    });

    /** @test {_helper.resizeImage()} */
    describe('_helper.resizeImage', function() {
        it('Should resize the cat image', function() {
            _helper.resizeImage( path.join(__dirname, '../img/cat.png'), function(err, resizedPath) {
                assert.equal(resizedPath, path.join(__dirname, '../img/cat_resized.png'));
            });
        });
    });
});

