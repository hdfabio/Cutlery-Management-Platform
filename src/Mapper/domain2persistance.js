const verifier = require("./Utils");
const User = require('../Models/User');
const Order = require('../Models/Order');

/**
 * @return {User}
 */
function User2Persistence(domain) {
	domain = verifier(domain);

	if (!domain) return null;

	return new User({
		name: domain.name,
		email: domain.email,
		password: domain.password,
		avatar: domain.avatar,
		register_date: domain.register_date,
		address: domain.address,
		type: domain.type,
	});
}

/**
 * @return {Order}
 */
function Order2Persistence(domain) {
	domain = verifier(domain);

	if (!domain) return null;
	return new Order({
		user: domain.user_id,
		product: domain.product,
		quantity: domain.quantity,
		due_date: domain.due_date
	});
}

module.exports = {User2Persistence, Order2Persistence};
