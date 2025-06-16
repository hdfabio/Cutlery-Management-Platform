import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Modal} from "react-bootstrap";

export class OperacaoDetalhes extends Component {
	state = {
		toggle: false
	};

	toggle = () => {
		this.setState({toggle: !this.state.toggle})
	};

	render() {
		return (
			<div>
				<button className="btn btn-info" id={"btnInfoOp"} onClick={this.toggle}>
					<i className="fa fa-bars"/>
				</button>
				<Modal onHide={this.toggle} show={this.state.toggle}>
					<div className='modal-header'>
						<h5 className='modal-title'
						    id='exampleModalCenterTitle'>
							Detalhes de Operação
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
						<div className={"container m-2"}>
							<p>Descrição: {this.props.op.descricao.value}</p>
							<p>Execucao: {this.props.op.execucao.value}</p>
							<p>Ferramenta: {this.props.op.ferramenta.descricao.value}</p>
							<p>Setup: {this.props.op.ferramenta.setup.value}</p>
						</div>
					</div>
				</Modal>
			</div>
		);
	}
}

OperacaoDetalhes.propTypes = {
	op: PropTypes.object.isRequired
};

export default OperacaoDetalhes;
