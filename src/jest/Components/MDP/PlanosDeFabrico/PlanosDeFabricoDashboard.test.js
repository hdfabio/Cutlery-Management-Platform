import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {PlanoDeFabricoDashboard} from "../../../../components/Dashboard/MDP/PlanosDeFabrico/PlanosDeFabricoDashboard";
import mockStore from "../../../mockStore";

configure({adapter: new Adapter()});


describe('operacoes dashboard', () => {

	let store = mockStore;
	let deleteMock = jest.fn();
	let getMock = jest.fn();
	let wrapper = shallow(<PlanoDeFabricoDashboard
		planosFabrico={store.getState().planosFabrico}/>);

	let instance = wrapper.instance();
	it('', () => {
		const test = [];
		expect(wrapper.state('planosFabrico'));

		expect(instance.props.planosFabrico[0]).toBe(undefined)


	})


});
