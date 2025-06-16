const User = require("../Models/User");

class UsersRepository {
	_users = User;

	Users() {
		return this._users;
	}
}

module.exports = UsersRepository;
