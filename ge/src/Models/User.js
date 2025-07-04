const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	register_date: {
		type: Date,
		default: Date.now
	},
	avatar: {
		type: String
	},
	type: {
		type: String,
		required: true
	}
});

module.exports = User = mongoose.model("user", UserSchema);
