import {
	ADD_TIPO_MAQUINA,
	DELETE_TIPO_MAQUINA,
	GET_TIPOS_MAQUINA,
	TIPOS_MAQUINA_LOADING,
	UPDATE_TIPO_MAQUINA
} from "../../actions/types";

const initialState = {
	tipoMaquina: [],
	loading: false
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_TIPOS_MAQUINA:
			return {
				...state,
				tipoMaquina: action.payload,
				loading: false
			};

		case DELETE_TIPO_MAQUINA:
			return {
				...state,
				tipoMaquina: state.tipoMaquina.filter(item => item.id !== action.payload.id)
			};

		case UPDATE_TIPO_MAQUINA:
			const {id} = action.payload;

			var tipoMaquina = state.tipoMaquina;
			for (let it = 0; it < tipoMaquina.length; it++) {
				if (tipoMaquina[it].id === id) {
					tipoMaquina[it] = action.payload;
				}
			}
			return {
				...state,
				tipoMaquina: tipoMaquina
			};

		case ADD_TIPO_MAQUINA:
			return {
				...state,
				tipoMaquina: [action.payload, ...state.tipoMaquina]
			};

		case TIPOS_MAQUINA_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}
