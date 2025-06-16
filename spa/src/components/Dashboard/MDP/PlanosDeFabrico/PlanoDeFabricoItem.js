import PropTypes from "prop-types";
import React, {Component} from "react";
import {connect} from "react-redux";
import {deletePlanoFabrico} from "../../../../actions/mdp/planoFabricoActions";
import Confirm from "../../../Utils/Confirm";
import PlanoFabricoDetalhes from "./PlanoFabricoDetalhes";

export class PlanoDeFabricoItem extends Component {
	state = {
		isOpen: false
	};

	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		})
	};

	render() {
		const {plano} = this.props;

		return (
			<div className={"list-group-item d-flex"}>
				{
					this.props.details ? <div className={"mr-3"}>
						<PlanoFabricoDetalhes plano={plano}/>
					</div> : null
				}
				<p className={"my-auto"}>
					{plano.descricao.value}
				</p>
				{
					this.props.delete ? <div className={"ml-auto"}>
						<Confirm

							onConfirm={() => this.props.deletePlanoFabrico(plano.id)}
						/>
					</div> : null
				}
			</div>
		);
	}
}

// PropTypes
PlanoDeFabricoItem.propTypes = {
	plano: PropTypes.object.isRequired,
	details: PropTypes.bool.isRequired,
	delete: PropTypes.bool.isRequired,
};

function mapStateToProps() {
	return {}
}

export default connect(mapStateToProps, {deletePlanoFabrico})(PlanoDeFabricoItem);
