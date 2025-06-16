import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {ModificarMaquina} from "../../../../components/Dashboard/MDF/Maquinas/ModificarMaquina";
import mockStore from "../../../mockStore";

configure({adapter: new Adapter()});
describe('Modificar Máquina', () => {
	const mockHandleSubmit = jest.fn();
	let store = mockStore;
	let wrapper;

	describe("With machine types", () => {
		it('should submit', () => {
			wrapper =
				shallow(<ModificarMaquina
					maquina={store.getState().maquinas.maquinas[0]}
					tiposMaquina={store.getState().tiposMaquina}
					alterarTipoMaquina={mockHandleSubmit}/>);

			wrapper.find('#modificarMaquinaForm').simulate(
				'submit',
				{
					preventDefault() {
					}
				}
			);
			expect(mockHandleSubmit.mock.calls.length).toBe(1);
		});

		it('should submit with machine type', () => {
			const comp = shallow(<ModificarMaquina
				maquina={store.getState().maquinas.maquinas[0]}
				tiposMaquina={store.getState().tiposMaquina}
				alterarTipoMaquina={mockHandleSubmit}/>);

			comp.find("#demo-simple-select").simulate(
				"change",
				{
					target: {name: "tipoMaquina", value: "tipo"}
				}
			);

			comp.find('#modificarMaquinaForm').simulate('submit', {
				preventDefault() {
				}
			});

			expect(mockHandleSubmit.mock.calls[1][0]).toEqual({
				descricao: 'M1',
				localizacao: 'Ali',
				tipoMaquina: 'tipo',
				id: "d1faa64d-0892-4669-a3b5-08d77806152b"
			});
		});

	});

	describe("With no machine types", () => {
		wrapper =
			shallow(<ModificarMaquina
				maquina={store.getState().maquinas.maquinas[0]}
				tiposMaquina={{tipoMaquina: []}}
				alterarTipoMaquina={mockHandleSubmit}/>);

		it("Should not have select", () => {
			expect(wrapper.find('h6'));
		});

		it("Submit button should be disabled", () => {
			expect(wrapper.find(".btn"))
		})
	});
});
