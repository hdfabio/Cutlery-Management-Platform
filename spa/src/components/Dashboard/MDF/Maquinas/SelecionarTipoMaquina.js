import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import PropTypes from 'prop-types'
import React, {Component} from "react";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import uuid from 'uuid';
import MaquinaItem from "./MaquinaItem";

export class SelecionarTipoMaquina extends Component {
	state = {
		toggle: false,
		tipoMaquina: "",
		maqs: [],
		id: ""
	};

	toggle = () => {
		this.setState({toggle: !this.state.toggle})
	};

	handleChange = (e) => {
		const tipoMaquina = e.target.value;

		this.setState({
			id: tipoMaquina
		})
	};

	handleSubmit = (e) => {
		e.preventDefault();

		this.handleMachines();
	};

	handleMachines() {
		const {maquinas} = this.props.maquinas;
		let maqs = [];

		maquinas.map(m =>
			m.tipoMaquina.id === this.state.id ?
			maqs.push(m) : null
		);

		this.setState({
			maqs: maqs,
			tipoMaquina: this.props.tiposMaquina.tipoMaquina.filter(tp => tp.id === this.state.id)[0],
		})
	}

	render() {
		const {tipoMaquina} = this.props.tiposMaquina;
		return (
			<div>
				<form onSubmit={this.handleSubmit} id="selecionarTipoMaquinaForm">
					<div className={"d-flex"}>
						<p className={"mr-2 my-auto"}>Tipos de Máquina:</p>
						<Select
							labelId="demo-customized-select-label"
							id="demo-customized-select"
							value={this.state.id}
							onChange={this.handleChange}>
							{
								tipoMaquina.map(tp =>
									<MenuItem key={uuid()} value={tp.id}>{tp.descricao.value}</MenuItem>
								)
							}
						</Select>
						<button className={"btn btn-outline-primary ml-auto"} id="searchButton"
						        onClick={this.toggle}
						        disabled={this.state.id.length === 0}>
							<i className="fas fa-search"/>
						</button>
					</div>
				</form>
				{this.state.tipoMaquina ? <Modal onHide={this.toggle} show={this.state.toggle}>
					<div className={"modal-header"}>
						<h5 className={"modal-title d-flex"}>
							Lista de Máquinas: {this.state.tipoMaquina.descricao.value}
						</h5>
					</div>
					<div className={"modal-body"}>
						<div className="container">
							<div>{this.state.maqs.length !== 0 ?
							      <div className={"list-group maquinas-list-group"}>
								      {this.state.maqs.map(m =>
									      <MaquinaItem key={uuid} maquina={m} delete={false} details={false}/>
								      )}
							      </div> : <h6 className={"text-danger"}>Não existem máquinas</h6>}
							</div>
						</div>
					</div>
					<div className={"modal-footer"}>
						<button className={"btn btn-danger"} onClick={this.toggle}>Close</button>
					</div>
				</Modal> : null}
			</div>
		);
	}
}

SelecionarTipoMaquina.propTypes = {
	tiposMaquina: PropTypes.object.isRequired,
	maquinas: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		tiposMaquina: state.tiposMaquina,
		maquinas: state.maquinas
	};
}

export default connect(
	mapStateToProps,
	{},
)(SelecionarTipoMaquina);
