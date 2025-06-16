import {
	ADD_LINHA_PRODUCAO,
	DELETE_LINHA_PRODUCAO,
	GET_LINHAS_PRODUCAO,
	LINHAS_PRODUCAO_LOADING,
	UPDATE_LINHA_PRODUCAO
} from "../../actions/types";

const initialState = {
	linhasProducao: [],
	loading: false
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_LINHAS_PRODUCAO:
			return {
				...state,
				linhasProducao: action.payload,
				loading: false
			};

		case DELETE_LINHA_PRODUCAO:
			return {
				...state,
				linhasProducao: state.linhasProducao.filter(item => item.id !== action.payload.id)
			};

		case UPDATE_LINHA_PRODUCAO:
			const {id} = action.payload;

			var linhasProducao = state.linhasProducao;
			for (let it = 0; it < linhasProducao.length; it++) {
				if (linhasProducao[it].id === id) {
					linhasProducao[it] = action.payload;
				}
			}
			return {
				...state,
				linhasProducao: linhasProducao
			};

		case ADD_LINHA_PRODUCAO:
			return {
				...state,
				linhasProducao: [action.payload, ...state.linhasProducao]
			};

		case LINHAS_PRODUCAO_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}
