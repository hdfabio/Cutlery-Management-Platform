import axios from "axios";
import url from '../../config/connections'
import {tokenConfigMDP} from "../authActions";
import {ADD_PRODUTO, DELETE_PRODUTO, GET_PRODUTOS, PRODUTOS_LOADING, UPDATE_PRODUTO} from "../types";

const base_url = url("mdp", "produtos");

//Atualizam a store
export const getProdutos = () => async (dispatch, getState) => {
	dispatch(setProdutosLoading());
	try {
		const res = await axios.get(base_url, tokenConfigMDP(getState));

		let rd = res.data;

		dispatch({
			type: GET_PRODUTOS,
			payload: rd
		});
	} catch (err) {
	}
};

export const addProduto = produto => async (dispatch, getState) => {
	try {
		const res = await axios.post(base_url, produto, tokenConfigMDP(getState));

		dispatch({
			type: ADD_PRODUTO,
			payload: res.data
		});
	} catch (err) {
	}
};

export const alterarPlanoFabricoProduto = m => async (dispatch, getState) => {
	try {
		const res = await axios.put(
			base_url + `id=${m.produto}&plano=${m.plano}`, tokenConfigMDP(getState)
		);

		if (res.status === 200) {
			const payload = res.data;

			dispatch({
				type: UPDATE_PRODUTO,
				payload: payload
			});
		}
	} catch (err) {
	}
};

export const deleteProduto = id => async (dispatch, getState) => {
	try {
		const res = await axios.delete(base_url + `${id}`, tokenConfigMDP(getState));
		dispatch({
			type: DELETE_PRODUTO,
			payload: res.data
		});
	} catch (err) {
	}
};

export const setProdutosLoading = () => {
	return {
		type: PRODUTOS_LOADING
	};
};
