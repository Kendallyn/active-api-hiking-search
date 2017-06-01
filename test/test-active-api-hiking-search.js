global.DATABASE_URL = 'mongodb://admin:password@ds143181.mlab.com:43181/active-api-hiking-search'

const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
chai.use(chaiHttp);

const {
    app, runServer, closeServer
} = require('../server');

var server = require('../server.js');
var Activity = require('../models/activity.js');

describe('active-api-hiking-search', function () {
    before(function (done) {
        server.runServer(function () {
            Activity.create({
                name: 'Recreational Hike'
            }, {
                name: 'Outdoor Adventure'
            }, function () {
                done();
            });
        });
    });

    describe(Activity, function () {
        it('should list activities on GET', function (done) {
            chai.request(app)
                .get('/activity/:location')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    done();
                });
        });

        it('should add an activity on POST', function (done) {
            chai.request(app)
                .post('/add-to-favorites/')
                .send({
                    'name': 'Hiker'
                })
                .end(function (err, res) {
                    should.equal(err, null);
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('_id');
                    res.body.name.should.be.a('string');
                    res.body._id.should.be.a('string');
                    res.body.name.should.equal('Hiker');
                    done();
                });
        });

        it('should delete an item on DELETE', function (done) {
            chai.request(app)
                .delete('/')
                .end(function (err, res) {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    after(function (done) {
        Activity.remove(function () {
            done();
        });
    });
});
