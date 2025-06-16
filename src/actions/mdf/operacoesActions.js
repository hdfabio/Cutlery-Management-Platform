import axios from "axios";
import {ADD_OPERACAO, DELETE_OPERACAO, GET_OPERACOES, OPERACOES_LOADING, UPDATE_OPERACAO} from "../../actions/types";
import url from '../../config/connections'
import {tokenConfigMDF} from "../authActions";

const base_url = url("mdf", "operacao");

//Atualizam a store
export const getOperacoes = () => async (dispatch, getState) => {
	dispatch(setOperacoesLoading());
	try {
		const res = await axios.get(base_url, tokenConfigMDF(getState));

		if (res.data.length === 0) {
			res.data = []
		}

		dispatch({
			type: GET_OPERACOES,
			payload: res.data
		});
	} catch (err) {

	}
};

export const addOperacao = op => async (dispatch, getState) => {
	try {
		const res = await axios.post(base_url, op, tokenConfigMDF(getState));

		dispatch({
			type: ADD_OPERACAO,
			payload: res.data
		});
	} catch (err) {
	}
};

export const alterarOperacao = (op) => async (dispatch, getState) => {
	try {

		const res = await axios.put(
			base_url + `id=${op.id}`, op, tokenConfigMDF(getState)
		);

		const payload = res.data;
		console.log(payload);

		dispatch({
			type: UPDATE_OPERACAO,
			payload: payload
		});

	} catch (err) {
	}
};

export const deleteOperacao = id => async (dispatch, getState) => {
	try {
		const res = await axios.delete(base_url + id, tokenConfigMDF(getState));

		dispatch({
			type: DELETE_OPERACAO,
			payload: res.data
		});
	} catch (err) {
	}
};

export const setOperacoesLoading = () => {
	return {
		type: OPERACOES_LOADING
	};
};
