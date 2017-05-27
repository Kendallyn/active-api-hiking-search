global.DATABASE_URL = 'mongodb://admin:password@ds143181.mlab.com:43181/active-api-hiking-search'

const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
chai.use(chaiHttp);

var server = require('../server.js');
var Activity = require('../models/activity.js');

describe(Activity, function () {
    it('should list activities on GET', function (done) {
        chai.request(app)
            .get('/activity/:location')
            .then(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
});
