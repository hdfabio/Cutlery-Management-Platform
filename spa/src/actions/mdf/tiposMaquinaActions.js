import axios from "axios";
import url from '../../config/connections'
import {tokenConfigMDF} from "../authActions";
import {
	ADD_OPERACAO_TIPO_MAQUINA,
	ADD_TIPO_MAQUINA,
	DELETE_TIPO_MAQUINA,
	GET_TIPOS_MAQUINA,
	TIPOS_MAQUINA_LOADING,
	UPDATE_TIPO_MAQUINA
} from "../types";

const base_url = url("mdf", "tipoMaquina");

//Atualizam a store
export const getTiposMaquina = () => async (dispatch, getState) => {
	dispatch(setTiposMaquinaLoading());
	try {
		const res = await axios.get(base_url, tokenConfigMDF(getState));

		if (res.data.length === 0) {
			res.data = []
		}

		dispatch({
			type: GET_TIPOS_MAQUINA,
			payload: res.data
		});
	} catch (err) {

	}
};

export const addTipoMaquina = info => async (dispatch, getState) => {
	try {
		const res = await axios.post(base_url + 'new', info, tokenConfigMDF(getState));

		dispatch({
			type: ADD_TIPO_MAQUINA,
			payload: res.data
		});
	} catch (err) {
	}
};

export const deleteTipoMaquina = id => async (dispatch, getState) => {
	try {
		const res = await axios.delete(base_url + `${id}`, tokenConfigMDF(getState));
		dispatch({
			type: DELETE_TIPO_MAQUINA,
			payload: res.data
		});
	} catch (err) {
	}
};

export const addOperacaoTipoMaquina = info => async (dispatch, getState) => {
	try {
		const res = await axios.put(
			base_url, info, tokenConfigMDF(getState)
		);

		const payload = res.data;

		dispatch({
			type: ADD_OPERACAO_TIPO_MAQUINA,
			payload: payload
		});
	} catch (err) {
	}
};

export const updateOperacoesTipoMaquina = (id, info) => async (dispatch, getState) => {
	try {
		const res = await axios.put(
			base_url + id, info, tokenConfigMDF(getState)
		);

		const payload = res.data;

		dispatch({
			type: UPDATE_TIPO_MAQUINA,
			payload: payload
		});


	} catch (err) {
	}
};

export const operacoesTipoMaquina = (id) => async (getState) => {
	try {
		const res = await axios.get(
			base_url + "tipoMaquina=" + id + "&operacoes", tokenConfigMDF(getState)
		);

		return res.data;
	} catch (err) {
	}
};

export const setTiposMaquinaLoading = () => {
	return {
		type: TIPOS_MAQUINA_LOADING
	};
};
