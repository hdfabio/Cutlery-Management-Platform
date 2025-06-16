import PropTypes from "prop-types";
import React, {Component} from "react";
import {connect} from "react-redux";
import {deleteOperacao} from "../../../../actions/mdf/operacoesActions";
import Confirm from "../../../Utils/Confirm";
import AlterarOperacao from "./AlterarOperacao";
import OperacaoDetalhes from "./OperacaoDetalhes";

export class OperacaoItem extends Component {

	render() {
		const {descricao} = this.props.operacao;

		return (
			<div className={"d-flex list-group-item"}>
				{
					this.props.details ?
					<div className={"mr-4"}>
						<OperacaoDetalhes op={this.props.operacao}/>
					</div> : null
				}
				<p className={"my-auto"}>
					{descricao.value}
				</p>
				{
					this.props.delete ? <div className={"ml-auto d-flex"}>
						<div className={"px-1"}>
							<AlterarOperacao operacao={this.props.operacao}/>
						</div>
						<div className={"px-1"}>
							<Confirm
								onConfirm={() => this.props.deleteOperacao(this.props.operacao.id)}
							/>
						</div>
					</div> : null
				}
			</div>
		);
	}
}

// PropTypes
OperacaoItem.propTypes = {
	operacao: PropTypes.object.isRequired,
	details: PropTypes.bool.isRequired,
	delete: PropTypes.bool.isRequired,
};

function mapStateToProps() {
	return {}
}

export default connect(mapStateToProps, {
	deleteOperacao
})(OperacaoItem);
