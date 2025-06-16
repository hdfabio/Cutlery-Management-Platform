import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import TipoMaquinaDetalhes from "../../../../components/Dashboard/MDF/TiposMaquina/TipoMaquinaDetalhes";
import {TiposMaquinaItem} from "../../../../components/Dashboard/MDF/TiposMaquina/TiposMaquinaItem";
import mockStore from "../../../mockStore";

configure({adapter: new Adapter()});
describe('Máquinas Item', () => {
	let store = mockStore;
	let deleteMock = jest.fn();
	let getMock = jest.fn();

	let wrapper = shallow(<TiposMaquinaItem
		tipoMaquina={store.getState().tiposMaquina.tipoMaquina[0]}
		details={false}
		delete={true}
		deteleTipoMaquina={deleteMock}/>);

	const instance = wrapper.instance();

	it('boolean props should correct values', () => {
		expect(instance.props.details).toBe(false);
		expect(instance.props.delete).toBe(true);
	});

	it("should have a description on machine type", () => {
		expect(instance.props.tipoMaquina.descricao.value).toBeDefined();
	});

	it("should have div to add op/ delete type if prop true", () => {
		expect(wrapper.find("#delete-div").type()).toBe("div")
	});

	it("should have div to add op/ delete type if prop false", () => {
		wrapper = shallow(<TiposMaquinaItem
			tipoMaquina={store.getState().tiposMaquina.tipoMaquina[0]}
			details={false}
			delete={false}
			deteleTipoMaquina={deleteMock}/>);

		expect(wrapper.find("#delete-div")).toEqual({})
	});

	it("should have div details if prop true", () => {
		wrapper = shallow(<TiposMaquinaItem
			tipoMaquina={store.getState().tiposMaquina.tipoMaquina[0]}
			details={true}
			delete={false}
			deteleTipoMaquina={deleteMock}/>);

		expect(wrapper.find(TipoMaquinaDetalhes).length).toBe(1)
	});

	it("should have div details if prop false", () => {
		wrapper = shallow(<TiposMaquinaItem
			tipoMaquina={store.getState().tiposMaquina.tipoMaquina[0]}
			details={false}
			delete={false}
			deteleTipoMaquina={deleteMock}/>);

		expect(wrapper.find("#details-div")).toEqual({})
	})
});
