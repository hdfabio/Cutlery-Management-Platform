import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {getEncomendas} from "../../../actions/ge/encomendaActions";

class GestaoEncomendasDashboard extends Component {

	render() {
		return (
			<Redirect to={"/ge/encomendas"}/>
		);
	}
}

GestaoEncomendasDashboard.propTypes = {};

function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps, {getEncomendas})(GestaoEncomendasDashboard);
