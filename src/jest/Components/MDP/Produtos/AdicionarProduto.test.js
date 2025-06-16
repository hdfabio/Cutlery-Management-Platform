import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {AdicionarProduto} from "../../../../components/Dashboard/MDP/Produtos/AdicionarProduto";
import mockStore from "../../../mockStore";

configure({adapter: new Adapter()});
describe('Adicionar Produto', () => {
	let store;
	let wrapper;

	const mockLoginfn = jest.fn();

	beforeEach(() => {
		store = mockStore;
		wrapper = shallow(<AdicionarProduto
			produtos={store.getState().produtos.produtos[0]}
			planosFabrico={store.getState().planosFabrico}
			addProduto={mockLoginfn}/>)
	});

	it('should submit', () => {
		wrapper.find('#adicionarProdutoForm').simulate(
			'submit',
			{
				preventDefault() {
				}
			}
		);
		expect(mockLoginfn.mock.calls.length).toBe(1);
	});

	it('should submit with all info', () => {
		wrapper.find('#descricao').simulate(
			'change',
			{
				target:
					{name: "descricao", value: 'Produto x'}
			}
		);

		wrapper.find("#demo-simple-select").simulate(
			"change",
			{
				target: {name: "planoFabrico", value: "779308d8-413a-4d9b-1d29-08d77805141c"}
			}
		);

		wrapper.find('#adicionarProdutoForm').simulate(
			'submit',
			{
				preventDefault() {
				}
			}
		);

		expect(mockLoginfn.mock.calls[1][0])
			.toEqual({descricao: 'Produto x', planoFabrico: '779308d8-413a-4d9b-1d29-08d77805141c'});

	});


});
