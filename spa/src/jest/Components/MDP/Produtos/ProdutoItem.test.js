import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {deleteProduto} from "../../../../actions/mdp/produtoActions";
import {ProdutoItem} from "../../../../components/Dashboard/MDP/Produtos/ProdutoItem";
import mockStore from "../../../mockStore";

configure({adapter: new Adapter()});
describe('Máquinas Item', () => {
	let store = mockStore;
	let deleteMock = jest.fn();
	let getMock = jest.fn();

	let wrapper = shallow(<ProdutoItem
		produto={store.getState().produtos.produtos[0]}
		details={false}
		delete={true}
		deteleProduto={deleteProduto} getProduto={getMock}/>);

	const instance = wrapper.instance();

	it('boolean props should correct values', () => {
		expect(instance.props.details).toBe(false);
		expect(instance.props.delete).toBe(true);
	});

	it("should have a description on plano de fabrico", () => {
		expect(instance.props.produto.descricao.value).toBeDefined();
	})
});
