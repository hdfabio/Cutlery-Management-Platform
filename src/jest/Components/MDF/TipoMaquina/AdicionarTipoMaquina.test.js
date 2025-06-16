import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {AdicionarTipoMaquina} from "../../../../components/Dashboard/MDF/TiposMaquina/AdicionarTipoMaquina";
import MultipleSelect from "../../../../components/Utils/MultipleSelect";
import mockStore from "../../../mockStore";

configure({adapter: new Adapter()});
describe('Adicionar tipo de maquina', () => {
	let store;
	let wrapper;
	const mockLoginfn = jest.fn();
	let instance;

	beforeEach(() => {
		store = mockStore;

		wrapper = shallow(<AdicionarTipoMaquina
			tiposMaquina={store.getState().tiposMaquina}
			maquinas={store.getState().maquinas}
			operacoes={store.getState().operacoes}
			addTipoMaquina={mockLoginfn}/>);

		instance = wrapper.instance()
	});

	it('should submit', () => {
		wrapper.find('#adicionarTipoMaquinaForm').simulate(
			'submit',
			{
				preventDefault() {
				}
			}
		);
		expect(mockLoginfn.mock.calls.length).toBe(1);
	});

	it('should submit witl all info', () => {
		wrapper.find('#descricao').simulate(
			'change',
			{
				target:
					{name: 'descricao', value: 'cats'}
			}
		);

		instance.myCallback(['9f531c24-441d-4140-1d56-08d76aa2e2ef']);

		wrapper.find('#adicionarTipoMaquinaForm').simulate(
			'submit',
			{
				preventDefault() {
				}
			}
		);

		expect(mockLoginfn.mock.calls[1][0]).toEqual({descricao: 'cats', ops: ['9f531c24-441d-4140-1d56-08d76aa2e2ef']});
	});

	it("should toggle", () => {
		expect(instance.state.toggle).toBe(false);
		instance.toggle();
		expect(instance.state.toggle).toBe(true);
	});

	it("Should not have select if there are no operations", () => {
		wrapper = shallow(<AdicionarTipoMaquina
			tiposMaquina={store.getState().tiposMaquina}
			maquinas={store.getState().maquinas}
			operacoes={{operacoes: [], loading: false}}
			addTipoMaquina={mockLoginfn}/>);

		instance = wrapper.instance();

		expect(wrapper.find(MultipleSelect)).toEqual({});
	});
});
