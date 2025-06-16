import PropTypes from "prop-types";
import React, {Component} from "react";
import {connect} from "react-redux";
import {deleteLinhaProducao} from "../../../../actions/mdf/linhaProducaoActions";
import Confirm from "../../../Utils/Confirm";
import LinhaProducaoDetalhes from "./LinhaProducaoDetalhes";

export class LinhasProducaoItem extends Component {
	state = {
		isOpen: false
	};

	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		})
	};

	render() {
		const {descricao, id} = this.props.linha;
		return (
			<div className={"list-group-item d-flex"}>
				{
					this.props.details ? <div className={"mr-3"}>
						<LinhaProducaoDetalhes linha={this.props.linha}/>
					</div> : null
				}
				<p className={"my-auto"}>{descricao.value}</p>
				{
					this.props.delete ? <div className={"ml-auto d-flex"}>
						{/*<div className={"px-1"}>*/}
						{/*	<AlterarLinhaProducao linha={this.props.linha}/>*/}
						{/*</div>*/}
						<div className={"px-1"}>
							<Confirm
								isOpen={this.state.isOpen}
								toggle={this.toggle}
								onConfirm={() => this.props.deleteLinhaProducao(id)}
							/>
						</div>
					</div> : null
				}
			</div>
		);
	}
}

// PropTypes
LinhasProducaoItem.propTypes = {
	linha: PropTypes.object.isRequired,
	details: PropTypes.bool.isRequired,
	delete: PropTypes.bool.isRequired,
};

function mapStateToProps() {
	return {}
}

export default connect(mapStateToProps, {deleteLinhaProducao})(LinhasProducaoItem);
