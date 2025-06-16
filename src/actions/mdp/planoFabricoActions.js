import axios from "axios";
import url from '../../config/connections'
import {tokenConfigMDP} from "../authActions";
import {
	ADD_PLANO_FABRICO,
	DELETE_PLANO_FABRICO,
	GET_PLANOS_FABRICO,
	MAQUINAS_LOADING,
	UPDATE_PLANO_FABRICO
} from "../types";

const base_url = url("mdp", "planofabrico");

//Atualizam a store
export const getPlanosFabrico = () => async (dispatch, getState) => {
	dispatch(setMaquinaLoading());
	try {
		const res = await axios.get(base_url, tokenConfigMDP(getState));

		let rd = res.data;

		dispatch({
			type: GET_PLANOS_FABRICO,
			payload: rd
		});
	} catch (err) {

	}
};

export const addPlanoFabrico = ops => async (dispatch, getState) => {
	try {
		const res = await axios.post(base_url, ops, tokenConfigMDP(getState));

		dispatch({
			type: ADD_PLANO_FABRICO,
			payload: res.data
		});
	} catch (err) {
	}
};

export const adicionarOperacaoPlanoFabrico = info => async (dispatch, getState) => {
	try {

		console.log(info);

		const res = await axios.put(
			base_url + `pf=${info.pf}&op=${info.op}`, tokenConfigMDP(getState)
		);

		console.log(res);

		const payload = res.data;

		dispatch({
			type: UPDATE_PLANO_FABRICO,
			payload: payload
		});

	} catch (err) {
	}
};

export const removerOperacaoPlanoFabrico = info => async (dispatch, getState) => {
	try {
		const res = await axios.delete(
			base_url + `pf=${info.pf}&op=${info.op}`, tokenConfigMDP(getState)
		);

		console.log(res);

		const payload = res.data;

		dispatch({
			type: UPDATE_PLANO_FABRICO,
			payload: payload
		});

	} catch (err) {
	}
};

export const deletePlanoFabrico = id => async (dispatch, getState) => {
	try {
		const res = await axios.delete(base_url + `id=${id}`, tokenConfigMDP(getState));
		dispatch({
			type: DELETE_PLANO_FABRICO,
			payload: res.data
		});
	} catch (err) {
	}
};

export const setMaquinaLoading = () => {
	return {
		type: MAQUINAS_LOADING
	};
};
