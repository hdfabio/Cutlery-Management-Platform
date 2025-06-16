import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {OperacaoDetalhes} from "../../../../components/Dashboard/MDF/Operacoes/OperacaoDetalhes";
import mockStore from "../../../mockStore";
//import {ModificarMaquina} from "../../../../components/Dashboard/MDF/Maquinas/ModificarMaquina";

configure({adapter: new Adapter()});
describe('Operacao Detalhes', () => {
	//const mockHandleSubmit = jest.fn();
	let store = mockStore;
	let wrapper;

	describe("With", () => {
		wrapper =
			shallow(<OperacaoDetalhes
				op={store.getState().operacoes.operacoes[0]}/>);
		it("Toggle should be false", () => {

			expect(wrapper.state('toggle')).toBe(false);
		});

		it("Toggle should be true", () => {
			const instance = wrapper.instance();
			instance.toggle();
			expect(wrapper.state('toggle')).toBe(true);
		})


	});
});
