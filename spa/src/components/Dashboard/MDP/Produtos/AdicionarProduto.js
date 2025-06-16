import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React, {Component} from "react";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {addProduto} from "../../../../actions/mdp/produtoActions";

const uuid = require("uuid");

export class AdicionarProduto extends Component {
	state = {
		descricao: "",
		planoFabrico: "",
		toggle: false
	};

	handleSubmit = (event) => {
		event.preventDefault();

		const prod = {
			descricao: this.state.descricao,
			IdPlano: this.state.planoFabrico
		};

		this.props.addProduto(prod);
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
			planoFabrico: e.target.value
		})
	};

	render() {
		const {planosFabrico} = this.props.planosFabrico;

		return (
			<div>
				<button
					className={"btn btn-outline-primary"}
					onClick={this.toggle}
				>
					Adicionar Produto
				</button>
				<Modal
					size="lg"
					aria-labelledby="Add Maquina Dialog"
					onHide={this.toggle}
					show={this.state.toggle}
				>
					<div className='modal-header'>
						<h5 className='modal-title'
						    id='exampleModalCenterTitle'>
							Criar novo produto
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
							<form onSubmit={this.handleSubmit} id="adicionarProdutoForm">
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
									<label>Plano de Fabrico</label>
									{
										planosFabrico.length !== 0 ? <Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={this.state.planoFabrico}
											onChange={this.handleChange}>
											{
												planosFabrico.map(tp =>
													<MenuItem key={uuid()} value={tp.id}>{tp.descricao.value}</MenuItem>)
											}
										</Select> : <h6 className={"text-danger"}>Não existem planos de fabrico</h6>}
								</div>
							</form>
						</div>
					</div>
					<div className={"modal-footer"}>
						<button className={"btn btn-success"} onClick={this.handleSubmit} disabled={planosFabrico.length === 0}>Add
							Produto
						</button>
						<button className={"btn btn-danger"} onClick={this.toggle}>Close</button>
					</div>
				</Modal>
			</div>

		);
	}
}

function mapStateToProps(state) {
	return {
		produtos: state.produtos,
		planosFabrico: state.planosFabrico
	};
}

export default connect(
	mapStateToProps,
	{addProduto}
)(AdicionarProduto);


