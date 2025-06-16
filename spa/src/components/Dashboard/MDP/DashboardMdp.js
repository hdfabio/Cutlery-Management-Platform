import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import * as uuid from "uuid";
import {getPlanosFabrico} from "../../../actions/mdp/planoFabricoActions";
import {getProdutos} from "../../../actions/mdp/produtoActions";
import PlanoDeFabricoItem from "./PlanosDeFabrico/PlanoDeFabricoItem";
import ProdutoItem from "./Produtos/ProdutoItem";

class DashboardMdp extends Component {

	render() {
		const {planosFabrico} = this.props.planosFabrico;
		const {produtos} = this.props.produtos;

		return (
			<div>
				<div className="row m-auto">
					<div className="col">
						<Link to={"/mdp/planos_fabrico"}>
							<h2>Planos de Fabrico</h2>
						</Link>
						{
							!this.props.planosFabrico.loading && this.props.planosFabrico.planosFabrico.length !== 0 ?
							<div><h6 className={"p-2"}>Count: {planosFabrico.length}</h6>
								<hr/>
								<div className={"list-group maquinas-list-group"}>
									{
										planosFabrico.map(
											m => (<PlanoDeFabricoItem key={uuid()} plano={m} details={false} delete={false}/>))
									}
								</div>
							</div> : <h5 className={"text-danger"}>Não existem planos de fabrico</h5>
						}
					</div>

					<div className={"col"}>
						<Link to={"/mdf/linhas_producao"}>
							<h2>Produtos</h2>
						</Link>
						{
							!this.props.produtos.loading && this.props.produtos.produtos.length !== 0 ? <div>
								<br/>
								<h6 className={"p-2"}>Count: {produtos.length}</h6>
								<hr/>
								<div className={"list-group"}>
									{
										produtos.map(m => (<ProdutoItem key={uuid()} produto={m} details={false} delete={false}/>)
										)
									}
								</div>
							</div> : <h5 className={"text-danger"}>Não existem produtos</h5>}
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		planosFabrico: state.planosFabrico,
		produtos: state.produtos
	};
}

export default connect(
	mapStateToProps,
	{getProdutos, getPlanosFabrico}
)(DashboardMdp);
