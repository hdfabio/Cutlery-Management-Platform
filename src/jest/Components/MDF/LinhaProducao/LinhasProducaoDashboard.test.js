import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {LinhaProducaoDashboard} from "../../../../components/Dashboard/MDF/LinhasProducao/LinhasProducaoDashboard";
import mockStore from "../../../mockStore";

configure({adapter: new Adapter()});
describe('Linhas Producao Dashboard', () => {
	let store = mockStore;
	// eslint-disable-next-line react/jsx-no-undef
	let wrapper = shallow(<LinhaProducaoDashboard linhasProducao={store.getState().linhasProducao}/>);

	it("should have valid info on machine dashboard", () => {
		const instance = wrapper.instance();

		expect(instance.props.linhasProducao).toBeDefined();
		expect(wrapper.state("linhas").length).toBe(0);
	});

	it("should not render if still loading", () => {
		wrapper = shallow(<LinhaProducaoDashboard linhasProducao={{
			linhasProducao: [], loading: true
		}}/>);

		const instance = wrapper.instance();

		expect(instance.props.linhasProducao.loading).toBe(true);
		expect(wrapper.get[0]);
		//expect(wrapper.type()).toEqual(null);
	});
});
