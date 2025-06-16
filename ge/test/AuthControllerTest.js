process.env.NODE_ENV = 'test';
const chai = require('chai');

const chaiHttp = require('chai-http');
const app = require('../server');
const {connect, disconnect} = require('../config/db');
// Configure chai
chai.use(chaiHttp);
chai.should();

let token = "";
let order = "";
let clientId = "";
describe("Auth", () => {

	before((done) => {
		connect()
			.then(() => done())
			.catch((err) => done(err));

	});
	after((done) => {
		disconnect()
			.then(() => done())
			.catch((err) => done(err));
	});
	let auth = {
		email: "fabiobsantos00@gmail.com",
		password: "123456",
		address: "smile",
		name: "oHHHH fabio santos"
	};
	describe("POST /api/users/admin", () => {

		it("should create admin", (done) => {
			chai.request(app)
				.post('/api/users/admin')
				.send(auth)
				.end((err, res) => {
					token = res.body.token;
					res.should.have.status(201);
					chai.expect(res.body.user.email).to.equal(auth.email)
					chai.expect(res.body.user.type).to.equal("Admin");

					done()
				})


		}).timeout(10000);

		let miss = {
			email: "fabiobsantos00@gmail.com",
			address: "smile",
			name: "oHHHH fabio santos"
		};
		it("should not create admin", (done) => {
			chai.request(app)
				.post('/api/users/admin')
				.send(miss)
				.end((err, res) => {
					res.should.have.status(400);
					done()
				})

		}).timeout(10000);

	})
	describe("POST /api/auth", () => {
		let pass1 = {
			email: "fabiobsantos00@gmail.com",
			password: "123456dddd"
		};
		let pass2 = {
			email: "fabiobsantos00@gmail.com",
			password: "1"
		};
		it("should get token", (done) => {
			let pass = {
				email: "fabiobsantos00@gmail.com",
				password: "123456"
			};

			chai.request(app)
				.post('/api/auth')
				.send(pass)
				.end((err, res) => {
					res.should.have.status(200);
					chai.expect(res.body.user.email).to.equal(pass.email);
					chai.expect(res.body).to.contain.property('token');
					done()
				})
		}).timeout(10000);

		it("bad credential check", (done) => {
			chai.request(app)
				.post('/api/auth')
				.send(pass1)
				.end((err, res) => {
					res.should.have.status(503);

					done();
				})

		}).timeout(10000);


		it("request should cotain all reqs", (done) => {
			chai.request(app)
				.post('/api/auth')
				.send(pass2)
				.end((err, res) => {
					res.should.have.status(400);
					done();
				})

		}).timeout(10000);

	})
	describe("GET /api/auth/user", () => {
		//Test get informacacao do user
		it("should get user info", (done) => {
			chai.request(app)
				.get('/api/auth/user')
				.set('x-auth-token', token)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					chai.expect(res.body.email).to.equal(auth.email)
					done();
				})

		}).timeout(10000);

		it("unauthorized", (done) => {
			chai.request(app)
				.get('/api/auth/user')
				.set('x-auth-token', null)
				.end((err, res) => {
					res.should.have.status(401);

					done();
				})

		}).timeout(10000);

	})


})

