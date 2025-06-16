const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
	const token = req.header('x-auth-token');

	//Check for token
	if (!token) {
		return res.status(401).json({msg: 'No token, authorization denied!'});
	}
	try {
		//Verify token
		//Add user from payload
		req.user = jwt.verify(token, config.get('jwtSecret'));
		next();
	} catch (e) {
		res.status(401).json({msg: 'Token is not valid!'});
	}
};
