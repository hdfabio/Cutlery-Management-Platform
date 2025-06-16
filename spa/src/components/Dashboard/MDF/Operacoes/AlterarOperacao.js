import PropTypes from 'prop-types';
import React, {Component} from "react";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {alterarOperacao} from "../../../../actions/mdf/operacoesActions";

export class AlterarOperacao extends Component {
	state = {
		id: "",
		descricao: "",
		ferramenta: "",
		execucao: "",
		setup: "",

		toggle: false
	};

	componentDidMount() {
		const {operacao} = this.props;

		this.setState({
			id: operacao.id,
			descricao: operacao.descricao.value,
			ferramenta: operacao.ferramenta.descricao.value,
			execucao: operacao.execucao.value,
			setup: operacao.ferramenta.setup.value
		});
	}

	onChange = e => {
		this.setState({[e.target.name]: e.target.value});
	};

	handleSubmit = (event) => {
		event.preventDefault();

		const op = {
			id: this.state.id,
			descricao: this.state.descricao,
			execucao: this.state.execucao,
			ferramenta: this.state.ferramenta,
			setup: this.state.setup
		};

		this.props.alterarOperacao(op);
		this.toggle();
	};

	toggle = () => {
		this.setState({toggle: !this.state.toggle})
	};

	render() {
		return (
			<div>
				<button
					className={"btn btn-warning"}
					id={"btnModId"}
					onClick={this.toggle}
				>
					<i className="fa fa-edit"/>
				</button>
				<Modal
					size="lg"
					aria-labelledby="Change Operacao Dialog"
					show={this.state.toggle}
					onHide={this.toggle}
				>
					<div className='modal-header'>
						<h5 className='modal-title'
						    id='exampleModalCenterTitle'>
							Alterar Operação
						</h5>
						<button
							type='button'
							className='close'
							aria-label='Close'
							onClick={this.toggle}
						>
							<span aria-hidden='true'>&times;</span>
						</button>
					</div>
					<div className={"modal-body"}>
						<div className="container">
							<form onSubmit={this.handleSubmit} id="modificarOperacaoForm">
								<div>
									<div className="input-group mb-3">
										<div className="input-group-prepend">
											<span className="input-group-text" id="basic-addon3">Descrição</span>
										</div>
										<input
											type="text"
											className="form-control"
											id="descricao"
											name={"descricao"}
											value={this.state.descricao}
											onChange={this.onChange}
											aria-describedby="Descricao"/>
									</div>
									<div className="input-group mb-3">
										<div className="input-group-prepend">
											<span className="input-group-text" id="basic-addon3">Execucao</span>
										</div>
										<input
											type="number"
											className="form-control"
											onChange={this.onChange}
											id="duracao"
											name={"duracao"}
											value={this.state.execucao}
											aria-describedby="Duração"/>
									</div>
									<div className="input-group mb-3">
										<div className="input-group-prepend">
											<span className="input-group-text" id="basic-addon3">Ferramenta</span>
										</div>
										<input
											type="text"
											className="form-control"
											id="ferramenta"
											name={"ferramenta"}
											value={this.state.ferramenta}
											onChange={this.onChange}
											aria-describedby="ferramenta"/>
									</div>

									<div className="input-group mb-3">
										<div className="input-group-prepend">
											<span className="input-group-text" id="basic-addon3">Setup</span>
										</div>
										<input
											type="number"
											className="form-control"
											onChange={this.onChange}
											id="setup"
											name={"setup"}
											value={this.state.setup}
											aria-describedby="Prep"/>
									</div>
								</div>
							</form>
						</div>
					</div>
					<div className={"modal-footer"}>
						<button className={"btn btn-success"} type="submit" id={"altId"} onClick={this.handleSubmit}>Alterar
							Operação
						</button>
						<button className={"btn btn-danger"} onClick={this.toggle}>Close</button>
					</div>
				</Modal>
			</div>

		);
	}
}

AlterarOperacao.propTypes = {
	operacao: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
	{alterarOperacao}
)(AlterarOperacao);


