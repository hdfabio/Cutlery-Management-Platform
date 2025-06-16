import {ADD_OPERACAO, DELETE_OPERACAO, GET_OPERACOES, OPERACOES_LOADING, UPDATE_OPERACAO} from "../../../actions/types";
import operacoesReducer from "../../../reducers/mdf/operacoesReducer";

describe("Operacoes Reducer", () => {
	let state = {
		operacoes: [],
		loading: false
	};

	beforeEach(() => {
		state = {
			operacoes: [],
			loading: false
		};
	});

	it("should set loading to true", () => {
		const expected = {
			operacoes: [],
			loading: true
		};

		const action = {
			type: OPERACOES_LOADING
		};

		state = new operacoesReducer(state, action);

		expect(state).toEqual(expected);
	});

	it("should return default state", () => {
		const expected = {
			operacoes: [],
			loading: false
		};

		state = new operacoesReducer(state, GET_OPERACOES);

		expect(state).toEqual(expected);
	});

	it("should create new operation", () => {
		const expected = {
			operacoes: [{
				duracao: 2,
				id: 'cdce997a-6736-401e-a8e4-08d76ae1ea95',
				descricao: 'op2'
			}],
			loading: false
		};
		const action = {
			type: ADD_OPERACAO,
			payload: {
				duracao: 2,
				id: 'cdce997a-6736-401e-a8e4-08d76ae1ea95',
				descricao: 'op2'
			}
		};

		state = new operacoesReducer(state, action);

		expect(state).toEqual(expected);
	});

	it("should update existing operation", () => {
		const expected = {
			operacoes: [{
				duracao: 2,
				id: 'cdce997a-6736-401e-a8e4-08d76ae1ea95',
				descricao: 'op1'
			}],
			loading: false
		};
		const action = {
			type: UPDATE_OPERACAO,
			payload: {
				duracao: 2,
				id: 'cdce997a-6736-401e-a8e4-08d76ae1ea95',
				descricao: 'op1'
			}
		};

		state = new operacoesReducer({
			operacoes: [{
				duracao: 2,
				id: 'cdce997a-6736-401e-a8e4-08d76ae1ea95',
				descricao: 'op2'
			}],
			loading: false
		}, action);

		expect(state).toEqual(expected);
	});

	it("should delete operation", () => {
		const action = {
			type: DELETE_OPERACAO,
			payload: {
				id: '1'
			}
		};

		state = new operacoesReducer({
			operacoes: [{
				duracao: 2,
				id: '1',
				descricao: 'op2'
			}],
			loading: false
		}, action);

		expect(state).toEqual(state);
	})
});
