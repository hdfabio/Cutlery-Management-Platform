import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {LinhaProducaoDetalhes} from "../../../../components/Dashboard/MDF/LinhasProducao/LinhaProducaoDetalhes";
import mockStore from "../../../mockStore";

configure({adapter: new Adapter()});
describe('Linha Producao detalhes', () => {
	let store = mockStore;
	let getMock = jest.fn();

	let wrapper = shallow(<LinhaProducaoDetalhes
		linha={store.getState().linhasProducao.linhasProducao[0]}
		getLinhasProducao={getMock}/>);

	const instance = wrapper.instance();

	it("should updated on toggle", () => {
		expect(wrapper.state("toggle")).toBe(false);
		instance.toggle();
		expect(wrapper.state("toggle")).toBe(true);
	});

	it("", () => {
		expect(instance.props.linha.descricao.value).toBeDefined();

	})
});
