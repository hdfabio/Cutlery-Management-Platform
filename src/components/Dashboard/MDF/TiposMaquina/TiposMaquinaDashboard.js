import React, {Component} from "react";
import {connect} from "react-redux";
import uuid from 'uuid'
import Header from "../../../Utils/Header";
import AdicionarTipoMaquina from "./AdicionarTipoMaquina";
import TiposMaquinaItem from "./TiposMaquinaItem";

export class TiposMaquinaDashboard extends Component {
	state = {
		tiposMaquina: []
	};

	render() {
		const {tipoMaquina} = this.props.tiposMaquina;

		if (this.props.tiposMaquina.loading === true) {
			return <h1>Loading...</h1>
		}

		if (tipoMaquina.length !== 0) {
			return <div className={"entity"}>
				<Header title={"Tipos de Maquina"}/>
				<div className={"main"}>
					<div className={"search"}>
						<AdicionarTipoMaquina/>
					</div>
					<div>
						<p>
							Tipos de Máquina:
						</p>
						<div className={"list-group pt-1"} id="list-group">
							{tipoMaquina.map(tipo =>
								<TiposMaquinaItem key={uuid()} tipoMaquina={tipo} details={true} delete={true}/>
							)}
						</div>
					</div>
				</div>
			</div>
		} else {
			return <div className={"entity"}>
				<Header title={"Tipos de Maquina"}/>
				<div className={"main"}>
					<div className={"search"}>
						<AdicionarTipoMaquina/>
					</div>
					<h6 className={"text-danger"}>Não existem tipos de máquina</h6>
				</div>
			</div>
		}
	}
}

function mapStateToProps(state) {
	return {
		tiposMaquina: state.tiposMaquina
	};
}

export default connect(
	mapStateToProps,
	null
)(TiposMaquinaDashboard);
