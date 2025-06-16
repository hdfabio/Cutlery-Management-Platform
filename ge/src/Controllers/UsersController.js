const gravatar = require('gravatar');
const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const jwt = require("jsonwebtoken");
const config = require("config");

const UsersService = require("../Services/UsersService");
const AuthService = require("../Services/AuthService");

const UserDTO = require("../DTO/UserDTO");

const auth = require('../../middleware/auth');

const authService = new AuthService();
const usersService = new UsersService();

router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); // update DTO match the domain you will make the request
	// from
	res.header("Access-Control-Allow-Headers", "*");
	res.header("Access-Control-Allow-Methods", "*");
	next();
});

/**
 * @route POST api/users
 * @desc Register new customer\
 * @access Public
 */
router.post(
	'/',
	[
		check('name', 'Name is required')
			.not()
			.isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Please insert a password with 6 or more characters'
		).isLength({
			min: 6
		}),
		check('address', "Please insert a valid address").isLength({min: 4})
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({errors: errors.array()});
		}

		const {name, email, password, address} = req.body;

		try {
			//Check for existing user:
			if (await usersService.checkUserByEmail(email)) {
				res.status(400).json({errors: [{msg: 'User already exists!'}]});
			}

			const u = new UserDTO();
			u.name = name;
			u.email = email;
			u.password = password;
			u.address = address;
			u.type = "Customer";

			await usersService.saveUser(u);

			const user = await usersService.getUserEmail(email);

			jwt.sign(
				{user},
				config.get('jwtSecret'),
				{expiresIn: "1h"},
				(err, token) => {
					if (err) {
						throw err;
					}
					res.status(201).json({token, user});
				}
			);
		} catch (err) {
			res.status(500).json(err);
		}
	}
);


/**
 * @route POST api/users/admin
 * @desc Register new admin
 * @access Public
 */
router.post(
	'/admin',
	[
		check('name', 'Name is required')
			.not()
			.isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Please insert a password with 6 or more characters'
		).isLength({
			min: 6
		}),
		check('address', "Please insert a valid address").isLength({min: 4})
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({errors: errors.array()});
		}

		const {name, email, password, address} = req.body;

		try {
			//Check for existing user:
			if (await usersService.checkUserByEmail(email)) {
				res.status(400).json({errors: [{msg: 'User already exists!'}]});
			}

			const u = new UserDTO();
			u.name = name;
			u.email = email;
			u.password = password;
			u.address = address;
			u.type = "Admin";

			await usersService.saveUser(u);

			const user = await usersService.getUserEmail(email);

			jwt.sign(
				{user},
				config.get('jwtSecret'),
				{expiresIn: "1h"},
				(err, token) => {
					if (err) {
						throw err;
					}
					res.status(201).json({token, user});
				}
			);
		} catch (err) {
			res.status(500).send(err);
		}
	}
);

/**
 * Delete user if Admin, otherwise dont
 *
 * @route Delete api/users/{id}
 * @desc Delete User Field
 * @access Private
 **/
router.delete('/:id', auth, async (req, res) => {
	try {
		if (!await usersService.checkUserById(req.user.user._id)) {
			res.status(404).send("User doesn't exist")
		}

		let user = await usersService.getUserId(req.user.user._id);

		let deleted = null;

		if (user.type === "Admin" && user) {
			deleted = await usersService.deleteUser(req.params.id);
			if (deleted) {
				res.status(200).send(deleted)
			} else {
				res.status(400).send('Had trouble deleting this user')
			}
		}

	} catch (err) {
		res.status(500).send(err);
	}
});

/**
 * @route POST api/users/update
 * @desc Update User Field
 * @access Private
 */
router.post('/update', auth, async (req, res) => {
	try {
		const {_id: id} = req.user.user;

		if (!await usersService.checkUserById(id)) {
			res.status(404).send("User doesn't exist")
		}

		let user = await usersService.getUserId(id);

		const {info, field} = req.body;
		switch (field) {
			case 'name': {
				user.name = info;
				user = await usersService.updateUser(user);
				break;
			}

			case 'email': {
				user.email = info;
				user.avatar = gravatar.url(user.email, {
					s: '200',
					r: 'pg',
					d: 'mm'
				});
				user = await usersService.updateUser(user);
				break;
			}

			case 'address': {
				user.address = info;
				user = await usersService.updateUser(user);
				break;
			}

			case 'password': {
				user.password = await authService.hashPassword(info);
				user = await usersService.updateUser(user);
				break;
			}

			default: {
				break;
			}
		}

		user = await usersService.getUserId(id);

		await res.status(200).json(user);
	} catch (err) {
		res.status(500).send(err);
	}
});

/**
 * Get Customers
 * @access private: Only Admins
 */
router.get("/", auth, async (req, res) => {
	try {
		const {user} = req.user;

		if (user.type.toString() !== "Admin") {
			res.status(403).send("You're not an admin");
		}

		let users = await usersService.getUsers();

		res.status(200).json(users);
	} catch (err) {
		res.status(500).send(err);
	}
});

/**
 * Admin: Update User
 */
router.patch("/", auth, async (req, res) => {
	const {user} = req.user;
	if (!(user.type.toString() === "Admin")) {
		res.status(403).send("User is not admin!");
	}

	const customer = req.body;

	let updatedUser = await usersService.adminUpdateUser(customer);
	res.status(200).send(updatedUser);
});

module.exports = router;
