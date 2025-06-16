const User = require('../Domain/User');
const Order = require('../Domain/Order');

const AuthService = require("../Services/AuthService");
const verifier = require("./Utils");

const gravatar = require("gravatar");
const authService = new AuthService();

/**
 * If it is returning null you probably passed some value as null
 * If you don't already have an avatar url you can pass an empty string
 *
 * @return {User}
 */
async function User2Domain(dto) {
	dto = verifier(dto);

	if (!dto) return null;

	let user = new User();

	const password = await authService.hashPassword(dto.password);

	user.name = dto.name;
	user.email = dto.email;
	user.password = password;
	user.avatar = dto.avatar ? dto.avatar : gravatar.url(dto.email, {
		s: '200',
		r: 'pg',
		d: 'mm'
	});
	user.register_date = dto.register_date;
	user.address = dto.address;
	user.type = dto.type;

	return user;
}

/**
 * If it is returning null you probably passed some value as null
 * If you don't already have an avatar url you can pass an empty string
 *
 * @return {Order}
 */
async function Order2Domain(dto) {
	dto = verifier(dto);

	if (!dto) return null;
	console.log(dto);
	let order = new Order();
	order.user_id = dto.user;
	order.product = dto.product;
	order.quantity = dto.quantity;
	order.due_date = dto.due_date;

	return order;
}

module.exports = {
	User2Domain, Order2Domain
};
