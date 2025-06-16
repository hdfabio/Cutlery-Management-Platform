var http = require('http');
const express = require('express');
const path = require('path');
const {connect}= require('./config/db');
const app = express();

//Connect DTO DB
connect()

//Body parser Middleware
app.use(express.json({extended: false}));

//Use Routes
app.use('/api/users', require('./src/Controllers/UsersController'));
app.use('/api/orders', require('./src/Controllers/OrdersController'));
app.use('/api/auth', require('./src/Controllers/AuthController'));

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	//Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 5002;

http.createServer(app).listen(port, '127.0.0.1');
//app.listen(port, () => console.log(`Server started on port ${port}`));
module.exports = app
