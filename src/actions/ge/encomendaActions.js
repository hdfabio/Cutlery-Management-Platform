import axios from "axios";
import url from '../../config/connections'
import {tokenConfigGe} from "../authActions";
import {returnErrors} from "../errorActions";
import {
	ADD_ENCOMENDA,
	DELETE_ENCOMENDAS,
	ENCOMENDAS_LOADING,
	GET_ENCOMENDAS,
	REGISTER_FAIL,
	UPDATE_ENCOMENDA
} from "../types";

const base_url = url("ge", "orders");

//Atualizam a store
export const getEncomendas = () => async (dispatch, getState) => {
	dispatch(setEncomendasLoading());

	try {
		const res = await axios.get(base_url, tokenConfigGe(getState));
		if (res.data.length === 0) {
			res.data = []
		}
		dispatch({type: GET_ENCOMENDAS, payload: res.data});
	} catch (err) {
		dispatch(
			returnErrors(err, 400)
		);
	}
};

export const addEncomenda = encomenda => async (dispatch, getState) => {
	try {
		const res = await axios.post(base_url, encomenda, tokenConfigGe(getState));

		dispatch({
			type: ADD_ENCOMENDA,
			payload: res.data
		});

	} catch (err) {
		dispatch(returnErrors(err, 400, REGISTER_FAIL));
	}
};

export const alterarEncomenda = e => async (dispatch) => {
	try {
		const res = await axios.put(base_url + `id=${e.id}`, e);

		const payload = res.data;

		dispatch({type: UPDATE_ENCOMENDA, payload: payload});
	} catch (err) {
	}
};

export const deleteEncomenda = id => async (dispatch, getState) => {
	try {
		const res = await axios.delete(base_url + id, tokenConfigGe(getState));

		dispatch({type: DELETE_ENCOMENDAS, payload: res.data});
	} catch (err) {
	}
};

export const setEncomendasLoading = () => {
	return {type: ENCOMENDAS_LOADING};
};
