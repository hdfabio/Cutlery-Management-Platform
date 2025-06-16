import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {AlterarOperacao} from "../../../../components/Dashboard/MDF/Operacoes/AlterarOperacao";
import mockStore from "../../../mockStore";

configure({adapter: new Adapter()});

describe('Alterar Operacao', () => {
	const mockHandleSubmit = jest.fn();
	let store = mockStore;
	let wrapper;

	describe("", () => {
		it('should submit', () => {
			wrapper =
				shallow(<AlterarOperacao
					operacao={store.getState().operacoes.operacoes[0]}
					alterarOperacao={mockHandleSubmit}/>);

			wrapper.find('#modificarOperacaoForm').simulate(
				'submit',
				{
					preventDefault() {
					}
				}
			);
			expect(mockHandleSubmit.mock.calls.length).toBe(1);
		});

		it('', () => {
			const comp = shallow(<AlterarOperacao
				operacao={store.getState().operacoes.operacoes[0]}
				alterarOperacao={mockHandleSubmit}/>);

			comp.find("#duracao").simulate(
				"change",
				{
					target: {name: "duracao", value: 25}
				}
			);

			comp.find('#modificarOperacaoForm').simulate('submit', {
				preventDefault() {
				}
			});

			expect(mockHandleSubmit.mock.calls[1][0]).toEqual({
				id: "f5df6f0a-7cae-4584-36f3-08d77803eba9",
				descricao: 'New Op 1',
				ferramenta: 'Broca',
				setup: 25,
				execucao: 250


			});
		});

	});

});
