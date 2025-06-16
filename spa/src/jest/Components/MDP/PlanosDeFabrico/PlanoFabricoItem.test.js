import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {deletePlanoFabrico} from "../../../../actions/mdp/planoFabricoActions";
import {PlanoDeFabricoItem} from "../../../../components/Dashboard/MDP/PlanosDeFabrico/PlanoDeFabricoItem";
import mockStore from "../../../mockStore";

configure({adapter: new Adapter()});
describe('Máquinas Item', () => {
	let store = mockStore;
	let deleteMock = jest.fn();
	let getMock = jest.fn();

	let wrapper = shallow(<PlanoDeFabricoItem
		plano={store.getState().planosFabrico.planosFabrico[0]}
		details={false}
		delete={true}
		deteleMaquina={deletePlanoFabrico} getPlanoFabrico={getMock}/>);

	const instance = wrapper.instance();

	it('boolean props should correct values', () => {
		expect(instance.props.details).toBe(false);
		expect(instance.props.delete).toBe(true);
	});

	it("should have a description on plano de fabrico", () => {
		expect(instance.props.plano.descricao.value).toBeDefined();
	})
});
