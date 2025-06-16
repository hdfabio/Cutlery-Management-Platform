import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {SelecionarTipoMaquina} from "../../../../components/Dashboard/MDF/Maquinas/SelecionarTipoMaquina";
import mockStore from "../../../mockStore";

configure({adapter: new Adapter()});
describe('Máquinas de um tipo de maquina', () => {
	let store = mockStore;
	let wrapper = shallow(<SelecionarTipoMaquina
		tiposMaquina={store.getState().tiposMaquina}
		maquinas={store.getState().maquinas}/>);
	const instance = wrapper.instance();

	it('should submit', () => {
		let flag = false;

		wrapper.find('#selecionarTipoMaquinaForm').simulate(
			'submit',
			{
				preventDefault() {
					flag = true;
				}
			}
		);

		expect(flag).toBe(true);
	});

	it('should update state with id', () => {
		wrapper.find("#demo-customized-select").simulate(
			"change",
			{
				target: {name: "id", value: "420acb45-c575-4b1b-7cea-08d76aa520bf"}
			}
		);
		expect(wrapper.state("id")).toBe("420acb45-c575-4b1b-7cea-08d76aa520bf");
	});

	it("should updated on toggle", () => {
		expect(wrapper.state("toggle")).toBe(false);
		instance.toggle();
		expect(wrapper.state("toggle")).toBe(true);
	});

	it("should have machines after submit", () => {
		wrapper = shallow(<SelecionarTipoMaquina
			tiposMaquina={store.getState().tiposMaquina}
			maquinas={store.getState().maquinas}/>);
		const instance = wrapper.instance();

		expect(wrapper.state("maqs").length).toBe(0);

		wrapper.find("#demo-customized-select").simulate(
			"change",
			{
				target: {name: "id", value: "420acb45-c575-4b1b-7cea-08d76aa520bf"}
			}
		);
		expect(wrapper.state("id")).toBe("420acb45-c575-4b1b-7cea-08d76aa520bf");

		instance.handleMachines();

	})
});
