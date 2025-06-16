import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {AlterarEncomenda} from "../../../../components/Dashboard/GE/Encomendas/AlterarEncomenda";
import mockStore from "../../../mockStore";

configure({adapter: new Adapter()});
describe('Alterar Encomenda', () => {
	const mockHandleSubmit = jest.fn();
	let store = mockStore;
	let wrapper;

	describe("", () => {
		it('should submit', () => {
			wrapper =
				shallow(<AlterarEncomenda
					encomenda={store.getState().encomendas.encomendas[0]}
					alterarEncomenda={mockHandleSubmit}/>);

			wrapper.find('#alterarEncomendaForm').simulate(
				'submit',
				{
					preventDefault() {
					}
				}
			);
			expect(mockHandleSubmit.mock.calls.length).toBe(1);
		});

		it('should submit with machine type', () => {
			const comp = shallow(<AlterarEncomenda
				encomenda={store.getState().encomendas.encomendas[0]}
				alterarEncomenda={mockHandleSubmit}/>);

			comp.find("#descricao").simulate(
				"change",
				{
					target: {name: "descricao", value: "Encomenda x"}
				}
			);

			comp.find("#nifCliente").simulate(
				"change",
				{
					target: {name: "nifCliente", value: "123456789"}
				}
			);

			comp.find("#quantidade").simulate(
				"change",
				{
					target: {name: "quantidade", value: "15"}
				}
			);

			comp.find("#dataDeEntrega").simulate(
				"change",
				{
					target: {name: "dataDeEntrega", value: "2020-01-20T15:33:00.000Z"}
				}
			);

			// comp.find("#id").simulate(
			// 	"change",
			// 	{
			// 		target: {name: "id", value: "5de680403e5df56bd02c231e"}
			// 	}
			// );

			comp.find('#alterarEncomendaForm').simulate('submit', {
				preventDefault() {
				}
			});

			expect(mockHandleSubmit.mock.calls[1][0]).toEqual({
				descricao: 'Encomenda x',
				nifCliente: '123456789',
				quantidade: '15',
				//id: "5de680403e5df56bd02c231e",
				dataDeEntrega: '2020-01-20T15:33:00.000Z'
			});
		});

	});
});
