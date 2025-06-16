import PropTypes from "prop-types";
import React, {Component} from "react";
import {connect} from "react-redux";
import {deleteProduto} from "../../../../actions/mdp/produtoActions";
import Confirm from "../../../Utils/Confirm";
import AlterarProduto from "./AlterarProduto";
import ProdutoDetalhes from "./ProdutoDetalhes"; // Import css

export class ProdutoItem extends Component {
	state = {
		isOpen: false
	};

	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		})
	};

	render() {
		const {produto} = this.props;

		return (
			<div className={"list-group-item d-flex"}>
				{
					this.props.details ? <div className={"mr-3"}>
						<ProdutoDetalhes produto={produto}/>
					</div> : null
				}
				<p className={"my-auto"}>
					{produto.descricao.value}
				</p>
				{
					this.props.delete ? <div className={"ml-auto d-flex"}>
						<div className={"px-1"}>
							<AlterarProduto produto={produto}/>

						</div>
						<div className={"px-1"}>
							<Confirm
								onConfirm={() => this.props.deleteProduto(produto.id)}
							/>
						</div>
					</div> : null
				}
			</div>
		);
	}
}

// PropTypes
ProdutoItem.propTypes = {
	produto: PropTypes.object.isRequired,
	details: PropTypes.bool.isRequired,
	delete: PropTypes.bool.isRequired,
};

function mapStateToProps() {
	return {}
}

export default connect(mapStateToProps, {deleteProduto})(ProdutoItem);
