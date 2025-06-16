import axios from "axios";
import url from '../../config/connections'
import {tokenConfigMDF} from "../authActions";
import {ADD_MAQUINA, DELETE_MAQUINA, GET_MAQUINAS, MAQUINAS_LOADING, UPDATE_MAQUINA} from "../types";

const base_url = url("mdf", "maquina");

//Atualizam a store
export const getMaquinas = () => async (dispatch, getState) => {
	dispatch(setMaquinaLoading());
	try {
		const res = await axios.get(base_url, tokenConfigMDF(getState));

		if (res.data.length === 0) {
			res.data = []
		}

		dispatch({
			type: GET_MAQUINAS,
			payload: res.data
		});
	} catch (err) {

	}
};

export const addMaquina = maquina => async (dispatch, getState) => {
	try {
		const res = await axios.post(base_url + 'new', maquina, tokenConfigMDF(getState));

		dispatch({
			type: ADD_MAQUINA,
			payload: res.data
		});
	} catch (err) {
	}
};

export const alterarTipoMaquina = m => async (dispatch, getState) => {
	try {

		const res = await axios.put(
			base_url + `id=${m.id}&tipomaquina=${m.tipoMaquina}`, tokenConfigMDF(getState)
		);

		const payload = res.data;

		dispatch({
			type: UPDATE_MAQUINA,
			payload: payload
		});


	} catch (err) {
	}
};

export const deleteMaquina = id => async (dispatch, getState) => {
	try {
		const res = await axios.delete(base_url + `${id}`);
		dispatch({
			type: DELETE_MAQUINA,
			payload: res.data
		});
	} catch (err) {
	}
};

//Devolvem informação especifica da base de bados
export const getMaquina = (id) => async (getState) => {
	try {
		const res = axios.get(base_url + id, tokenConfigMDF(getState));

		return res.data;
	} catch (err) {
	}
};

export const setMaquinaLoading = () => {
	return {
		type: MAQUINAS_LOADING
	};
};
