const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = require('chai').assert;

/** @test {API} */
describe('API', function() {
    const url = 'localhost:3000';
    /** @test {API#/login} */
    describe('/login', function() {
        it('Should pass some assertions', function(done) {
            chai.request(url)
                .post('/login')
                .send({
                    username: 'Alabi',
                    password: 'pass'
                })
                .end((err, res) => {
                    const { body, status } = res;
                    assert.equal(status, 200, 'Status code for the request');
                    assert.isNull(err, 'should not have any error');
                    assert.typeOf(body, 'object', 'Response object');
                    assert.isTrue(body.data.hasOwnProperty('token'), 'Token returned for authentication');
                    done();
                });
        });
    });

    /** @test {API#/patch} */
    describe('/patch', function() {
        it('Should be protected and reject this request with a status code of 401', function(done) {
            chai.request(url)
                .patch('/patch')
                .end((err, res) => {
                    const { text, status } = res;
                    assert.equal(text, 'unauthorized');
                    assert.equal(status, 401, 'Unauthorized');
                    done();
                });
        });

        it('Should authenticate and respond with 201 created response', function(done) {
            chai.request.agent(url)
                .post('/login')
                .send({ username: 'Alabi', password: 'p' })
                .then(function(res) {
                    assert.isDefined(res.body.data.token, 'Token for next request');
                    return chai.request.agent(url)
                        .patch('/patch')
                        .send({
                            document: { firstName: 'Albert', contactDetails: { phoneNumbers: [] } },
                            patch: [
                                { 'op': 'replace', 'path': '/firstName', 'value': 'Joachim' },
                                { 'op': 'add', 'path': '/lastName', 'value': 'Wester' },
                                { 'op': 'add', 'path': '/contactDetails/phoneNumbers/0', 'value': { 'number': '555-123' }  }
                            ]
                        })
                        .set('Authorization', res.body.data.token)
                        .then(function(res) {
                            const { statusCode, body: { data: { patchResult } } } = res;
                            assert.equal(statusCode, 201);
                            assert.typeOf(patchResult, 'object');
                            done();
                        });
                });
        });
    });

    /** @test {API#/thumbnail} */
    describe('/thumbnail', function() {
        this.timeout(5000);
        it('Should return a statuscode of 200', function(done) {
            chai.request.agent(url)
                .post('/login')
                .send({ username: 'Alabi', password: 'p' })
                .then(function(res) {
                    assert.isDefined(res.body.data.token, 'Token for next request');
                    return chai.request.agent(url)
                        .post('/thumbnail')
                        .set('Authorization', res.body.data.token)
                        .send({
                            url: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'
                        })
                        .then(function(res) {
                            const { statusCode } = res;
                            assert.equal(statusCode, 200);
                            done();
                        });
                });
        });
    });
});
