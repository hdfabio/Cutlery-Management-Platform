import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from "react-redux";
import uuid from "uuid";
import Header from "../../../Utils/Header";
import ProdutoItem from "../../MDP/Produtos/ProdutoItem";
import AdicionarProduto from "./AdicionarProduto";

export class ProdutosDashboard extends Component {

	state = {
		maquinas: []
	};

	render() {
		const {produtos, loading} = this.props.produtos;

		return (
			!loading ? (
				<div className={"entity"}>
					<Header title={"Produtos"}/>
					<div className={"main"}>
						<div className={"search"}>
							<div className={"mx-2"}>
							</div>
							<div className={"px-2"}>
								<AdicionarProduto/>
							</div>
						</div>
						{
							produtos.length !== 0 ?
							<div className={"list-group pt-3"}>
								{
									produtos.map(maquina =>
										<ProdutoItem key={uuid()} produto={maquina} delete={true} details={true}/>
									)}

							</div> : <h6 className={"text-danger"}>Não existem produtos</h6>}
					</div>
				</div>) : null
		);
	}
}

// PropTypes
ProdutosDashboard.propTypes = {
	produtos: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		produtos: state.produtos
	};
}

export default connect(
	mapStateToProps,
	{}
)(ProdutosDashboard);


