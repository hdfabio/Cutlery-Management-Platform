import PropTypes from "prop-types";
import React, {Component} from 'react'
import {connect} from "react-redux";
import {deleteTipoMaquina} from "../../../../actions/mdf/tiposMaquinaActions";
import Confirm from "../../../Utils/Confirm";
import AdicionarOperacao from "./AdicionarOperacao";
import TipoMaquinaDetalhes from "./TipoMaquinaDetalhes";

export class TiposMaquinaItem extends Component {

	render() {
		return (
			<div className={"list-group-item d-flex"}>
				{
					this.props.details ? <div className="mr-4" id="details-div">
						<TipoMaquinaDetalhes tipo={this.props.tipoMaquina}/>
					</div> : null
				}
				<p>{this.props.tipoMaquina.descricao.value}</p>
				{
					this.props.delete ? <div className={"ml-auto d-flex"} id="delete-div">
						                  <div className={"px-1"}>
							                  <AdicionarOperacao tipo={this.props.tipoMaquina}/>
						                  </div>
						                  <div className={"px-1"}>
							                  <Confirm
								                  onConfirm={() => this.props.deleteTipoMaquina(this.props.tipoMaquina.id)}
							                  /></div>
					                  </div>
					                  : null
				}
			</div>
		);
	}
}

// PropTypes
TiposMaquinaItem.propTypes = {
	tipoMaquina: PropTypes.object.isRequired,
	details: PropTypes.bool.isRequired,
	delete: PropTypes.bool.isRequired,
};

function mapStateToProps() {
	return {}
}

export default connect(mapStateToProps, {
	deleteTipoMaquina
})(TiposMaquinaItem)
