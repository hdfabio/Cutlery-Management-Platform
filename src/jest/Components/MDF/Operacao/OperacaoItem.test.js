import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {OperacaoItem} from "../../../../components/Dashboard/MDF/Operacoes/OperacaoItem";
import mockStore from "../../../mockStore";
//import {OperacaoDetalhes} from "../../../../components/Dashboard/MDF/Operacoes/OperacaoDetalhes";

configure({adapter: new Adapter()});

describe('Operacao Item', () => {
	let store = mockStore;
	let wrapper;
	const mockHandleSubmit = jest.fn();


	describe("With", () => {
		it(':)', () => {
			wrapper = shallow(<OperacaoItem
				operacao={store.getState().operacoes.operacoes[0]}
				delete={true} details={true} deleteOperacao={mockHandleSubmit}/>);
			expect(wrapper.find({operacao: store.getState().operacoes.operacoes[0]}))
		});

		it('', () => {
			wrapper = shallow(<OperacaoItem
				operacao={store.getState().operacoes.operacoes[0]}
				delete={true} details={true} deleteOperacao={mockHandleSubmit}/>);
			const instance = wrapper.instance();
			expect(instance.props.details).toBe(true);
			expect(instance.props.delete).toBe(true);
		});

		it('', () => {
			wrapper = shallow(<OperacaoItem
				operacao={store.getState().operacoes.operacoes[0]}
				delete={true} details={true} deleteOperacao={mockHandleSubmit}/>);
			const instance = wrapper.instance();
			expect(instance.props.operacao).toBeDefined();

		})
	})
});
