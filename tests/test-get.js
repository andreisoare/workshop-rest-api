
process.env.NODE_ENV = 'test'
var request = require('supertest')
    , app = require('../index')
 
 
describe('GET /api/tweets/55231d90f4d19b49441c9cb9', function () {
    it('responds with 404', function (done) {
        request(app)
            .get('/api/tweets/55231d90f4d19b49441c9cb9')
            .expect(404, done)
    })
 
})
