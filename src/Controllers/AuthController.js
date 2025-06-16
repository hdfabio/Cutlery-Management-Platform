const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//Auth Middleware: Protects routes, only allowing authenticated users
const auth = require('../../middleware/auth');

const UsersService = require('../Services/UsersService');
const usersService = new UsersService();

router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	res.header("Access-Control-Allow-Methods", "*");
	next();
});

/**
 * @route GET api/auth/user
 * @desc Get User Data
 * @access Private
 */
router.get('/user', auth, async (req, res) => {
	try {
		let user = await usersService.getUserId(req.user.user._id);

		if (!user) {
			res.status(404);
		}

		await res.json(user);
	} catch (err) {
		res.status(500).send(err);
	}
});

/**
 * @route POST api/auth
 * @desc Authenticate User
 * @access Public
 */
router.post(
	'/',
	[
		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Please insert a password with 6 or more characters'
		).exists().isLength({min: 6})
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({errors: errors.array()});
		}

		const {email, password} = req.body;
		let isMatch;
		try {
			if (!await usersService.checkUserByEmail(email)) {
				return res
					.status(404)
					.json({errors: [{msg: 'User not found!'}]});
			}

			const user = await usersService.getFullUserEmail(email);

			isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res.status(401).json({
					errors: [{msg: 'Invalid credentials'}]
				});
			}

			jwt.sign(
				{user},
				config.get('jwtSecret'),
				{expiresIn: "1d"},
				(err, token) => {
					if (err) {
						throw err;
					}
					res.json({token, user});
				}
			);

		} catch (err) {
			res.status(500).send(err);
		}
	}
);

/**
 * Deletes logged in user
 */
router.delete('/', auth, async (req, res) => {
	try {
		let user = await usersService.removeUser(req.user.user._id);

		res.status(200).send(user);
	} catch (e) {
		res.status(500).send(e);
	}
});


module.exports = router;
