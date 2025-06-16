import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";

export class ProdutoDetalhes extends Component {
	state = {
		toggle: false
	};

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
							Detalhes de Produto
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
							<h5 className={"text-warning"}>Descrição: {this.props.produto.descricao.value}</h5>
							<hr/>
							<div className={"d-flex"}>
								<label className={"pr-2 text-muted"}>Plano de Fabrico:</label>
								<p>{this.props.produto.planoFabrico.descricao.value}</p>
							</div>
						</div>
					</div>
				</Modal>
			</div>
		);
	}
}

ProdutoDetalhes.propTypes = {
	produto: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {}
}

export default connect(mapStateToProps, {})(ProdutoDetalhes);
