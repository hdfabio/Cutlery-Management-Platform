const verifier = require('../Mapper/Utils');

const OrdersRepository = require("../Repository/OrdersRepository");
const repo = new OrdersRepository();

//Mappers
const d2p = require("../Mapper/domain2persistance");
const d2d = require("../Mapper/dto2domain");

class OrdersService {
	/**
	 * Returns all orders
	 * @returns {Promise<void>}
	 */
	async allOrders() {
		const orders = await repo.Orders().find();

		return orders.length === 0 ? Array() : orders;
	}

	/**
	 * Returns all orders create by the user of {@param id}
	 *
	 * @returns {Promise<void>}
	 */
	async userOrders(id) {
		return await repo.Orders().find({user: id});
	}

	/**
	 * Saves an order
	 *
	 * @param dto
	 * @returns {null|undefined}
	 */
	async saveOrder(dto) {
		if (!verifier(dto)) return null;

		let order = await d2d.Order2Domain(dto);
		order = d2p.Order2Persistence(order);

		return await order.save();
	}

	async deleteOrder(id) {
		return repo.Orders().findByIdAndDelete(id);
	}

	async updateOrder(id, info) {
		return repo.Orders().findByIdAndUpdate(id, info);
	}
}

module.exports = OrdersService;
