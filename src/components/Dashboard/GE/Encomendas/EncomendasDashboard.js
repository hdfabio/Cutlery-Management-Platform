import PropTypes from "prop-types";
import React, {Component} from "react";
import {connect} from "react-redux";
import uuid from 'uuid'
import Header from "../../../Utils/Header";
import AdicionarEncomenda from "./AdicionarEncomenda";
import EncomendaItem from "./EncomendaItem";

export class EncomendasDashboard extends Component {
	state = {};

	render() {
		const {encomendas, loading} = this.props.encomendas;

		if (loading) {
			return <h1>Loading...</h1>;
		}

		return (
			<div className={"entity"}>
				<Header title={"Encomendas"}/>
				<div className={"main"}>
					<div className={"search"}>
						<div className={"px-1"}>
							{
								this.props.auth.user.type === "Customer" ? <AdicionarEncomenda/> : null
							}
						</div>
					</div>
					{encomendas.length !== 0 ?
					 <div>
						 <p>Encomendas:</p>
						 <div className={"list-group pt-1"}>
							 {encomendas.map(e =>
								 <EncomendaItem key={uuid()} encomenda={e} delete={true} details={true}/>
							 )}
						 </div>
					 </div> : <h6 className={"text-danger"}>Não existem encomendas</h6>}
				</div>
			</div>
		);
	}
}

// PropTypes
EncomendasDashboard.propTypes = {
	encomendas: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		encomendas: state.encomendas,
		auth: state.auth
	};
}

export default connect(mapStateToProps, {})(EncomendasDashboard); 
