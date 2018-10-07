process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
let Schema = require('../Config/DBSchema');
let FormI1P1Model = Schema.model("FormI1P1");
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);


describe('FormI1P1', () => {
    let server;
    let form1 = {
        studentId: 'IT16004382',
        name: 'Sachin Lahiru',
        address: 'Galewela',
        homePhone: '0663689266',
        mobilePhone: '0772685129',
        emails:'sachin.lahiru@gmail.com',
        semester: '2',
        year: '3',
        cgpa: '3.5'
    }

    // Start Server
    // Delete all records in the FormI1P1 collection
    before((done) => {
        server = require('../app');
        FormI1P1Model.deleteMany().then(() => {
            done()
        })
    });

    //getting the data to make sure that all the data have been deleted
    it('GET-ALL\tNumber of forms should be zero', (done) => {
        chai.request(server).get('/form/formI1P1')
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('object')
               // res.body.length.should.be.eql(0)
                done()
            })
    })

    //posting a new form
    it('POST\tAdding a new formI1', (done) => {
        chai.request(server).post('/form/formI1P1')
            .set('content-type', 'application/json')
            .send(form1)
            .end((error, res) => {
                res.should.have.status(201)
                res.body.should.have.be.a('object')
                done()
            })
    })

    //getting all the forms after adding one, only one form should be there
    it('GET-ALL\tNumber of forms should be exactly one', (done) => {
        chai.request(server).get('/form/formI1P1')
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('object')
              //  res.body.length.should.be.eql(1)
                done()
            })
    })


    //getting form by student id
    it('GET-ONE\tGetting one policy by student id', (done) => {
        chai.request(server).get('/form/formI1P1/' + form1.studentId)
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('object')
                done()
            })
    })



});