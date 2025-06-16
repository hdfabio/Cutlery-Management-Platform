import React, {Component} from "react";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";

export class ConsultarMaquina extends Component {
	state = {
		toggle: false
	};

	toggle = () => {
		this.setState({toggle: !this.state.toggle})
	};

	render() {
		return (
			<div>
				<button
					className={"btn btn-info"}
					onClick={this.toggle}>
					<i className="fa fa-bars"/>
				</button>
				<Modal
					size="lg"
					aria-labelledby="Consultar Máquina"
					show={this.state.toggle} onHide={this.toggle}>
					<div className={"modal-header"}>
						<h5 className={"modal-title"} id="contained-modal-title-vcenter">
							Consultar Maquina
						</h5>
					</div>
					<div className={"modal-body"}>
						<div className="container">
							<div>
								<div className="input-group mb-3">
									<div className="input-group-prepend">
										<span className="input-group-text" id="basic-addon3">Descricao</span>
									</div>
									<label
										className="form-control"
										id="descricao"
										aria-describedby="Descricao">{this.props.maquina.descricao.value}</label>
								</div>
								<div className="input-group mb-3">
									<div className="input-group-prepend">
										<span className="input-group-text" id="basic-addon3">Localizacao</span>
									</div>
									<label
										className="form-control"
										id="localizacao"
										aria-describedby="localizacao">{this.props.maquina.localizacao.value}</label>
								</div>
								<div className="input-group mb-3">
									<div className="input-group-prepend">
										<span className="input-group-text" id="basic-addon1">Tipo de Máquina</span>
									</div>
									<label className="form-control"
									       aria-label="TipoMaquina"
									       aria-describedby="basic-addon1">{this.props.maquina.tipoMaquina.descricao.value}</label>
								</div>
							</div>
						</div>
					</div>
					<div className={"modal-footer"}>
						<button className={"btn btn-danger"} onClick={this.toggle}>Close</button>
					</div>
				</Modal>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		maquinas: state.maquinas,
		tiposMaquina: state.tiposMaquina
	};
}

export default connect(
	mapStateToProps,
	{}
)(ConsultarMaquina);

