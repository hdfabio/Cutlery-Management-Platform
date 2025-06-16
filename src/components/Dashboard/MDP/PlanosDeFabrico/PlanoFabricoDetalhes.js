import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import * as uuid from "uuid";

export class PlanoFabricoDetalhes extends Component {
	state = {
		toggle: false,
		ops: []
	};

	componentDidMount() {
		const {planoFabricoOperacoes} = this.props.plano;

		let ops = [];

		planoFabricoOperacoes.map(op => ops.push(op.operacao.descricao.value));

		this.setState({ops})
	}

	toggle = () => {
		this.setState({toggle: !this.state.toggle})
	};

	render() {
		return (
			<div>
				<button className="btn btn-info" onClick={this.toggle}>
					<i className="fa fa-bars"/>
				</button>
				<Modal onHide={this.toggle} show={this.state.toggle}>
					<div className='modal-header'>
						<h5 className='modal-title'
						    id='exampleModalCenterTitle'>
							Detalhes de Plano de Fabrico
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
					<div className={"modal.body"}>
						<div className={"container my-3"}>
							<h5 className={"text-warning"}>Descrição: {this.props.plano.descricao.value}</h5>

							<label>Operações:</label>
							<div className={"m-auto"}>
								{
									this.state.ops.map(op => <li key={uuid} className={"list-group-item"}>{op}</li>)
								}
							</div>
						</div>
					</div>
				</Modal>
			</div>
		);
	}
}

PlanoFabricoDetalhes.propTypes = {
	plano: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {}
}


export default connect(mapStateToProps, {})(PlanoFabricoDetalhes);
