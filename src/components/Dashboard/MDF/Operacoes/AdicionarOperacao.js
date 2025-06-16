import React, {Component} from "react";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {addOperacao} from "../../../../actions/mdf/operacoesActions";

export class AdicionarOperacao extends Component {
	state = {
		toggle: false,
		descricao: "",
		ferramenta: "",
		duracao: 0,
		setup: 0
	};

	onChange = e => {
		this.setState({[e.target.name]: e.target.value});
	};

	handleSubmit = (event) => {
		event.preventDefault();

		const op = {
			descricao: this.state.descricao,
			duracao: this.state.duracao,
			ferramenta: this.state.ferramenta,
			setup: this.state.setup
		};

		this.props.addOperacao(op);
		this.toggle();
	};

	toggle = () => {
		this.setState({toggle: !this.state.toggle})
	};

	render() {
		const {descricao, duracao, ferramenta} = this.state;

		return (
			<div>
				<button
					className={"btn btn-outline-primary"}
					onClick={this.toggle}>
					Adicionar Operação
				</button>
				<Modal
					size="lg"
					aria-labelledby="Add Operacao Dialog"
					show={this.state.toggle}
					onHide={this.toggle}
				>
					<div className='modal-header'>
						<h5 className='modal-title'
						    id='exampleModalCenterTitle'>
							Adicionar Operação
						</h5>
						<button
							type='button'
							className='close'
							aria-label='Close'
							onClick={this.toggle}>
							<span aria-hidden='true'>&times;</span>
						</button>
					</div>
					<div className={"modal-body"}>
						<div className="container">
							<form onSubmit={this.handleSubmit} id="adicionarOperacaoForm">
								<div>
									<div className="input-group mb-3">
										<div className="input-group-prepend">
											<span className="input-group-text" id="basic-addon3">Descrição</span>
										</div>
										<input
											type="text"
											className="form-control"
											onChange={this.onChange}
											id="descricao"
											name={"descricao"}
											aria-describedby="Descricao"/>
									</div>

									<div className="input-group mb-3">
										<div className="input-group-prepend">
											<span className="input-group-text" id="basic-addon3">Duração</span>
										</div>
										<input
											type="number"
											className="form-control"
											onChange={this.onChange}
											id="duracao"
											name={"duracao"}
											aria-describedby="Duração"/>
									</div>

									<div className="input-group mb-3">
										<div className="input-group-prepend">
											<span className="input-group-text" id="basic-addon3">Ferramenta</span>
										</div>
										<input
											type="text"
											className="form-control"
											onChange={this.onChange}
											id="ferramenta"
											name={"ferramenta"}
											aria-describedby="ferramenta"/>
									</div>
									<div className="input-group mb-3">
										<div className="input-group-prepend">
											<span className="input-group-text" id="basic-addon3">Tempo de Preparação</span>
										</div>
										<input
											type="number"
											className="form-control"
											onChange={this.onChange}
											id="setup"
											name={"setup"}
											aria-describedby="Tempo de Preparação"/>
									</div>
								</div>
							</form>
						</div>
					</div>
					<div className={"modal-footer"}>
						<button className={"btn btn-success"} type="submit" onClick={this.handleSubmit}
						        disabled={descricao.length === 0 || duracao === 0 || ferramenta.length === 0}>Add Operação
						</button>
						<button className={"btn btn-danger"} onClick={this.toggle}>Close</button>
					</div>
				</Modal>
			</div>

		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
	{addOperacao}
)(AdicionarOperacao);


