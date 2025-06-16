import axios from "axios";
import url from '../../config/connections'
import {tokenConfigMDF} from "../authActions";
import {
	ADD_LINHA_PRODUCAO,
	ADD_MAQUINA_LINHA_PRODUCAO,
	DELETE_LINHA_PRODUCAO,
	GET_LINHAS_PRODUCAO,
	LINHAS_PRODUCAO_LOADING
} from "../types";

const base_url = url("mdf", "linhaProducao");

//Atualizam a store
export const getLinhasProducao = () => async (dispatch, getState) => {
	dispatch(setLinhasProducaoLoading());
	try {
		const res = await axios.get(base_url, tokenConfigMDF(getState));

		if (res.data.length === 0) {
			res.data = []
		}

		dispatch({
			type: GET_LINHAS_PRODUCAO,
			payload: res.data
		});
	} catch (err) {

	}
};

export const deleteLinhaProducao = (id) => async (dispatch, getState) => {
	try {
		const res = await axios.delete(base_url + id, tokenConfigMDF(getState));

		dispatch({
			type: DELETE_LINHA_PRODUCAO,
			payload: res.data
		});
	} catch (err) {

	}
};

export const addLinhaProducao = (lp) => async (dispatch, getState) => {
	try {
		const res = await axios.post(base_url + 'new', lp, tokenConfigMDF(getState));

		dispatch({
			type: ADD_LINHA_PRODUCAO,
			payload: res.data
		});
	} catch (err) {

	}
};

export const addMaquinaLinhaProducao = (lp) => async (dispatch, getState) => {
	try {
		const res = await axios.put(base_url, lp, tokenConfigMDF(getState));

		dispatch({
			type: ADD_MAQUINA_LINHA_PRODUCAO,
			payload: res.data
		});
	} catch (err) {

	}
};

export const setLinhasProducaoLoading = () => {
	return {
		type: LINHAS_PRODUCAO_LOADING
	};
};
