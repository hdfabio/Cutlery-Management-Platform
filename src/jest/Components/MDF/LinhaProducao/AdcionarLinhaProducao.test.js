import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {AdicionarLinhaProducao} from "../../../../components/Dashboard/MDF/LinhasProducao/AdicionarLinhaProducao";
import mockStore from "../../../mockStore";
//import {AdicionarOperacao} from "../../../../components/Dashboard/MDF/Operacoes/AdicionarOperacao";

configure({adapter: new Adapter()});
describe('Adicionar Linha producao', () => {
	let store;
	let wrapper;
	store = mockStore;
	const mockLoginfn = jest.fn();

	it('should submit', () => {
		wrapper = shallow(<AdicionarLinhaProducao maquinas={store.getState().maquinas} addLinhaProducao={mockLoginfn}/>);
		expect(wrapper.state('toggle')).toBe(false);
		wrapper.find('#adicionarLinhaProducaoForm').simulate(
			'submit',
			{
				preventDefault() {
				}
			}
		);
		expect(mockLoginfn.mock.calls.length).toBe(1);
	});

	it('should submit all info', () => {

		const instance = wrapper.instance();

		//console.log(instance.options())
		expect(instance.options()[0].value).toBe('d1faa64d-0892-4669-a3b5-08d77806152b')
	});

	it('toggle check', () => {
		const instance = wrapper.instance();

		expect(wrapper.state('toggle')).toBe(true);
	});
	it('should submit all info', () => {
		wrapper.find('#descricao').simulate(
			'change',
			{
				target:
					{name: 'descricao', value: 'local'}
			}
		);

	})

});
