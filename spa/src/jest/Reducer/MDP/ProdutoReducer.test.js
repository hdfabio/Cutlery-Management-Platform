import {ADD_PRODUTO, DELETE_PRODUTO, GET_PRODUTOS, PRODUTOS_LOADING, UPDATE_PRODUTO} from "../../../actions/types";
import produtosReducer from "../../../reducers/mdp/produtoReducer";


describe("Operacoes Reducer", () => {
	let state = {
		produtos: [],
		loading: false
	};

	beforeEach(() => {
		state = {
			produtos: [],
			loading: false
		};
	});

	it("should set loading to true", () => {
		const expected = {
			produtos: [],
			loading: true
		};

		const action = {
			type: PRODUTOS_LOADING
		};

		state = new produtosReducer(state, action);

		expect(state).toEqual(expected);
	});

	it("should return default state", () => {
		const expected = {
			produtos: [],
			loading: false
		};


		state = new produtosReducer(state, GET_PRODUTOS);

		expect(state).toEqual(expected);
	});

	it("should return produto", () => {
		const expected = {
			produtos: [{
				planoFabrico: {
					planoFabricoOperacoes: [],
					id: "6dd9fff2-b0e4-4c19-0ee5-08d7675ff60f",
					descricao: {
						value: "Sad"
					}
				},
				id: "5189aa72-1977-4f9c-df59-08d768328638",
				descricao: {
					value: "Desc"
				}
			}],
			loading: false
		};

		const action = {
			type: ADD_PRODUTO,
			payload: {
				planoFabrico: {
					planoFabricoOperacoes: [],
					id: "6dd9fff2-b0e4-4c19-0ee5-08d7675ff60f",
					descricao: {
						value: "Sad"
					}
				},
				id: "5189aa72-1977-4f9c-df59-08d768328638",
				descricao: {
					value: "Desc"
				}
			}
		};
		const reducer = new produtosReducer(state, action);
		expect(reducer).toEqual(expected);
	});

	it("should delete ", () => {
		const excepted = {"loading": false, "produtos": []};

		const action = {
			type: DELETE_PRODUTO,
			payload: {
				id: "5189aa72-1977-4f9c-df59-08d768328638"
			}
		};

		const reducer = new produtosReducer({
			produtos: [{
				planoFabrico: {
					planoFabricoOperacoes: [],
					id: "6dd9fff2-b0e4-4c19-0ee5-08d7675ff60f",
					descricao: {
						value: "Sad"
					}
				},
				id: "5189aa72-1977-4f9c-df59-08d768328638",
				descricao: {
					value: "Desc"
				}
			}],
			loading: false
		}, action);

		expect(reducer).toEqual(excepted);
	});

	it("edit produto", () => {
		const excepted = {
			loading: false,
			produtos: [{
				id: "5189aa72-1977-4f9c-df59-08d768328638",
				descricao: {
					value: "Descricao bla bla"
				}
			}]
		};

		const action = {
			type: UPDATE_PRODUTO,
			payload: {
				id: "5189aa72-1977-4f9c-df59-08d768328638",
				descricao: {
					value: "Descricao bla bla"
				}
			}
		};

		const reducer = new produtosReducer({
			produtos: [{
				planoFabrico: {
					planoFabricoOperacoes: [],
					id: "1",
					descricao: {
						value: "Sad"
					}
				},
				id: "5189aa72-1977-4f9c-df59-08d768328638",
				descricao: {
					value: "Desc"
				}
			}],
			loading: false
		}, action);

		expect(reducer).toEqual(excepted);
	})
});
