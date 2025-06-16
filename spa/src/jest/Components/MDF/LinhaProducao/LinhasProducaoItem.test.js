import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {LinhasProducaoItem} from "../../../../components/Dashboard/MDF/LinhasProducao/LinhasProducaoItem";
import mockStore from "../../../mockStore";

configure({adapter: new Adapter()});

describe('Linhas Producao Item', () => {
	let store = mockStore;
	let wrapper;
	const mockHandleSubmit = jest.fn();


	describe("With", () => {
		it(':)', () => {
			wrapper = shallow(<LinhasProducaoItem
				linha={store.getState().linhasProducao.linhasProducao[0]}
				delete={true} details={true} deleteLinhaProducao={mockHandleSubmit}/>);
			expect(wrapper.find({linha: store.getState().linhasProducao.linhasProducao[0]}))
		});

		it('', () => {
			wrapper = shallow(<LinhasProducaoItem
				linha={store.getState().linhasProducao.linhasProducao[0]}
				delete={true} details={true} deleteLinhaProducao={mockHandleSubmit}/>);
			const instance = wrapper.instance();
			expect(instance.props.details).toBe(true);
			expect(instance.props.delete).toBe(true);
		});

		it('', () => {
			wrapper = shallow(<LinhasProducaoItem
				linha={store.getState().linhasProducao.linhasProducao[0]}
				delete={true} details={true} deleteLinhaProducao={mockHandleSubmit}/>);
			const instance = wrapper.instance();
			expect(instance.props.linha).toBeDefined();

		})
	})
});
