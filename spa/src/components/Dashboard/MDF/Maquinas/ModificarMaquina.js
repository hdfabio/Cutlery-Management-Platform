import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React, {Component} from "react";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import uuid from "uuid";
import {alterarTipoMaquina} from "../../../../actions/mdf/maquinaActions";

export class ModificarMaquina extends Component {
	state = {
		descricao: "",
		localizacao: "",
		tipoMaquina: "",
		toggle: false
	};

	componentDidMount() {
		this.setState({
			descricao: this.props.maquina.descricao.value,
			localizacao: this.props.maquina.localizacao.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault();

		const maq = {
			id: this.props.maquina.id,
			descricao: this.props.maquina.descricao.value,
			localizacao: this.props.maquina.localizacao.value,
			tipoMaquina: this.state.tipoMaquina
		};

		this.props.alterarTipoMaquina(maq);
		this.toggle();
	};

	toggle = () => {
		this.setState({toggle: !this.state.toggle})
	};

	handleChange = (e) => {
		this.setState({
			tipoMaquina: e.target.value
		})
	};

	tipoMaquina = (id) => {
		return this.props.tiposMaquina.tipoMaquina.filter(tp => tp.id === id);
	};

	render() {
		const {tipoMaquina} = this.props.tiposMaquina;

		return (
			<div>
				<button
					className={"btn btn-warning"}
					onClick={this.toggle}
					id={"ButaoModificarId"}
				>
					<i className="fa fa-edit"/>
				</button>
				<Modal
					size="lg"
					aria-labelledby="Alterar Máquina"
					show={this.state.toggle}
					onHide={this.toggle}
				>
					<div className={"modal-header"}>
						<h5 className={"modal-title"} id="contained-modal-title-vcenter">
							Modificar Maquina
						</h5>
					</div>
					<div className={"modal-body"}>
						<div className="container">
							<form onSubmit={this.handleSubmit} id="modificarMaquinaForm">
								<div>
									<div className="input-group mb-3">
										<div className="input-group-prepend">
											<span className="input-group-text" id="basic-addon3">Descricao</span>
										</div>
										<p className="form-control"
										   id="descricao"
										   aria-describedby="Descricao">{this.state.descricao}</p>
									</div>
									<div className="input-group mb-3">
										<div className="input-group-prepend">
											<span className="input-group-text" id="basic-addon3">Localizacao</span>
										</div>
										<p className="form-control"
										   id="localizacao"
										   aria-describedby="localizacao">{this.state.localizacao}</p>
									</div>
									{
										tipoMaquina.length !== 0 ? <div><label>Tipo de Máquina</label>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												value={this.state.tipoMaquina}
												onChange={this.handleChange}
											>
												{tipoMaquina.map(tp =>
													<MenuItem key={uuid()} value={tp.id}>{tp.descricao.value}</MenuItem>
												)}
											</Select>
										</div> : <h6 className={"text-danger"}>Não existem tipos de máquina</h6>
									}

								</div>
							</form>
						</div>
					</div>
					<div className={"modal-footer"}>
						<button className={"btn btn-success"} onClick={this.handleSubmit}
						        disabled={this.state.tipoMaquina.length === 0}>Edit Maquina
						</button>
						<button className={"btn btn-danger"} onClick={this.toggle}>Close</button>
					</div>
				</Modal></div>
		);
	}
}

function mapStateToProps(state) {
	return {
		tiposMaquina: state.tiposMaquina
	};
}

export default connect(
	mapStateToProps,
	{alterarTipoMaquina}
)(ModificarMaquina);


