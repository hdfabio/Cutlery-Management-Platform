import React, {Component} from "react";
import {connect} from "react-redux";
import uuid from 'uuid'
import Header from "../../../Utils/Header";
import AdicionarOperacao from "./AdicionarOperacao";
import OperacaoItem from "./OperacaoItem";

export class OperacoesDashboard extends Component {
	state = {
		operacoes: []
	};

	render() {
		const {operacoes} = this.props.operacoes;
		return (
			<div className={"entity"}>
				<Header title={"Operações"}/>
				<div className={"main"}>
					<div className={"search"}>
						<AdicionarOperacao/>
					</div>

					{operacoes.length !== 0 ?
					 <div>
						 <p>
							 Operações:
						 </p>
						 <div className={"list-group pt-1"}>
							 {operacoes.map(tipo =>
								 <OperacaoItem key={uuid()} operacao={tipo} delete={true} details={true}/>
							 )}
						 </div>
					 </div>
					                        : <h6 className={"text-danger"}>Não existem operações</h6>}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		operacoes: state.operacoes
	};
}

export default connect(
	mapStateToProps,
	{}
)(OperacoesDashboard);
