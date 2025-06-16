import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {ProdutoDetalhes} from "../../../../components/Dashboard/MDP/Produtos/ProdutoDetalhes";
import mockStore from "../../../mockStore";

configure({adapter: new Adapter()});
describe('Produto detalhes', () => {
	let store = mockStore;
	let getMock = jest.fn();

	let wrapper = shallow(<ProdutoDetalhes
		produto={store.getState().produtos.produtos[0]}
	/>);

	const instance = wrapper.instance();

	it("should updated on toggle", () => {
		expect(wrapper.state("toggle")).toBe(false);
		instance.toggle();
		expect(wrapper.state("toggle")).toBe(true);
	});

	it("", () => {
		expect(instance.props.produto.descricao.value).toBeDefined();
		expect(instance.props.produto.planoFabrico.descricao.value).toBeDefined();

	})
});
