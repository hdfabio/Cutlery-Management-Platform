import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {PlanoFabricoDetalhes} from "../../../../components/Dashboard/MDP/PlanosDeFabrico/PlanoFabricoDetalhes";
import mockStore from "../../../mockStore";

configure({adapter: new Adapter()});
describe('Plano Fabrico detalhes', () => {
	let store = mockStore;
	let getMock = jest.fn();

	let wrapper = shallow(<PlanoFabricoDetalhes
		plano={store.getState().planosFabrico.planosFabrico[0]}
	/>);

	const instance = wrapper.instance();

	it("should updated on toggle", () => {
		expect(wrapper.state("toggle")).toBe(false);
		instance.toggle();
		expect(wrapper.state("toggle")).toBe(true);
	});

	it("", () => {
		expect(instance.props.plano.descricao.value).toBeDefined();
		expect(instance.props.plano.planoFabricoOperacoes).toBeDefined();

	})
});
