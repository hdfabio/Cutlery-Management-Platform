const bcrypt = require("bcryptjs");

class AuthService {
	/**
	 *
	 * @param password
	 * @returns {Promise<void>}
	 */
	async hashPassword(password) {
		const salt = await bcrypt.genSalt(10);
		return await bcrypt.hash(password, salt);
	}
}

module.exports = AuthService;
