process.env.NODE_ENV = 'test';
require('mongoose');

const chai = require('chai');
const chaiHttp = require('chai-http');
const ExampleModel = require('../models/ExampleModel');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Example', () => {
    beforeEach((done) => {
        process.env.NODE_ENV = 'test';
        ExampleModel.remove({}, () => {
            done();
        });
    });

    describe('/GET example', () => {
        beforeEach((done) => {
            const example = new ExampleModel({
                test: 'Hello world',
            });

            example.save(() => {
                done();
            });
        });

        it('it should GET all examples', (done) => {
            chai.request(server)
                .get('/api/example')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    res.body.data.length.should.be.eql(1);
                    res.body.data[0].should.have.property('test').eql('Hello world');
                    done();
                });
        });
    });

    describe('/POST example', () => {
        it('it should not POST an example without the test field', (done) => {
            chai.request(server)
                .post('/api/example')
                .send({})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('test');
                    res.body.errors.test.should.have.property('kind').eql('required');
                    done();
                });
        });
    });
});
