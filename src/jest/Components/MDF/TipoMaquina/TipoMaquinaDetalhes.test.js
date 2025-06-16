import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {TipoMaquinaDetalhes} from "../../../../components/Dashboard/MDF/TiposMaquina/TipoMaquinaDetalhes";
import mockStore from "../../../mockStore";

configure({adapter: new Adapter()});
describe('Tipo Maquina detalhes', () => {
	let store = mockStore;
	let getMock = jest.fn();

	let wrapper = shallow(<TipoMaquinaDetalhes
		tipo={store.getState().tiposMaquina.tipoMaquina[0]}
		operacoesTipoMaquina={getMock}/>);

	const instance = wrapper.instance();

	it("should updated on toggle", () => {
		expect(wrapper.state("toggle")).toBe(false);
		instance.toggle();
		expect(wrapper.state("toggle")).toBe(true);
	});

	it("", () => {
		expect(instance.props.tipo.descricao.value).toBeDefined();
		expect(instance.props.tipo.tipoMaquinaOperacaos).toBeDefined();

	})
});
