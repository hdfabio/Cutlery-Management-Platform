const Order = require("../Models/Order");

class OrdersRepository {
	_orders = Order;

	Orders() {
		return this._orders;
	}
}

module.exports = OrdersRepository;
