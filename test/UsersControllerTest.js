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
describe("Users", () => {

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
		email: "fabiobsantosss00@gmail.com",
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

					done()
				})


		}).timeout(10000);
	});
	describe("GET /users", () => {
		it('GET /users', (done) => {
			chai.request(app)
				.get('/api/users')
				.set('x-auth-token', token)
				.end((err, res) => {
					res.should.have.status(200);
					done()
				})
		}).timeout(10000);

		it('GET not admin /users', (done) => {
			chai.request(app)
				.get('/api/users')
				.set('x-auth-token', null)
				.end((err, res) => {
					res.should.have.status(401);
					done()
				})
		}).timeout(10000);
	})

	describe("POST /api/users", () => {
		let use = {
			email: "cliente@gmail.com",
			password: "123456",
			address: "smile",
			name: "oHHHH fabio santos"
		};
		let use1 = {
			email: "cliente@gmail.com",
			address: "smile",
			name: "oHHHH fabio santos"
		};
		it("POST /api/users", (done) => {
			chai.request(app)
				.post('/api/users')
				.set('x-auth-token', token)
				.send(use)
				.end((err, res) => {
					res.should.have.status(201);
					clientId = res.body.user._id;

					done()
				})
		}).timeout(10000);

		it("POST /api/users Status 400", (done) => {
			chai.request(app)
				.post('/api/users')
				.set('x-auth-token', token)
				.send(use1)
				.end((err, res) => {
					res.should.have.status(400);
					done()
				})
		}).timeout(10000);


		it("UPDATE /api/users/update", (done) => {
			let change = {
				info: "MasterBaiter",
				field: "name"
			};
			chai.request(app)
				.post('/api/users/update')
				.set('x-auth-token', token)
				.send(change)
				.end((err, res) => {
					res.should.have.status(200);
					chai.expect(res.body.name).to.equal(change.info);
					done()
				})
		}).timeout(10000)

		it("UPDATE No Effect /api/users/update", (done) => {
			let change = {
				info: "randoom",
				field: "namedddsfsa"
			};
			chai.request(app)
				.post('/api/users/update')
				.set('x-auth-token', token)
				.send(change)
				.end((err, res) => {
					chai.expect(res.body.name).not.to.equal(change.info);
					done()
				})
		}).timeout(10000)


		it("DELETE api/users/{id}", (done) => {
			chai.request(app)
				.delete('/api/users/' + clientId)
				.set('x-auth-token', token)
				.end((err, res) => {
					res.should.have.status(200);
					chai.expect(res.body._id).to.equal(clientId);
					chai.expect(res.body).to.contain.property('name');
					chai.expect(res.body).to.contain.property('email');
					chai.expect(res.body).to.contain.property('avatar');
					chai.expect(res.body).to.contain.property('register_date');
					chai.expect(res.body).to.contain.property('address');
					chai.expect(res.body).to.contain.property('type');
					chai.expect(res.body).to.contain.property('__v');

					done()
				})
		}).timeout(10000)

		it("DELETE Status 500 api/users/{id}", (done) => {
			chai.request(app)
				.delete('/api/users/' + 123)
				.set('x-auth-token', token)
				.end((err, res) => {
					res.should.have.status(500);

					done()
				})
		}).timeout(10000)
	});
	// describe("PATCH Change addresss and name", () => {
	// 	let change = {
	// 		_id: "5ddfbd6fcfdf03266ce3776f",
	// 		name: "MasterBaiter",
	// 		address: "smileeeee"
	// 	};
	// 	it("PATCH Change addresss and name", (done) => {
	// 		chai.request(app)
	// 			.patch('/api/users')
	// 			.set('x-auth-token', token)
	// 			.send(change)
	// 			.end((err, res) => {
	// 				res.should.have.status(200);
	//
	// 				done()
	// 			})
	// 	}).timeout(10000)
	//
	// })


});

