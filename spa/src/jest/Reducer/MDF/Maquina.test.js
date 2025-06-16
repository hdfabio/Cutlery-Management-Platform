import {ADD_MAQUINA, DELETE_MAQUINA, GET_MAQUINAS, UPDATE_MAQUINA} from "../../../actions/types";
import maquinasReducer from "../../../reducers/mdf/maquinaReducer";

describe("Maquinas Reducer", () => {
	const initialState = {
		maquinas: [],
		loading: false
	};

	it("should return default state", () => {

		const actual = new maquinasReducer(initialState, GET_MAQUINAS);

		expect(actual).toEqual(initialState);
	});

	it("should create new maquina", () => {
		const expected = {
			maquinas: [{
				localizacao: {
					value: "Ali na esquininha"
				},
				tipoMaquina: {
					tipoMaquinaOpercaos: [],
					id: "4cace719-3621-4eac-dc5b-08d769fc13d2",
					descricao: {
						value: "Tipo Maquina 1"
					}
				},
				linhaProducaoMaquinas: [],
				id: "feef0d32-727d-445d-c0f2-08d769fc13d6",
				descricao: {
					value: "Maquina 1"
				}
			}],
			loading: false
		};

		const action = {
			type: ADD_MAQUINA,
			payload: {
				localizacao: {
					value: "Ali na esquininha"
				},
				tipoMaquina: {
					tipoMaquinaOpercaos: [],
					id: "4cace719-3621-4eac-dc5b-08d769fc13d2",
					descricao: {
						value: "Tipo Maquina 1"
					}
				},
				linhaProducaoMaquinas: [],
				id: "feef0d32-727d-445d-c0f2-08d769fc13d6",
				descricao: {
					value: "Maquina 1"
				}
			}
		};

		const reducer = new maquinasReducer(initialState, action);

		expect(reducer).toEqual(expected);
	});

	it("shoud delete maquina", () => {
		const expected = {
			maquinas: [],
			loading: false
		};

		const action = {
			type: DELETE_MAQUINA,
			payload: {
				id: "feef0d32-727d-445d-c0f2-08d769fc13d6"
			}
		};

		const reducer = new maquinasReducer({
			maquinas: [{
				localizacao: {
					value: "Ali na esquininha"
				},
				tipoMaquina: {
					tipoMaquinaOpercaos: [],
					id: "4cace719-3621-4eac-dc5b-08d769fc13d2",
					descricao: {
						value: "Tipo Maquina 1"
					}
				},
				linhaProducaoMaquinas: [],
				id: "feef0d32-727d-445d-c0f2-08d769fc13d6",
				descricao: {
					value: "Maquina 1"
				}
			}],
			loading: false
		}, action);

		expect(reducer).toEqual(expected);
	});

	it("should edit maquina", () => {
		const expected = {
			loading: false,
			maquinas: [{
				id: "feef0d32-727d-445d-c0f2-08d769fc13d6",
				tipoMaquina: "b386aba1-1b9e-4b59-88c2-08d76aa9e17f"
			}]
		};
		const action = {
			type: UPDATE_MAQUINA,
			payload: {
				id: "feef0d32-727d-445d-c0f2-08d769fc13d6",
				tipoMaquina: "b386aba1-1b9e-4b59-88c2-08d76aa9e17f"
			}
		};


		const reducer = new maquinasReducer({
			maquinas: [{
				descricao: {value: "Maquina 1"},
				id: "feef0d32-727d-445d-c0f2-08d769fc13d6",
				linhaProducaoMaquinas: [],
				localizacao: {value: "Ali na esquininha"},
				tipoMaquina: {
					descricao: {value: "Tipo Maquina 1"},
					id: "4cace719-3621-4eac-dc5b-08d769fc13d2",
					tipoMaquinaOpercaos: []
				}
			}],
			loading: false
		}, action);

		expect(reducer).toEqual(expected);
	})
});
