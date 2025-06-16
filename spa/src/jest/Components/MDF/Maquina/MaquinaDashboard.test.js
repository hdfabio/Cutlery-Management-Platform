import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {MaquinasDashboard} from "../../../../components/Dashboard/MDF/Maquinas/MaquinasDashboard";
import mockStore from "../../../mockStore";

configure({adapter: new Adapter()});
describe('Máquina Dashboard', () => {
	let store = mockStore;
	let wrapper = shallow(<MaquinasDashboard maquinas={store.getState().maquinas}/>);

	it("should have valid info on machine dashboard", () => {
		const instance = wrapper.instance();

		expect(instance.props.maquinas).toBeDefined();
		expect(wrapper.state("maquinas").length).toBe(0);
	});

	it("should not render if still loading", () => {
		wrapper = shallow(<MaquinasDashboard maquinas={{
			maquinas: [], loading: true
		}}/>);

		const instance = wrapper.instance();

		expect(instance.props.maquinas.loading).toBe(true);
		expect(wrapper.type()).toEqual(null);
	});
});
