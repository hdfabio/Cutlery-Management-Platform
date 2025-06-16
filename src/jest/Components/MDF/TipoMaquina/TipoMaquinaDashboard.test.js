import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {TiposMaquinaDashboard} from "../../../../components/Dashboard/MDF/TiposMaquina/TiposMaquinaDashboard";
import TiposMaquinaItem from "../../../../components/Dashboard/MDF/TiposMaquina/TiposMaquinaItem";
import mockStore from "../../../mockStore";

configure({adapter: new Adapter()});
describe('Máquina Dashboard', () => {
	let store = mockStore;
	let wrapper = shallow(<TiposMaquinaDashboard tiposMaquina={store.getState().tiposMaquina}/>);

	it("should have valid info on machine type dashboard", () => {
		const instance = wrapper.instance();

		expect(instance.props.tiposMaquina).toBeDefined();
		expect(wrapper.state("tiposMaquina").length).toBe(0);
	});

	it("should render loading warning", () => {
		wrapper = shallow(<TiposMaquinaDashboard tiposMaquina={{
			tipoMaquina: [], loading: true
		}}/>);

		const instance = wrapper.instance();

		expect(instance.props.tiposMaquina.loading).toBe(true);
		expect(wrapper.type()).toEqual("h1");
	});

	it("should render TiposMaquinaItem", () => {
		wrapper = shallow(<TiposMaquinaDashboard tiposMaquina={{
			tipoMaquina: store.getState().tiposMaquina.tipoMaquina, loading: false
		}}/>);

		const instance = wrapper.instance();

		expect(instance.props.tiposMaquina.loading).toBe(false);
		expect(wrapper.type()).toEqual("div");

		expect(wrapper.find(TiposMaquinaItem).length !== 0).toEqual(true);
	});

	it("should render warning for no machine types", () => {
		wrapper = shallow(<TiposMaquinaDashboard tiposMaquina={{
			tipoMaquina: [], loading: false
		}}/>);

		const instance = wrapper.instance();

		expect(instance.props.tiposMaquina.loading).toBe(false);
		expect(wrapper.find("h6").type()).toEqual("h6");
		expect(wrapper.find("h6.text-danger").text()).toEqual("Não existem tipos de máquina");
	});
});
