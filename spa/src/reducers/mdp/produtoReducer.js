import {ADD_PRODUTO, DELETE_PRODUTO, GET_PRODUTOS, PRODUTOS_LOADING, UPDATE_PRODUTO} from "../../actions/types";

const initialState = {
	produtos: [],
	loading: false
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_PRODUTOS:
			return {
				...state,
				produtos: action.payload,
				loading: false
			};

		case DELETE_PRODUTO:
			return {
				...state,
				produtos: state.produtos.filter(item => item.id !== action.payload.id)
			};

		case UPDATE_PRODUTO:
			const {id} = action.payload;

			var produtos = state.produtos;
			for (let it = 0; it < produtos.length; it++) {
				if (produtos[it].id === id) {
					produtos[it] = action.payload;
				}
			}
			return {
				...state,
				produtos: produtos
			};

		case ADD_PRODUTO:
			return {
				...state,
				produtos: [action.payload, ...state.produtos]
			};

		case PRODUTOS_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}
