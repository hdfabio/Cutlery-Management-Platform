import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {ProdutosDashboard} from "../../../../components/Dashboard/MDP/Produtos/ProdutosDashboard";
import mockStore from "../../../mockStore";

configure({adapter: new Adapter()});


describe('operacoes dashboard', () => {

	let store = mockStore;
	let deleteMock = jest.fn();
	let getMock = jest.fn();
	let wrapper = shallow(<ProdutosDashboard
		produtos={store.getState().produtos}/>);

	let instance = wrapper.instance();
	it('', () => {
		const test = [];
		expect(wrapper.state('produtos'));

		expect(instance.props.produtos[0]).toBe(undefined)


	})


});
