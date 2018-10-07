process.env.NODE_ENV        = 'test';
let Mongoose                = require('../Config/DBSchema');
let Company                 = Mongoose.model("Company");
//let OrderModel              = Mongoose.model('Order');
let chai                    = require('chai');
let chaiHttp                = require('chai-http');
let should                  = chai.should();

chai.use(chaiHttp);

describe('Order Test', () => {

    // declare server variable.
    let server;

    // create mock data Company object.
    let company = {
        
        companyName:"Apic",
        companyContact:"0112556780",
        address:"Koswattha, Battharamulla",
        email:"apic@gmil.com"
        
    }

    /**
     * Negative test case for create new order
     * We pass incorect data type value with request body.
     */

    
    let incorrectCompany = {
        
        companyName:"Company 1",
        companyContact:"011255678012",
        address:"Malabe",
        email:"apic@gmil.com",
        sice:"2000"
        
    }

    
    // Start Server
    // Delete all records in the businessPolicies collection
    before((done) => {
        server = require('../app')
        Company.deleteMany({}, (error) => {
            done()
        })
    });


    // Positive test.
    it('POST\tAdding a new company', (done) => {
        chai.request(server).post('/company')
            .set('content-type', 'application/json')
            .send(company)
            .end((error, res) => {
                res.should.have.status(201)
                res.body.should.have.be.a('object')
                done()
            })
    })

    // // Positive test.
    // it('GET-ALL\tGet all orders', (done) => {
    //     chai.request(server).get('/orders')
    //         .end((error, res) => {
    //             res.should.have.status(200)
    //             res.body.should.have.be.a('array')
    //             res.body.length.should.be.eql(1)
    //             done()
    //         })
    // })


    // Negative test case for create new order. 
    it('POST\tAdding a new order', (done) => {
        chai.request(server).post('/company')
            .set('content-type', 'application/json')
            .send(incorrectCompany)
            .end((error, res) => {
                res.should.have.status(201)
                res.body.should.have.be.a('object')
                done()
            })
    })



   

})