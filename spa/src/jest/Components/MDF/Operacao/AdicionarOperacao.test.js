import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {AdicionarOperacao} from "../../../../components/Dashboard/MDF/Operacoes/AdicionarOperacao";
import mockStore from "../../../mockStore";

configure({adapter: new Adapter()});
describe('Adicionar Operacao', () => {
	let store;
	let wrapper;

	const mockLoginfn = jest.fn();

	beforeEach(() => {
		store = mockStore;
		wrapper = shallow(<AdicionarOperacao addOperacao={mockLoginfn}/>)
	});

	it('should submit', () => {
		wrapper.find('#adicionarOperacaoForm').simulate(
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
					{name: "descricao", value: 'poggies'}
			}
		);

		wrapper.find('#duracao').simulate(
			'change',
			{
				target:
					{name: "duracao", value: 10}
			}
		);

		wrapper.find('#ferramenta').simulate(
			'change',
			{
				target:
					{name: "ferramenta", value: 'blabla'}
			}
		);

		wrapper.find('#setup').simulate(
			'change',
			{
				target:
					{name: "setup", value: 100}
			}
		);

		wrapper.find('#adicionarOperacaoForm').simulate(
			'submit',
			{
				preventDefault() {
				}
			}
		);

		expect(mockLoginfn.mock.calls[1][0]).toEqual({descricao: 'poggies', duracao: 10, ferramenta: 'blabla', setup: 100});

	});


});
