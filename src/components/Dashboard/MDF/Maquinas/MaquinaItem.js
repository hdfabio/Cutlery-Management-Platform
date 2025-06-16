import PropTypes from "prop-types";
import React, {Component} from "react";
import {connect} from "react-redux";
import {deleteMaquina} from "../../../../actions/mdf/maquinaActions";
import Confirm from "../../../Utils/Confirm"; // Import css
import ConsultarMaquina from "./ConsultarMaquina";
import ModificarMaquina from './ModificarMaquina'

export class MaquinaItem extends Component {

	render() {
		const {maquina} = this.props;

		return maquina ? (
			<div className={"list-group-item d-flex"} id="maquinaItem">
				{
					this.props.details ? <div className={"mr-3"} id="consultarMaquina">
						<ConsultarMaquina maquina={this.props.maquina}/>
					</div> : null
				}
				<p className={"my-auto"}>
					{maquina.descricao.value}
				</p>
				{
					this.props.delete ? <div className={"ml-auto d-flex"}>
						<div className="px-1">
							<ModificarMaquina maquina={this.props.maquina}/>
						</div>
						<div className="px-1">
							<Confirm
								onConfirm={() => this.props.deleteMaquina(this.props.maquina.id)}
							/></div>
					</div> : null
				}
			</div>
		) : <h6 className={"text-danger"}>Máquina não definida</h6>;
	}
}

// PropTypes
MaquinaItem.propTypes = {
	maquina: PropTypes.object.isRequired,
	details: PropTypes.bool.isRequired,
	delete: PropTypes.bool.isRequired,
};

export default connect(null, {deleteMaquina})(MaquinaItem);
