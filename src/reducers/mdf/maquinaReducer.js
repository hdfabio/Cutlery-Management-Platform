import {ADD_MAQUINA, DELETE_MAQUINA, GET_MAQUINAS, MAQUINAS_LOADING, UPDATE_MAQUINA} from "../../actions/types";

const initialState = {
	maquinas: [],
	loading: false
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_MAQUINAS:
			return {
				...state,
				maquinas: action.payload,
				loading: false
			};

		case DELETE_MAQUINA:
			return {
				...state,
				maquinas: state.maquinas.filter(item => item.id !== action.payload.id)
			};

		case UPDATE_MAQUINA:
			const {id} = action.payload;

			var maquinas = state.maquinas;
			for (let it = 0; it < maquinas.length; it++) {
				if (maquinas[it].id === id) {
					maquinas[it] = action.payload;
				}
			}
			return {
				...state,
				maquinas: maquinas
			};

		case ADD_MAQUINA:
			return {
				...state,
				maquinas: [action.payload, ...state.maquinas]
			};

		case MAQUINAS_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}
