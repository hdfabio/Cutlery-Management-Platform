const mongoose = require("mongoose");
const config = require("config");

//MongoDB Config
const db = config.get("mongoURI");

//Connect to MongoDB
const connectDB = async () => {
	try {
		if (process.env.NODE_ENV  === 'test') {
			const Mockgoose = require('mockgoose').Mockgoose;
			const mockgoose = new Mockgoose(mongoose);
			await mockgoose.prepareStorage()
				.then(() => {
					mongoose.connect(db, {
						useNewUrlParser: true,
						useCreateIndex: true,
						useFindAndModify: false,
						useUnifiedTopology: true
					})
				})
			console.log("MongoDB Test Connected...");
		} else {
			await mongoose.connect(db, {
				useNewUrlParser: true,
				useCreateIndex: true,
				useFindAndModify: false,
				useUnifiedTopology: true
			});
			console.log("MongoDB Connected...");
		}

	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};
const close = async () =>{
	await mongoose.disconnect();
}

module.exports.connect = connectDB;
module.exports.disconnect = close;
