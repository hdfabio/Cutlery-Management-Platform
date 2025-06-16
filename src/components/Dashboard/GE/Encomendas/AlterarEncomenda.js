import PropTypes from 'prop-types';
import React, {Component} from "react";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {alterarEncomenda} from "../../../../actions/ge/encomendaActions";

export class AlterarEncomenda extends Component {
	state = {id: "", descricao: "", nifCliente: "", quantidade: "", dataDeEntrega: "", toggle: false};

	componentDidMount() {
		const {encomenda} = this.props;
		this.setState({
			id: encomenda.id,
			descricao: encomenda.descricao,
			nifCliente: encomenda.nifCliente,
			quantidade: encomenda.quantidade,
			dataDeEntrega: encomenda.dataDeEntrega
		});
	}

	onChange = e => {
		this.setState({[e.target.name]: e.target.value});
	};
	handleSubmit = (event) => {
		event.preventDefault();
		const enc = {
			id: this.state.id,
			descricao: this.state.descricao,
			nifCliente: this.state.nifCliente,
			quantidade: this.state.quantidade,
			dataDeEntrega: this.state.dataDeEntrega
		};
		this.props.alterarEncomenda(enc);
		this.toggle();
	};
	toggle = () => {
		this.setState({toggle: !this.state.toggle})
	};

	render() {
		return (<div>
			<button className={"btn btn-warning"} onClick={this.toggle}><i className="fa fa-edit"/></button>
			<Modal size="lg" aria-labelledby="Alterar Encomenda" show={this.state.toggle} onHide={this.toggle}>
				<div className={"modal-header"}><h5 className='modal-title' id='exampleModalCenterTitle'> Alterar
					Encomenda </h5>
					<button type='button' className='close' aria-label='Close' onClick={this.toggle}><span
						aria-hidden='true'>&times;</span></button>
				</div>
				<div className={"modal-body"}>
					<div className="container">
						<form onSubmit={this.handleSubmit} id="alterarEncomendaForm">
							<div>
								<div className="input-group mb-3">
									<div className="input-group-prepend">
										<span className="input-group-text" id="basic-addon3">Descricao</span>
									</div>
									<input type="text"
									       className="form-control"
									       onChange={this.onChange}
									       id="descricao"
									       name={"descricao"}
									       aria-describedby="Descricao"/>
								</div>
								<div className="input-group mb-3">
									<div className="input-group-prepend">
										<span className="input-group-text" id="basic-addon3">nifCliente</span>
									</div>
									<input type="text"
									       className="form-control"
									       onChange={this.onChange}
									       id="nifCliente"
									       name={"nifCliente"}
									       aria-describedby="nifCliente"/>
								</div>
								<div className="input-group mb-3">
									<div className="input-group-prepend">
										<span className="input-group-text" id="basic-addon3">quantidade</span>
									</div>
									<input type="text"
									       className="form-control"
									       onChange={this.onChange}
									       id="quantidade"
									       name={"quantidade"}
									       aria-describedby="quantidade"/>
								</div>
								<div className="input-group mb-3">
									<div className="input-group-prepend">
										<span className="input-group-text" id="basic-addon3">dataDeEntrega</span>
									</div>
									<input type="text"
									       className="form-control"
									       onChange={this.onChange}
									       id="dataDeEntrega"
									       name={"dataDeEntrega"}
									       aria-describedby="dataDeEntrega"/>
								</div>
							</div>
							<div className="input-group mb-3">
							</div>
						</form>
					</div>
				</div>
				<div className={"modal-footer"}>
					<button className={"btn btn-success"} type="submit" id={"altId"} onClick={this.handleSubmit}>
						Alterar Encomenda
					</button>
					<button className={"btn btn-danger"} onClick={this.toggle}>Close</button>
				</div>
			</Modal>
		</div>);
	}
}

AlterarEncomenda.propTypes =
	{encomenda: PropTypes.object.isRequired};

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
	{alterarEncomenda}
)(AlterarEncomenda);

