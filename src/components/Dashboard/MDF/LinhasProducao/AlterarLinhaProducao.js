import PropTypes from 'prop-types';
import React, {Component} from "react";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import MultipleSelect from "../../../Utils/MultipleSelect";

class AlterarLinhaProducao extends Component {
	state = {
		id: "",
		descricao: "",
		maquinas: [],
		toggle: false
	};

	componentDidMount() {
		const {linha} = this.props;
		let maquinas = [];

		linha.linhaProducaoMaquinas.map(lpm => maquinas.push(lpm.maquinaId));

		this.setState({
			id: linha.id,
			descricao: linha.descricao.value,
			maquinas: maquinas
		});
	}

	options = () => {
		let opt = [];

		this.props.maquinas.maquinas.map(op => {
			opt.push({value: op.id, label: op.descricao.value});
			return null;
		});

		return opt;
	};

	selected = () => {
		let selected = [];
		let maqs = this.props.maquinas.maquinas.filter(maq => this.state.maquinas.includes(maq.id));

		maqs.map(op => {
			selected.push({value: op.id, label: op.descricao.value});
			return null;
		});

		return selected;
	};

	myCallback = (dataFromChild) => {
		this.setState({
			ops: dataFromChild
		})
	};

	handleSubmit = (event) => {
		event.preventDefault();

		const op = {
			id: this.state.id,
			descricao: this.state.descricao,
			maquinas: this.state.maquinas
		};

		// this.props.alterarOperacao(op);
		// this.toggle();
	};

	toggle = () => {
		this.setState({toggle: !this.state.toggle})
	};

	render() {
		return (
			<div>
				<button
					className={"btn btn-warning"}
					onClick={this.toggle}
				>
					<i className="fa fa-plus"/>
				</button>
				<Modal
					size="lg"
					aria-labelledby="Change Operacao Dialog"
					show={this.state.toggle}
					onHide={this.toggle}
				>
					<div className='modal-header'>
						<h5 className='modal-title'
						    id='exampleModalCenterTitle'>
							Alterar Linha de Produção
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
											<span className="input-group-text" id="basic-addon3">Descrição</span>
										</div>
										<input disabled={true}
										       type="text"
										       className="form-control"
										       id="descricao"
										       name={"descricao"}
										       value={this.state.descricao}
										       aria-describedby="Descricao"/>
									</div>
									<MultipleSelect
										values={this.options()}
										selected={this.selected()}
										callback={this.myCallback}/>
								</div>
							</form>
						</div>
					</div>
					<div className={"modal-footer"}>
						<button className={"btn btn-success"} type="submit" onClick={this.handleSubmit}>Alterar Operação</button>
						<button className={"btn btn-danger"} onClick={this.toggle}>Close</button>
					</div>
				</Modal>
			</div>

		);
	}
}

AlterarLinhaProducao.propTypes = {
	linha: PropTypes.object.isRequired,
	maquinas: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		maquinas: state.maquinas
	}
}

export default connect(
	mapStateToProps,
	{}
)(AlterarLinhaProducao);


