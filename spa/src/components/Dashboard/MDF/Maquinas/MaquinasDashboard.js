import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from "react-redux";
import uuid from "uuid";
import Header from "../../../Utils/Header";
import AdicionarMaquina from "./AdicionarMaquina";
import MaquinaItem from "./MaquinaItem";
import SelecionarTipoMaquina from "./SelecionarTipoMaquina";

export class MaquinasDashboard extends Component {

	state = {
		maquinas: []
	};

	render() {
		const {maquinas, loading} = this.props.maquinas;

		if (loading) {
			return null;
		}

		return (
			<div className={"entity"}>
				<Header title={"Maquinas"}/>
				<div className={"main"}>
					<div className={"search"}>
						<div className={"px-1"}>
							<AdicionarMaquina/>
						</div>
						<div className={"px-1"}>
							<SelecionarTipoMaquina/>
						</div>
					</div>
					{maquinas.length !== 0 ? <div className={"list-group pt-3"}>
						{maquinas.map(maquina =>
							<MaquinaItem key={uuid()} maquina={maquina}
							             delete={true} details={true}/>
						)}
					</div> : <h6 className="text-danger">Não existem máquinas</h6>}
				</div>
			</div>
		);
	}
}

// PropTypes
MaquinasDashboard.propTypes = {
	maquinas: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		maquinas: state.maquinas
	};
}

export default connect(
	mapStateToProps,
	null
)(MaquinasDashboard);


