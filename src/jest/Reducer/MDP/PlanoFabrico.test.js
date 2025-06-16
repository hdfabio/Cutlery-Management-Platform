import {
	ADD_PLANO_FABRICO,
	DELETE_PLANO_FABRICO,
	GET_PLANOS_FABRICO,
	PLANOS_FABRICO_LOADING,
	UPDATE_PLANO_FABRICO
} from "../../../actions/types";
import planoFabricoReducer from "../../../reducers/mdp/planoFabricoReducer";


describe("PlanoFabrico Reducer", () => {
	let state = {
		planosFabrico: [],
		loading: false
	};

	beforeEach(() => {
		state = {
			planosFabrico: [],
			loading: false
		};
	});

	it("should set loading to true", () => {
		const expected = {
			planosFabrico: [],
			loading: true
		};

		const action = {
			type: PLANOS_FABRICO_LOADING
		};

		state = new planoFabricoReducer(state, action);

		expect(state).toEqual(expected);
	});

	it("should return default  state", () => {
		const expected = {
			planosFabrico: [],
			loading: false
		};

		state = new planoFabricoReducer(state, GET_PLANOS_FABRICO);

		expect(state).toEqual(expected);
	});

	it("should return planoFabrico", () => {
		const expected = {
			planosFabrico: [{
				planoFabricoOperacoes: [],
				id: "6dd9fff2-b0e4-4c19-0ee5-08d7675ff60f",
				descricao: {
					value: "Sad"
				}
			}],
			loading: false
		};

		const action = {
			type: ADD_PLANO_FABRICO,
			payload: {
				planoFabricoOperacoes: [],
				id: "6dd9fff2-b0e4-4c19-0ee5-08d7675ff60f",
				descricao: {
					value: "Sad"
				}
			}
		};
		const reducer = new planoFabricoReducer(state, action);
		expect(reducer).toEqual(expected);
	});

	it("should delete plano", () => {
		const excepted = {"loading": false, "planosFabrico": []};

		const action = {
			type: DELETE_PLANO_FABRICO,
			payload: {
				id: "6dd9fff2-b0e4-4c19-0ee5-08d7675ff60f"
			}
		};

		const reducer = new planoFabricoReducer({
			planosFabrico: [{
				planoFabricoOperacoes: [],
				id: "6dd9fff2-b0e4-4c19-0ee5-08d7675ff60f",
				descricao: {
					value: "Sad"
				}
			}],
			loading: false
		}, action);

		expect(reducer).toEqual(excepted);
	});

	it("edit produto ", () => {
		const expected = {
			planosFabrico: [{
				planoFabricoOperacoes: [],
				id: "6dd9fff2-b0e4-4c19-0ee5-08d7675ff60f",
				descricao: {
					value: "Sad :)"
				}
			}],
			loading: false
		};

		const action = {
			type: UPDATE_PLANO_FABRICO,
			payload: {
				planoFabricoOperacoes: [],
				id: "6dd9fff2-b0e4-4c19-0ee5-08d7675ff60f",
				descricao: {
					value: "Sad :)"
				}
			}
		};

		const reducer = new planoFabricoReducer({
			planosFabrico: [{
				planoFabricoOperacoes: [],
				id: "6dd9fff2-b0e4-4c19-0ee5-08d7675ff60f",
				descricao: {
					value: "Sad"
				}
			}],
			loading: false
		}, action);

		expect(reducer).toEqual(expected);
	})
});
