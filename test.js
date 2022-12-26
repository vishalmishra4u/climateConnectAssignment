let server = require('./app');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe('/POST getRiskProfile', () => {
    it('Calculates the user profile and returns risk', (done) => {
        let request = {
            "age": 72,
            "dependents": 0,
            "income": 100000,
            "maritalStatus": "married",
            "vehicle": { "year": 2018 },
            "house": { "ownership_status": "owned" },
            "riskQuestions": [1, 0, 0]
        }
        chai.request(server)
            .post('/getRiskProfile')
            .send(request)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('auto');
                res.body.should.have.property('disability');
                res.body.should.have.property('home');
                res.body.should.have.property('life');
                done();
            });
    });

});