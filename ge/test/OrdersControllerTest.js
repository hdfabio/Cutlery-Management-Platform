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
describe("Orders", () => {

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
		email: "fabiobsantoss00@gmail.com",
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

	describe("POST /api/orders", () => {
		it('POST /api/orders', (done) => {
			let order = {
				product: "bola",
				quantity: 12,
				due_date: "2019-12-25"
			};
			chai.request(app)
				.post('/api/orders')
				.set('x-auth-token', token)
				.send(order)
				.end((err, res) => {
					res.should.have.status(201);

					done()
				})
		}).timeout(10000);

		it('POST Status 400 /api/orders', (done) => {
			let order = {
				product: "bola",
				due_date: "2019-12-25"
			};
			chai.request(app)
				.post('/api/orders')
				.set('x-auth-token', token)
				.send(order)
				.end((err, res) => {
					res.should.have.status(400);
					done()
				})
		}).timeout(10000);
	});

	describe("GET /api/orders", () => {
		it('GET api/orders', (done) => {
			chai.request(app)
				.get('/api/orders')
				.set('x-auth-token', token)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					order = res.body[0]._id
					chai.expect(order).not.to.equal(null);

					done();
				})
		}).timeout(10000);

	})

	describe("PATCH /api/orders/:id", () => {
		let oo = {
			product: "bolinha",
			quantity: 12,
			due_date: "2019-12-25"
		}
		it("PATCH /api/orders:id", (done) => {
			chai.request(app)
				.patch('/api/orders/' + order)
				.set('x-auth-token', token)
				.send(oo)
				.end((err, res) => {
					res.should.have.status(200);
					done()
				})
		}).timeout(10000);
		it("PATCH no id /api/orders:id", (done) => {
			chai.request(app)
				.patch('/api/orders/' + 123)
				.set('x-auth-token', token)
				.send(oo)
				.end((err, res) => {
					res.should.have.status(500);
					done()
				})
		}).timeout(10000);
	})

	describe("DELETE /api/orders/:id", () => {
		it("DELETE api/orders/:id", (done) => {
			chai.request(app)
				.delete('/api/orders/' + order)
				.set('x-auth-token', token)
				.end((err, res) => {
					res.should.have.status(200);
					done()
				})
		}).timeout(10000);
		it("DELETE no id api/orders/:id", (done) => {
			chai.request(app)
				.delete('/api/orders/' + 123)
				.set('x-auth-token', token)
				.end((err, res) => {
					res.should.have.status(500);
					done()
				})
		}).timeout(10000);
	})




})

