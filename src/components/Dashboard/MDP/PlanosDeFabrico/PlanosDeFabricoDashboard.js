import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from "react-redux";
import uuid from 'uuid'
import Header from "../../../Utils/Header";
import AdicionarPlanoFabrico from "./AdicionarPlanoFabrico";
import PlanoDeFabricoItem from "./PlanoDeFabricoItem";

export class PlanoDeFabricoDashboard extends Component {
	state = {
		maquinas: []
	};

	render() {
		const {planosFabrico, loading} = this.props.planosFabrico;

		return (
			!loading ? (
				<div className={"entity"}>
					<Header title={"Planos de Fabrico"}/>
					<div className={"main"}>
						<div className={"search"}>
							<div className={"mx-2"}>
							</div>
							<div className={"px-2"}>
								<AdicionarPlanoFabrico/>
							</div>
						</div>
						{
							console.log(planosFabrico)
						}
						{
							planosFabrico.length !== 0 ?
							<div className={"list-group pt-3"}>
								{
									planosFabrico.map(lp =>
										<PlanoDeFabricoItem key={uuid()} plano={lp} delete={true} details={true}/>
									)
								}
							</div>
							                           : <h6 className={"text-danger"}>Não existem planos de fabrico</h6>
						}
					</div>
				</div>) : null
		);
	}
}

// PropTypes
PlanoDeFabricoDashboard.propTypes = {
	planosFabrico: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		planosFabrico: state.planosFabrico
	};
}

export default connect(
	mapStateToProps,
	{}
)(PlanoDeFabricoDashboard);


