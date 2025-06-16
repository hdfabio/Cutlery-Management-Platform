import {
	ADD_LINHA_PRODUCAO,
	DELETE_LINHA_PRODUCAO,
	GET_LINHAS_PRODUCAO,
	LINHAS_PRODUCAO_LOADING
} from "../../../actions/types";
import linhaProducaoReducer from "../../../reducers/mdf/linhaProducaoReducer";


describe("LinhaProducao Reducer", () => {
	let state = {
		linhasProducao: [],
		loading: false
	};

	beforeEach(() => {
		state = {
			linhasProducao: [],
			loading: false
		};
	});

	it("should set loading to true", () => {
		const expected = {
			linhasProducao: [],
			loading: true
		};

		const action = {
			type: LINHAS_PRODUCAO_LOADING
		};

		state = new linhaProducaoReducer(state, action);

		expect(state).toEqual(expected);
	});

	it("should return default state", () => {
		const expected = {
			linhasProducao: [],
			loading: false
		};

		state = new linhaProducaoReducer(state, GET_LINHAS_PRODUCAO);

		expect(state).toEqual(expected);
	});

	it("should return Linhas Producao", () => {
		const expected = {
			linhasProducao: [{
				linhaProducaoMaquinas: [
					{
						linhaProducaoId: "43031575-2fae-48db-d065-08d769fc13d9",
						maquinaId: "feef0d32-727d-445d-c0f2-08d769fc13d6",
						maquina: {
							localizacao: {
								value: "Ali na esquininha"
							},
							tipoMaquina: null,
							linhaProducaoMaquinas: [],
							id: "feef0d32-727d-445d-c0f2-08d769fc13d6",
							descricao: {
								value: "Maquina 1"
							}
						}
					}
				],
				id: "43031575-2fae-48db-d065-08d769fc13d9",
				descricao: {
					value: "Linha de Producao 1"
				}
			}],
			loading: false
		};

		const action = {
			type: ADD_LINHA_PRODUCAO,
			payload: {
				linhaProducaoMaquinas: [
					{
						linhaProducaoId: "43031575-2fae-48db-d065-08d769fc13d9",
						maquinaId: "feef0d32-727d-445d-c0f2-08d769fc13d6",
						maquina: {
							localizacao: {
								value: "Ali na esquininha"
							},
							tipoMaquina: null,
							linhaProducaoMaquinas: [],
							id: "feef0d32-727d-445d-c0f2-08d769fc13d6",
							descricao: {
								value: "Maquina 1"
							}
						}
					}
				],
				id: "43031575-2fae-48db-d065-08d769fc13d9",
				descricao: {
					value: "Linha de Producao 1"
				}
			}
		};
		const reducer = new linhaProducaoReducer(state, action);
		expect(reducer).toEqual(expected);
	});

	it("should delete linhaProducao", () => {
		const excepted = {"loading": false, "linhasProducao": []};

		const action = {
			type: DELETE_LINHA_PRODUCAO,
			payload: {
				id: "43031575-2fae-48db-d065-08d769fc13d9"
			}
		};

		const reducer = new linhaProducaoReducer({
			linhasProducao: [{
				linhaProducaoMaquinas: [
					{
						linhaProducaoId: "43031575-2fae-48db-d065-08d769fc13d9",
						maquinaId: "feef0d32-727d-445d-c0f2-08d769fc13d6",
						maquina: {
							localizacao: {
								value: "Ali na esquininha"
							},
							tipoMaquina: null,
							linhaProducaoMaquinas: [],
							id: "feef0d32-727d-445d-c0f2-08d769fc13d6",
							descricao: {
								value: "Maquina 1"
							}
						}
					}
				],
				id: "43031575-2fae-48db-d065-08d769fc13d9",
				descricao: {
					value: "Linha de Producao 1"
				}
			}],
			loading: false
		}, action);

		expect(reducer).toEqual(excepted);
	});


});
