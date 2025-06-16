import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {AdicionarPlanoFabrico} from "../../../../components/Dashboard/MDP/PlanosDeFabrico/AdicionarPlanoFabrico";
import mockStore from "../../../mockStore";

configure({adapter: new Adapter()});
describe('Adicionar Plano Fabrico', () => {
	let store;
	let wrapper;
	const mockLoginfn = jest.fn();
	let instance;

	beforeEach(() => {
		store = mockStore;

		wrapper = shallow(<AdicionarPlanoFabrico
			operacoes={store.getState().operacoes}
			addPlanoFabrico={mockLoginfn}/>);

		instance = wrapper.instance()
	});

	it('should submit', () => {
		wrapper.find('#adicionarPlanoFabricoForm').simulate(
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
					{name: 'descricao', value: 'Novo planoFOperacao'}
			}
		);

		instance.myCallback(['f5df6f0a-7cae-4584-36f3-08d77803eba9']);

		wrapper.find('#adicionarPlanoFabricoForm').simulate(
			'submit',
			{
				preventDefault() {
				}
			}
		);

		expect(mockLoginfn.mock.calls[1][0])
			.toEqual({descricao: 'Novo planoFOperacao', operacoes: ['f5df6f0a-7cae-4584-36f3-08d77803eba9']});
	});

	it("should toggle", () => {
		expect(instance.state.toggle).toBe(false);
		instance.toggle();
		expect(instance.state.toggle).toBe(true);
	});
});

