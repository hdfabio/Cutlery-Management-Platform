import {ADD_OPERACAO, DELETE_OPERACAO, GET_OPERACOES, OPERACOES_LOADING, UPDATE_OPERACAO} from "../../actions/types";

const initialState = {
	operacoes: [],
	loading: false
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_OPERACOES:
			return {
				...state,
				operacoes: action.payload,
				loading: false
			};

		case DELETE_OPERACAO:
			return {
				...state,
				operacoes: state.operacoes.filter(item => item.id !== action.payload.id)
			};

		case UPDATE_OPERACAO:
			const {id} = action.payload;

			let operacoes = state.operacoes;
			for (let it = 0; it < operacoes.length; it++) {
				if (operacoes[it].id === id) {
					operacoes[it] = action.payload;
				}
			}
			return {
				...state,
				operacoes
			};

		case ADD_OPERACAO:
			return {
				...state,
				operacoes: [action.payload, ...state.operacoes]
			};

		case OPERACOES_LOADING:
			return {
				...state,
				loading: true
			};

		default:
			return state;
	}
}
