import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React, {Component} from "react";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {addMaquina} from "../../../../actions/mdf/maquinaActions";

const uuid = require("uuid");

export class AdicionarMaquina extends Component {
	state = {
		descricao: "",
		localizacao: "",
		tipoMaquina: "",
		toggle: false
	};

	handleSubmit = (event) => {
		event.preventDefault();

		const maq = {
			descricao: this.state.descricao,
			localizacao: this.state.localizacao,
			tipoMaquina: this.state.tipoMaquina
		};

		this.props.addMaquina(maq);
		this.toggle();
	};

	toggle = () => {
		this.setState({toggle: !this.state.toggle})
	};

	onChange = e => {
		this.setState({[e.target.name]: e.target.value});
	};

	handleChange = (e) => {
		this.setState({
			tipoMaquina: e.target.value
		})
	};

	render() {
		const {tipoMaquina} = this.props.tiposMaquina;

		return (
			<div>
				<button
					className={"btn btn-outline-primary"}
					onClick={this.toggle}
				>
					Adicionar Maquina
				</button>
				<Modal
					size="lg"
					aria-labelledby="Add Maquina Dialog"
					onHide={this.toggle}
					show={this.state.toggle}
				>
					<div className={"modal-header"}>
						<h5 className={"modal-title"} id="contained-modal-title-vcenter">
							Criar Maquina
						</h5>
					</div>
					<div className={"modal-body"}>
						<div className="container">
							<form onSubmit={this.handleSubmit} id="adicionarMaquinaForm">
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
											<span className="input-group-text" id="basic-addon3">Localizacao</span>
										</div>
										<input type="text"
										       className="form-control"
										       onChange={this.onChange}
										       id="localizacao"
										       name={"localizacao"}
										       aria-describedby="localizacao"/>
									</div>
									<label>Tipo de Máquina</label>
									{
										this.props.tiposMaquina.tipoMaquina.length !== 0 ?
										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={this.state.tipoMaquina}
											onChange={this.handleChange}
										>
											{tipoMaquina.map(tp =>
												<MenuItem key={uuid()} value={tp.id}>{tp.descricao.value}</MenuItem>
											)}
										</Select> : <h6 className={"text-danger"} id="error">Não existem tipos de maquinas</h6>
									}
								</div>
							</form>
						</div>
					</div>
					<Modal.Footer>
						<button className={"btn btn-success"} onClick={this.handleSubmit}
						        disabled={this.props.tiposMaquina.tipoMaquina.length === 0}>Add Maquina
						</button>
						<button className={"btn btn-danger"} onClick={this.toggle}>Close</button>
					</Modal.Footer>
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
	{addMaquina},
)(AdicionarMaquina);


