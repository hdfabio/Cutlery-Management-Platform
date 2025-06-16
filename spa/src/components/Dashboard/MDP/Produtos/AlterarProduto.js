import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React, {Component} from 'react'
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {alterarPlanoFabricoProduto} from "../../../../actions/mdp/produtoActions";

const uuid = require("uuid");

class AlterarProduto extends Component {

	state = {
		id: "",
		descricao: "",
		planoFabrico: "",
		toggle: false
	};

	componentDidMount() {
		const {produto} = this.props;

		this.setState({
			id: produto.id,
			descricao: produto.descricao.value,
			planoFabrico: produto.planoFabrico
		});

	}

	handleSubmit = (event) => {
		event.preventDefault();

		const prod = {
			produto: this.state.id,
			plano: this.state.planoFabrico.id
		};

		this.props.alterarPlanoFabricoProduto(prod);
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
					className={"btn btn-warning"}
					onClick={this.toggle}
					id={"editProduto"}
				>

					<i className="fa fa-edit"/>
				</button>
				<Modal
					size="lg"
					aria-labelledby="Add Maquina Dialog"
					centered
					show={this.state.toggle}
				>
					<div className='modal-header'>
						<h5 className='modal-title'
						    id='exampleModalCenterTitle'>
							ALterar produto
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
							<form onSubmit={this.handleSubmit}>
								<div>
									<div className="input-group mb-3">
										<div className="input-group-prepend">
											<span className="input-group-text" id="basic-addon3">Descricao</span>
										</div>
										<input type="text"
										       className="form-control"
										       disabled={true}
										       value={this.state.descricao}
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
					<Modal.Footer>
						<button className={"btn btn-success"} onClick={this.handleSubmit}>Add Produto</button>
						<button className={"btn btn-danger"} onClick={this.toggle}>Close</button>
					</Modal.Footer>
				</Modal></div>

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
	{alterarPlanoFabricoProduto}
)(AlterarProduto);



