import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {MaquinaItem} from "../../../../components/Dashboard/MDF/Maquinas/MaquinaItem";
import mockStore from "../../../mockStore";

configure({adapter: new Adapter()});
describe('Máquinas Item', () => {
	let store = mockStore;
	let deleteMock = jest.fn();
	let getMock = jest.fn();

	let wrapper = shallow(<MaquinaItem
		maquina={store.getState().maquinas.maquinas[0]}
		details={false}
		delete={true}
		deteleMaquina={deleteMock} getMaquina={getMock}/>);

	const instance = wrapper.instance();

	it('boolean props should correct values', () => {
		expect(instance.props.details).toBe(false);
		expect(instance.props.delete).toBe(true);
	});

	it("should have a description on machine", () => {
		expect(instance.props.maquina.descricao.value).toBeDefined();
	})
});
