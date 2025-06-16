import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import uuid from "uuid";
import {operacoesTipoMaquina} from "../../../../actions/mdf/tiposMaquinaActions";

export class TipoMaquinaDetalhes extends Component {
	state = {
		toggle: false,
		ops: []
	};

	// componentDidMount() {
	// 	this.props.operacoesTipoMaquina(this.props.tipo.id)
	// 		.then(res => this.setState({
	// 			ops: res
	// 		}));
	// }

	toggle = () => {
		this.setState({toggle: !this.state.toggle})
	};

	render() {
		return (
			<div>
				<button className="btn btn-info" id={"tipoInfoId"} onClick={this.toggle}>
					<i className="fa fa-bars"/>
				</button>
				<Modal onHide={this.toggle} show={this.state.toggle}>
					<div className='modal-header'>
						<h5 className='modal-title'
						    id='exampleModalCenterTitle'>
							Detalhes de Tipo de Maquina
						</h5>
						<button
							type='button'
							className='close'
							aria-label='Close'
							id="closeId"
							onClick={this.toggle}
						>
							<span aria-hidden='true'>&times;</span>
						</button>
					</div>
					<div className={"modal.body"}>
						<div className={"container my-3"}>
							<h5 className={"text-warning"}>Descrição: {this.props.tipo.descricao.value}</h5>

							<label>Operações:</label>
							<div className={"m-auto"}>
								{
									this.state.ops.map(op => <li key={uuid()} className={"list-group-item"}>{op.descricao.value}</li>)
								}
							</div>
						</div>
					</div>
				</Modal>
			</div>
		);
	}
}

TipoMaquinaDetalhes.propTypes = {
	tipo: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		operacoes: state.operacoes
	}
}


export default connect(mapStateToProps, {operacoesTipoMaquina})(TipoMaquinaDetalhes);
