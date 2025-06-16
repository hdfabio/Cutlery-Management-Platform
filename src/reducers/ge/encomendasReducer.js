import {
	ADD_ENCOMENDA,
	DELETE_ENCOMENDAS,
	ENCOMENDAS_LOADING,
	GET_ENCOMENDAS,
	UPDATE_ENCOMENDA
} from "../../actions/types";

const initialState = {
	encomendas: [],
	loading: false
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_ENCOMENDAS:
			return {
				...state,
				encomendas: action.payload,
				loading: false
			};

		case DELETE_ENCOMENDAS:
			return {
				...state,
				encomendas: state.encomendas.filter(item => item._id !== action.payload._id)
			};

		case UPDATE_ENCOMENDA:
			const {id} = action.payload;

			let encomendas = state.encomendas;
			for (let it = 0; it < encomendas.length; it++) {
				if (encomendas[it].id === id) {
					encomendas[it] = action.payload;
				}
			}
			return {
				...state,
				encomendas
			};

		case ADD_ENCOMENDA:
			return {
				...state,
				encomendas: [action.payload, ...state.encomendas]
			};

		case ENCOMENDAS_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}
