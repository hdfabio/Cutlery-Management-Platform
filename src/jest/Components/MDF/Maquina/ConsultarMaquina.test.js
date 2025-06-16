import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {ConsultarMaquina} from "../../../../components/Dashboard/MDF/Maquinas/ConsultarMaquina";
import mockStore from "../../../mockStore";

configure({adapter: new Adapter()});
describe('Consultar Máquina', () => {
	let store = mockStore;
	let getMock = jest.fn();

	let wrapper = shallow(<ConsultarMaquina
		maquina={store.getState().maquinas.maquinas[0]}
		getMaquina={getMock}/>);

	const instance = wrapper.instance();

	it("should updated on toggle", () => {
		expect(wrapper.state("toggle")).toBe(false);
		instance.toggle();
		expect(wrapper.state("toggle")).toBe(true);
	});

	it("should have valid info on machine", () => {
		expect(instance.props.maquina.descricao.value).toBeDefined();
		expect(instance.props.maquina.localizacao.value).toBeDefined();
		expect(instance.props.maquina.tipoMaquina.descricao.value).toBeDefined();
	})
});
