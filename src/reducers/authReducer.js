import {
	AUTH_ERROR,
	DELETE_USER,
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
} from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	mdf_token: localStorage.getItem('token_mdf'),
	mdp_token: localStorage.getItem('token_mdp'),
	isAuthenticated: false,
	isLoading: false,
	user: null
};

export default function (state = initialState, action) {
	switch (action.type) {
		case USER_LOADING:
			return {
				...state,
				isLoading: true
			};

		case UPDATE_USER:
			return {
				...state,
				user: action.payload
			};

		case USER_LOADED:
			return {
				...state,
				isLoading: false,
				isAuthenticated: true,
				user: action.payload
			};
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			localStorage.setItem('token', action.payload.token);


			return {
				...state,
				...action.payload,
				isLoading: false,
				isAuthenticated: true
			};

		case MDF_LOGIN:
			localStorage.setItem('token_mdf', action.payload);

			return state;

		case MDP_LOGIN:
			localStorage.setItem('token_mdp', action.payload);

			return state;

		case LOGIN_FAIL:
		case REGISTER_FAIL:
		case LOGOUT_SUCCESS:
		case DELETE_USER:
		case AUTH_ERROR:
			localStorage.removeItem('token');

			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false,
				isLoading: false
			};


		default:
			return state;
	}
}
