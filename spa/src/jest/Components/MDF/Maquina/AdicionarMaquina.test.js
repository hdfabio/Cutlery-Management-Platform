import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {AdicionarMaquina} from "../../../../components/Dashboard/MDF/Maquinas/AdicionarMaquina";
import mockStore from "../../../mockStore";

configure({adapter: new Adapter()});
describe('Adicionar maquina', () => {
	let store;
	let wrapper;

	const mockLoginfn = jest.fn();

	beforeEach(() => {
		store = mockStore;

		wrapper = shallow(<AdicionarMaquina tiposMaquina={store.getState().tiposMaquina} addMaquina={mockLoginfn}/>);
	});

	it('should submit', () => {
		wrapper.find('#adicionarMaquinaForm').simulate(
			'submit',
			{
				preventDefault() {
				}
			}
		);
		expect(mockLoginfn.mock.calls.length).toBe(1);
	});

	it('should submit witl all info', () => {
		wrapper.find('#localizacao').simulate(
			'change',
			{
				target:
					{name: 'localizacao', value: 'local'}
			}
		);

		wrapper.find('#descricao').simulate(
			'change',
			{
				target:
					{name: 'descricao', value: 'cats'}
			}
		);

		wrapper.find("#demo-simple-select").simulate(
			"change",
			{
				target: {name: "tipoMaquina", value: "tipo"}
			}
		);

		wrapper.find('#adicionarMaquinaForm').simulate(
			'submit',
			{
				preventDefault() {
				}
			}
		);

		expect(mockLoginfn.mock.calls[1][0]).toEqual({descricao: 'cats', localizacao: 'local', tipoMaquina: 'tipo'});
	});

	it("Should not have select if there are no machine types", () => {
		wrapper = shallow(<AdicionarMaquina tiposMaquina={{tipoMaquina: []}} addMaquina={mockLoginfn}/>);

		expect(wrapper.find('h6'));
	});
});
