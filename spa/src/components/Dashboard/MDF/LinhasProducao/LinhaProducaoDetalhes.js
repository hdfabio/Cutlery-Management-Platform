import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import uuid from "uuid";
import {getLinhasProducao} from "../../../../actions/mdf/linhaProducaoActions";

export class LinhaProducaoDetalhes extends Component {
	state = {
		toggle: false,
		maquinas: []
	};

	componentDidMount() {
		let maquinas = [];

		this.props.linha.linhaProducaoMaquinas.map(lpm => maquinas.push(lpm.maquina.descricao.value));

		this.setState({maquinas})
	}

	toggle = () => {
		this.setState({toggle: !this.state.toggle})
	};

	render() {
		return (
			<div>
				<button className="btn btn-info" id={"linhaInfoId"} onClick={this.toggle}>
					<i className="fa fa-bars"/>
				</button>
				<Modal onHide={this.toggle} show={this.state.toggle}>
					<div className='modal-header'>
						<h5 className='modal-title'
						    id='exampleModalCenterTitle'>
							Detalhes de Linha Producao
						</h5>
						<button
							type='button'
							id={"closeId"}
							className='close'
							aria-label='Close'
							onClick={this.toggle}
						>
							<span aria-hidden='true'>&times;</span>
						</button>
					</div>
					<div className={"modal.body"}>
						<div className={"container my-3"}>
							<h5 className={"text-warning"}>Descrição: {this.props.linha.descricao.value}</h5>
							<hr/>
							<label>Máquinas:</label>
							<div className={"m-auto"}>
								{
									this.state.maquinas.map(op => <li key={uuid()} className={"list-group-item"}>{op}</li>)
								}
							</div>
						</div>
					</div>
				</Modal>
			</div>
		);
	}
}

LinhaProducaoDetalhes.propTypes = {
	linha: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		maquinas: state.maquinas
	}
}

export default connect(mapStateToProps, {getLinhasProducao})(LinhaProducaoDetalhes);

