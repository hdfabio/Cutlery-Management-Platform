import {
	ADD_PLANO_FABRICO,
	DELETE_PLANO_FABRICO,
	GET_PLANOS_FABRICO,
	PLANOS_FABRICO_LOADING,
	UPDATE_PLANO_FABRICO
} from "../../actions/types";

const initialState = {
	planosFabrico: [],
	loading: false
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_PLANOS_FABRICO:
			return {
				...state,
				planosFabrico: action.payload,
				loading: false
			};

		case DELETE_PLANO_FABRICO:
			return {
				...state,
				planosFabrico: state.planosFabrico.filter(item => item.id !== action.payload.id)
			};

		case UPDATE_PLANO_FABRICO:
			const {id} = action.payload;

			var planosFabrico = state.planosFabrico;
			for (let it = 0; it < planosFabrico.length; it++) {
				if (planosFabrico[it].id === id) {
					planosFabrico[it] = action.payload;
				}
			}
			return {
				...state,
				planosFabrico: planosFabrico
			};

		case ADD_PLANO_FABRICO:
			return {
				...state,
				planosFabrico: [action.payload, ...state.planosFabrico]
			};

		case PLANOS_FABRICO_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}
