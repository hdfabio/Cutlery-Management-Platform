import {
	ADD_TIPO_MAQUINA,
	DELETE_TIPO_MAQUINA,
	GET_TIPOS_MAQUINA,
	TIPOS_MAQUINA_LOADING,
	UPDATE_TIPO_MAQUINA
} from "../../../actions/types";
import tiposMaquinaReducer from "../../../reducers/mdf/tiposMaquinaReducer";

describe("Operacoes Reducer", () => {
	let state = {
		tipoMaquina: [],
		loading: false
	};

	beforeEach(() => {
		state = {
			tipoMaquina: [],
			loading: false
		};
	});

	it("should set loading to true", () => {
		const expected = {
			tipoMaquina: [],
			loading: true
		};

		const action = {
			type: TIPOS_MAQUINA_LOADING
		};

		state = new tiposMaquinaReducer(state, action);

		expect(state).toEqual(expected);
	});

	it("should return default state", () => {
		state = {
			tipoMaquina: [{
				id: '420acb45-c575-4b1b-7cea-08d76aa520bf',
				descricao: 'rstdsrv'
			}],
			loading: false
		};

		const expected = {
			tipoMaquina: [{
				id: '420acb45-c575-4b1b-7cea-08d76aa520bf',
				descricao: 'rstdsrv'
			}],
			loading: false
		};

		const actual = new tiposMaquinaReducer(state, GET_TIPOS_MAQUINA);

		expect(actual).toEqual(expected);
	});

	it("should create new machine type", () => {
		const expected = {
			tipoMaquina: [{
				id: '420acb45-c575-4b1b-7cea-08d76aa520bf',
				descricao: 'ola'
			}],
			loading: false
		};

		const action = {
			type: ADD_TIPO_MAQUINA,
			payload: {
				id: '420acb45-c575-4b1b-7cea-08d76aa520bf',
				descricao: 'ola'
			}
		};

		state = new tiposMaquinaReducer(state, action);

		expect(state).toEqual(expected);
	});

	it("should update existing operation", () => {
		const expected = {
			tipoMaquina: [{
				id: '420acb45-c575-4b1b-7cea-08d76aa520bf',
				descricao: 'hello'
			}],
			loading: false
		};

		const action = {
			type: UPDATE_TIPO_MAQUINA,
			payload: {
				id: '420acb45-c575-4b1b-7cea-08d76aa520bf',
				descricao: 'hello'
			}
		};

		state = new tiposMaquinaReducer({
			tipoMaquina: [{
				id: '420acb45-c575-4b1b-7cea-08d76aa520bf',
				descricao: 'ola'
			}],
			loading: false
		}, action);

		expect(state).toEqual(expected);
	});

	it("should delete machine type", () => {
		const action = {
			type: DELETE_TIPO_MAQUINA,
			payload: {
				id: '420acb45-c575-4b1b-7cea-08d76aa520bf'
			}
		};

		state = new tiposMaquinaReducer({
			tipoMaquina: [{
				id: '420acb45-c575-4b1b-7cea-08d76aa520bf',
				descricao: 'ola'
			}],
			loading: false
		}, action);

		expect(state).toEqual(state);
	})
});
