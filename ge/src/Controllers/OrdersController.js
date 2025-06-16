const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const auth = require('../../middleware/auth');

//DTO
const OrderDTO = require("../DTO/OrderDTO");

//Services
const UserServices = require("../Services/UsersService");
const OrderServices = require("../Services/OrdersService");

const userServices = new UserServices();
const orderServices = new OrderServices();

router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	res.header("Access-Control-Allow-Methods", "*");
	next();
});

/**
 * @route GET api/orders
 * @desc Get All Orders
 * @access Private
 */
router.get('/', auth, async (req, res) => {
	try {
		const id = req.user.user._id;
		console.log(req)
		if (!await userServices.checkUserById(id)) {
			res.status(404).message("User not found!")
		}

		const user = await userServices.getUserId(id);
		let result;

		if (user.type === ("Admin")) {
			result = await orderServices.allOrders();
		} else {
			result = await orderServices.userOrders(id);
		}

		if (result === null) {
			res.status(404);
		} else if (result.length === 0) {
			res.status(204);
		} else {
			res.status(200);
		}
		res.send(result);
	} catch (err) {
		res.status(500).send(err);
	}
});

/**
 * @route POST api/orders
 * @desc New Order
 * @access Private
 */
router.post('/', [
	check('product', 'Product is required')
		.not()
		.isEmpty(),
	check('quantity', 'Please include a valid quantity').isNumeric(),
	check(
		'due_date',
		'Due Date should be: YYYY-MM-DD'
	).isISO8601().toDate()
], auth, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({errors: errors.array()});
	}

	try {
		const {_id} = req.user.user;
		const user = await userServices.checkUserById(_id);
		if (!user) {
			return res.status(404).send('User Not Found');
		}

		const {product, due_date, quantity} = req.body;
		let order = new OrderDTO();

		order.user = _id;
		order.product = product;
		order.quantity = quantity;
		order.due_date = due_date;

		order = await orderServices.saveOrder(order);

		await res.status(201).send(order);
	} catch (err) {
		res.status(500).send(err);
	}
});

/**
 * @route Delete api/orders/:id
 * @desc Delete order of :id
 * @access Private
 */
router.delete('/:id', auth, async (req, res) => {
	try {
		const {_id} = req.user.user;
		const user = await userServices.checkUserById(_id);
		if (!user) {
			return res.status(404).send('User Not Found');
		}

		const deleted = await orderServices.deleteOrder(req.params.id);
		if (deleted) {
			res.status(200).send(deleted)
		}
	} catch (err) {
		res.status(500).send(err);
	}
});

/**
 * @route PATCH api/orders/:id
 * @desc Update order of :id
 * @access Private
 */
router.patch('/:id', auth, async (req, res) => {
	try {
		const {_id} = req.user.user;
		const user = await userServices.checkUserById(_id);
		if (!user) {
			return res.status(404).send('User Not Found');
		}

		const updated = await orderServices.updateOrder(req.params.id, req.body);

		res.send(updated);
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = router;
