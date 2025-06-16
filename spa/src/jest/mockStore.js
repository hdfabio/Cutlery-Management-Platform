import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

export default mockStore({
		maquinas: {
			maquinas: [
				{
					localizacao: {
						value: 'Ali'
					},
					tipoMaquina: {
						tipoMaquinaOperacoes: [],
						id: '1f4bca1b-de46-40e0-5bb1-08d778060eec',
						descricao: {
							value: 'TP1'
						}
					},
					linhaProducaoMaquinas: [],
					id: 'd1faa64d-0892-4669-a3b5-08d77806152b',
					descricao: {
						value: 'M1'
					}
				}
			],
			loading: false
		},
		linhasProducao: {
			linhasProducao: [
				{
					linhaProducaoMaquinas: [
						{
							linhaProducaoId: '2bad149b-215b-4c0d-f6ef-08d7780618d6',
							maquinaId: 'd1faa64d-0892-4669-a3b5-08d77806152b',
							maquina: {
								localizacao: {
									value: 'Ali'
								},
								tipoMaquina: null,
								linhaProducaoMaquinas: [],
								id: 'd1faa64d-0892-4669-a3b5-08d77806152b',
								descricao: {
									value: 'M1'
								}
							}
						}
					],
					id: '2bad149b-215b-4c0d-f6ef-08d7780618d6',
					descricao: {
						value: 'LP1'
					}
				}
			],
			loading: false
		},
		operacoes: {
			operacoes: [
				{
					execucao: {
						value: 250
					},
					ferramenta: {
						setup: {
							value: 25
						},
						id: 'cf7b756f-a9c6-4535-f897-08d77803ebaf',
						descricao: {
							value: 'Broca'
						}
					},
					tipoMaquinaOperacoes: [],
					id: 'f5df6f0a-7cae-4584-36f3-08d77803eba9',
					descricao: {
						value: 'New Op 1'
					}
				}
			],
			loading: false
		},
		tiposMaquina: {
			tipoMaquina: [
				{
					tipoMaquinaOperacoes: [],
					id: '1f4bca1b-de46-40e0-5bb1-08d778060eec',
					descricao: {
						value: 'TP1'
					}
				}
			],
			loading: false
		},
		produtos: {
			produtos: [
				{
					planoFabrico: {
						planoFabricoOperacoes: [],
						id: '779308d8-413a-4d9b-1d29-08d77805141c',
						descricao: {
							value: 'New Plano 1'
						}
					},
					id: 'd19296fe-f005-401f-b663-08d778051905',
					descricao: {
						value: 'Prod lsnawl'
					}
				}
			],
			loading: false
		},
		planosFabrico: {
			planosFabrico: [
				{
					planoFabricoOperacoes: [
						{
							planoFabricoId: '779308d8-413a-4d9b-1d29-08d77805141c',
							operacaoId: 'f5df6f0a-7cae-4584-36f3-08d77803eba9',
							operacao: {
								execucao: {
									value: 250
								},
								ferramenta: null,
								planoFabricoOperacoes: [],
								id: 'f5df6f0a-7cae-4584-36f3-08d77803eba9',
								descricao: {
									value: 'New Op 1'
								}
							}
						}
					],
					id: '779308d8-413a-4d9b-1d29-08d77805141c',
					descricao: {
						value: 'New Plano 1'
					}
				}
			],
			loading: false
		},
		encomendas: {
			encomendas: [
				{
					_id: '5de680403e5df56bd02c231e',
					user: '5ddd4ff9d133be5804f1e866',
					product: 'd19296fe-f005-401f-b663-08d778051905',
					quantity: '03343',
					due_date: '2019-12-18T15:33:00.000Z',
					__v: 0
				}
			],
			loading: false
		}
	}
);
