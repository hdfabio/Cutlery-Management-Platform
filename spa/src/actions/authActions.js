import axios from 'axios';
import {returnErrors} from './errorActions';
import {
	AUTH_ERROR,
	DELETE_USER,
	ERROR,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
	MDF_LOGIN,
	MDP_LOGIN,
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	UPDATE_USER,
	USER_LOADED,
	USER_LOADING
} from './types';

const url = require('../config/connections');

const base_url_auth = url("ge", "auth");
const base_url_users = url("ge", "users");

//Check token and load user
export const loadUser = () => async (dispatch, getState) => {
	dispatch({type: USER_LOADING});

	try {
		let res = await axios.get(base_url_auth + "user/", tokenConfigGe(getState));

		dispatch({
			type: USER_LOADED,
			payload: res.data
		});
	} catch (err) {
		dispatch(returnErrors(err, null));
		dispatch({type: AUTH_ERROR});
	}
};

// REGISTER USER
export const register = ({name, email, password}) => async dispatch => {
	//Headers
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	};

	try {
		const body = JSON.stringify({name, email, password, address: "Porto,Portugal"});

		let res = await axios.post(base_url_users, body, config);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});
	} catch (err) {
		dispatch(
			returnErrors(err.response.data, err.response.status, REGISTER_FAIL)
		);
		dispatch({
			type: REGISTER_FAIL
		});
	}
};

//LOG IN
export const login = ({email, password}) => async dispatch => {
	//Headers
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	};
	const body = {email, password};

	try {
		const res = await axios.post(base_url_auth, body, config);

		await service_auth(email, password, dispatch);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		});

		return res.data.user;
	} catch (err) {
		console.log(err);
		dispatch(
			returnErrors(err, 400, LOGIN_FAIL));
		dispatch({
			type: LOGIN_FAIL
		});
	}
};

// LOGOUT
export const logout = () => {
	return {
		type: LOGOUT_SUCCESS
	};
};

//UPDATE USER
export const updateUser = updates => async (dispatch, getState) => {
	try {
		updates.map(update => {
			axios
				.post(base_url_users + 'update', update, tokenConfigGe(getState))
				.then(res => {
					dispatch({
						type: UPDATE_USER,
						payload: res.data
					});
				});
			return null;
		});
	} catch (err) {
		dispatch(
			returnErrors(err.response.data, err.response.status, LOGIN_FAIL));
	}
	return null;
};

//UPDATE ANY USER
export const adminUpdateUser = info => async (dispatch, getState) => {
	try {
		await axios.patch(base_url_users, info, tokenConfigGe(getState));
	} catch (err) {
		dispatch(
			returnErrors(err, 500, ERROR));
	}
};

//GET ALL CUSTOMERS
export const getCustomers = () => async (dispatch, getState) => {
	try {
		let res = await axios.get(base_url_users, tokenConfigGe(getState));

		return res.data;
	} catch (err) {
		dispatch(
			returnErrors(err, 500, ERROR));
	}
};

//REMOVE ACCOUNT
export const deleteUser = () => async (dispatch, getState) => {
	try {
		let res = await axios.delete(base_url_auth, tokenConfigGe(getState));

		dispatch({
			type: DELETE_USER,
			payload: res.data
		})
	} catch (err) {
		dispatch(
			returnErrors(err, 500, ERROR));
	}
};

// Setup config/headers
export const tokenConfigGe = getState => {
	//Get token from local storage
	const token = getState().auth.token;

	//Headers
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	};

	//If token then add to headers
	if (token) {
		config.headers['x-auth-token'] = token;
	}

	return config;
};

export const tokenConfigMDF = getState => {
	//Get token from local storage
	const token = getState().auth.mdf_token;

	//Headers
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	};

	//If token then add to headers
	if (token) {
		config.headers['Authorization'] = "Bearer " + token;
	}

	return config;
};

export const tokenConfigMDP = getState => {
	//Get token from local storage
	const token = getState().auth.mdp_token;

	//Headers
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	};

	//If token then add to headers
	if (token) {
		config.headers['Authorization'] = "Bearer " + token;
	}

	return config;
};

export const service_auth = async (email, password, dispatch) => {
	const mdf = url("mdf", "users/authenticate");
	const mdp = url("mdp", "users/authenticate");

	const auth = {
		email,
		password
	};

	const res_mdf = await axios.post(mdf, auth);
	const res_mdp = await axios.post(mdp, auth);

	const mdf_token = res_mdf.data.token;
	const mdp_token = res_mdp.data.token;

	dispatch({
		type: MDF_LOGIN,
		payload: mdf_token
	});
	dispatch({
		type: MDP_LOGIN,
		payload: mdp_token
	});

	return {
		mdf_token: res_mdf.data.token,
		mdp_token: res_mdp.data.token
	};
};
