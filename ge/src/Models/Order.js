const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const OrderSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "users"
	},
	product: {
		type: String,
		required: true
	},
	quantity: {
		type: String,
		required: true,
	},
	due_date: {
		type: Date,
		required: true
	}
});

module.exports = Order = mongoose.model("order", OrderSchema);
