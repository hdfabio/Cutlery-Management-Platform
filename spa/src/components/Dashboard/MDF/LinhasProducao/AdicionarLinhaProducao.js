import React, {Component} from "react";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {addLinhaProducao} from "../../../../actions/mdf/linhaProducaoActions";
import MultipleSelect from "../../../Utils/MultipleSelect";

export class AdicionarLinhaProducao extends Component {
	state = {
		descricao: "",
		maqs: "",
		toggle: false
	};

	handleSubmit = (event) => {
		event.preventDefault();

		const lp = {
			lp: this.state.maqs,
			descricao: this.state.descricao
		};

		this.props.addLinhaProducao(lp);
		this.toggle();
	};

	toggle = () => {
		this.setState({toggle: !this.state.toggle})
	};

	onChange = e => {
		this.setState({[e.target.name]: e.target.value});
	};

	myCallback = (dataFromChild) => {
		this.setState({
			maqs: dataFromChild
		})
	};

	options = () => {
		let opts = [];

		this.props.maquinas.maquinas.map(maq => {
			opts.push({value: maq.id, label: maq.descricao.value});
			return null;
		});

		return opts;
	};

	render() {

		return (
			<div>
				<button
					className={"btn btn-outline-primary"}
					onClick={this.toggle}
				>
					Adicionar Linha de Produção
				</button>
				<Modal
					size="lg"
					show={this.state.toggle}
				>
					<div className={"modal-header"}>
						<h5 className={"modal-title"}>
							Adiciona Linha de Produção
						</h5>
					</div>
					<div className={"modal-body"}>
						<div className="container">
							<form onSubmit={this.handleSubmit} id="adicionarLinhaProducaoForm">
								<div>
									<div className="input-group mb-3">
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
									</div>
									<div className={"form-group"}>
										<div>
											{
												this.props.maquinas.maquinas.length !== 0 ?
												<MultipleSelect id="selectMaquinas" label={"Maquinas"} values={this.options()}
												                callback={this.myCallback}
												                selected={[]}/> : <h6 className={"text-danger"}>Não exsitem máquinas</h6>
											}

										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
					<div className={"modal-footer"}>
						<button className={"btn btn-success"} onClick={this.handleSubmit}
						        disabled={this.props.maquinas.maquinas.length === 0}>Add Linha de Produção
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
		maquinas: state.maquinas
	};
}

export default connect(
	mapStateToProps,
	{addLinhaProducao}
)(AdicionarLinhaProducao);


