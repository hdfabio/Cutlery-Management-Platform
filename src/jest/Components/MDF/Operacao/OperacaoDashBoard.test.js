import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {OperacoesDashboard} from "../../../../components/Dashboard/MDF/Operacoes/OperacoesDashboard";
import mockStore from "../../../mockStore";

configure({adapter: new Adapter()});


describe('operacoes dashboard', () => {

	let store = mockStore;
	let deleteMock = jest.fn();
	let getMock = jest.fn();
	let wrapper = shallow(<OperacoesDashboard
		operacoes={store.getState().operacoes}/>);

	let instance = wrapper.instance();
	it('', () => {
		const test = [];
		expect(wrapper.state('operacoes'));

		expect(instance.props.operacoes[0]).toBe(undefined)


	})


});
