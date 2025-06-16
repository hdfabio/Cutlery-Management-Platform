import React, {Component} from "react";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {addPlanoFabrico} from "../../../../actions/mdp/planoFabricoActions";
import MultipleSelect from "../../../Utils/MultipleSelect";

export class AdicionarPlanoFabrico extends Component {
	state = {
		toggle: false,
		descricao: "",
		ops: ['']
	};

	handleSubmit = (event) => {
		event.preventDefault();

		var tp = {
			operacoes: this.state.ops,
			descricao: this.state.descricao
		};

		this.props.addPlanoFabrico(tp);
		this.toggle();
	};

	toggle = () => {
		this.setState({
			toggle: !this.state.toggle
		})
	};

	onChange = e => {
		this.setState({[e.target.name]: e.target.value});
	};

	options = () => {
		let opt = [];

		this.props.operacoes.operacoes.map(op => {
			opt.push({value: op.id, label: op.descricao.value});
			return null;
		});

		return opt;
	};

	myCallback = (dataFromChild) => {
		console.log(dataFromChild);
		this.setState({
			ops: dataFromChild
		})
	};

	render() {
		return (
			<div>
				<div>
					<button
						className={"btn btn-outline-primary"}
						onClick={this.toggle}
					>
						Adicionar Plano de Fabrico
					</button>
				</div>
				<Modal
					size="lg"
					show={this.state.toggle}
					onHide={this.toggle}
				>
					<div className={"modal-header"}>
						<h5 className={"modal-title"}>
							Criar Plano de Fabrico
						</h5>
					</div>
					<div className={"modal-body"}>
						<div className="container">
							<form onSubmit={this.handleSubmit} id="adicionarPlanoFabricoForm">
								<div className={"form-group"}>
									<p>Descrição:</p>
									<input
										type="text"
										className="form-control"
										onChange={this.onChange}
										id="descricao"
										name={"descricao"}
										aria-describedby="Descricao"/>
								</div>
								<div className={"form-group"}>
									<div>
										{
											this.props.operacoes.operacoes.length !== 0 ?
											<MultipleSelect label={"Operações"} values={this.options()} callback={this.myCallback}
											                selected={[]}/> : <h6 className={"text-danger"}>Não existem operações</h6>
										}

									</div>
								</div>
							</form>
						</div>
					</div>
					<div className={"modal-footer"}>
						<button className={"btn btn-outline-success"} onClick={this.handleSubmit}
						        disabled={this.props.operacoes.operacoes.length === 0}>
							Add Plano de Fabrico
						</button>
						<button className={"btn btn-outline-danger"} onClick={this.toggle}>Close</button>
					</div>
				</Modal>
			</div>)
	}
}

function mapStateToProps(state) {
	return {
		operacoes: state.operacoes
	};
}

export default connect(
	mapStateToProps,
	{addPlanoFabrico}
)(AdicionarPlanoFabrico);
