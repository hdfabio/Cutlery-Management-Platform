const verifier = require('../Mapper/Utils');

const d2p = require("../Mapper/domain2persistance");
const d2d = require("../Mapper/dto2domain");

const UserRepository = require("../Repository/UsersRepository");
const repo = new UserRepository();

class UsersService {
	/**
	 * Checks if user exists in database
	 * Searches by Email
	 *
	 * True is user already exists
	 * @param email: User email to check
	 * return {boolean}
	 */
	async checkUserByEmail(email) {
		if (!email) return false;
		const user = await repo.Users().findOne({email});
		return user !== null;
	}

	/**
	 * Checks if user exists in database
	 * Searches by Id
	 *
	 * True is user already exists
	 * @param id: User id
	 * return {boolean}
	 */
	async checkUserById(id) {
		if (!id) return false;
		const user = await repo.Users().findOne({_id: id});

		return user !== null;
	}

	/**
	 * Get user by email
	 *
	 * @param email
	 * @returns {Promise<Query>}
	 */
	async getUserEmail(email) {
		return repo.Users().findOne({email}).select('-password');
	}

	/**
	 * Get full user by email
	 *
	 * @param email
	 * @returns {Promise<Query>}
	 */
	async getFullUserEmail(email) {
		return repo.Users().findOne({email});
	}

	/**
	 * Get user by id
	 *
	 * @param id
	 * @returns {Promise<Query>}
	 */
	async getUserId(id) {
		return repo.Users().findOne({_id: id}).select('-password');
	}

	/**
	 * Creates a user based on a DTO
	 *
	 * @param dto
	 * @returns {Promise<null>}
	 */
	async saveUser(dto) {
		if (!verifier(dto)) return null;

		let user = await d2d.User2Domain(dto);
		user = new d2p.User2Persistence(user);

		return await user.save();
	}

	/**
	 * Delete user by id
	 *
	 * @param id
	 * @returns {Promise<boolean|*>}
	 */
	async deleteUser(id) {
		if (!id) return false;

		return repo.Users().findByIdAndDelete(id);
	}

	/**
	 * Update User info
	 * @param user
	 * @returns {Promise<*>}
	 */
	async updateUser(user) {
		return await user.save();
	}

	/**
	 * Get all users name
	 * @returns {Promise<*>}
	 */
	async getUsers() {
		return await repo.Users().find({type: "Customer"}).select('name');
	}

	/**
	 * Admin updates any user
	 * @param user - User info to update
	 * @returns {Promise<*>}
	 */
	async adminUpdateUser(user) {
		let c = await repo.Users().findOne({_id: user._id});

		c.name = user.name;
		if (user.address.length !== 0) {
			c.address = user.address;
		}

		await c.save();

		return c;
	}

	async removeUser(_id) {
		return await repo.Users().findByIdAndDelete(_id);
	}
}

module.exports = UsersService;
