import PropTypes from "prop-types";
import React, {Component} from 'react';
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import uuid from 'uuid'
import {
	addOperacaoTipoMaquina,
	operacoesTipoMaquina,
	updateOperacoesTipoMaquina
} from "../../../../actions/mdf/tiposMaquinaActions";
import MultipleSelect from "../../../Utils/MultipleSelect";
import SingleSelect from "../../../Utils/SingleSelect";

export class AdicionarOperacao extends Component {
	state = {
		toggle: false,
		descricao: this.props.tipo.descricao.value,
		op: "",
		opsTipo: [],
		multiOps: []
	};

	toggle = () => {
		this.setState({
			toggle: !this.state.toggle
		})
	};

	handleAddOneOperacao = (event) => {
		event.preventDefault();

		const info = {
			op: this.state.op,
			tp: this.props.tipo.id
		};

		this.props.addOperacaoTipoMaquina(info);
		this.toggle();
	};

	handleEditOperacoes = (event) => {
		event.preventDefault();

		this.props.updateOperacoesTipoMaquina(this.props.tipo.id, this.state.multiOps);
		this.toggle();
	};

	options = () => {
		let opt = [];

		this.props.operacoes.operacoes.map(op => {
			opt.push({value: op.id, label: op.descricao.value});
			return null;
		});
		return opt;
	};

	singleCallback = (info) => {
		this.setState({
			op: info
		})
	};

	multipleCallback = (info) => {
		this.setState({
			multiOps: info
		})
	};

	render() {
		return (
			<div>
				<button className={"btn btn-warning"} onClick={this.toggle} id={"addOpId"} title="Adicionar máquina">
					<i className={"fa fa-edit"}/>
				</button>
				<Modal
					size="xl"
					show={this.state.toggle}
					onHide={this.toggle}
				>
					<div className={"modal-header"}>
						<h5 className={"modal-title d-flex my-auto"}>
							Editar Tipo de Máquina: <p className={"px-1"}>{this.props.tipo.descricao.value}</p>
						</h5>
					</div>
					<div className={"modal-body"}>
						<div className={"container"}>
							<ul className="nav nav-tabs" id="myTab" role="tablist">
								<li className="nav-item">
									<a className="nav-link active" id="add-operacao-tab" data-toggle="tab" href={"#umaOp"} role="tab"
									   aria-controls="umaOp" aria-selected="true">Adicionar uma operação</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" id="profile-tab" data-toggle="tab" href={"#todasOps"} role="tab"
									   aria-controls="todasOps" aria-selected="false">Alterar operações</a>
								</li>
							</ul>
							<div className="tab-content" id="myTabContent">
								<div className="tab-pane fade show active" id="umaOp" role="tabpanel"
								     aria-labelledby="op-tab"><label>Operações:</label>
									<div className={"list-group"}>
										{
											this.state.opsTipo.map(
												op => <li key={uuid()} className={"list-group-item"}>{op.descricao.value}</li>)
										}
									</div>
									<hr/>
									<div className={"d-flex"}>
										<p className={"mr-3 my-auto"}>Selecione uma operação:</p>
										<SingleSelect label={"Operação"} options={this.options()} callback={this.singleCallback}/>
										<button className={"btn btn-outline-success ml-auto"} onClick={this.handleAddOneOperacao}
										        disabled={this.state.op.length === 0}>Submit
										</button>
									</div>
								</div>
								<div className="tab-pane fade" id="todasOps" role="tabpanel" aria-labelledby="ops-tab">
									<div className={"d-flex mt-2"}>
										<p className={"mr-3 my-auto"}>Selecione as Operações:</p>
										<MultipleSelect callback={this.multipleCallback} values={this.options()} selected={[]}/>
										<button className={"btn btn-outline-success ml-auto"} onClick={this.handleEditOperacoes}
										        disabled={this.state.multiOps.length === 0}>Submit
										</button>
									</div>
									<p className={"text-danger"}>Altera todas as operações do tipo de maquina</p>
								</div>
							</div>
						</div>
					</div>
					<div className={"modal-footer"}>
						<button className={"btn btn-outline-danger"} onClick={this.toggle}>Cancel</button>
					</div>
				</Modal>
			</div>
		);
	}
}


AdicionarOperacao.propTypes = {
	tipo: PropTypes.object.isRequired,
	operacoes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		operacoes: state.operacoes
	}
}

export default connect(mapStateToProps,
	{addOperacaoTipoMaquina, operacoesTipoMaquina, updateOperacoesTipoMaquina})(AdicionarOperacao);
