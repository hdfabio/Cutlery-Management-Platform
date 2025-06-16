import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {loadUser} from "../../actions/authActions";
import {getEncomendas} from "../../actions/ge/encomendaActions";
import {getLinhasProducao} from "../../actions/mdf/linhaProducaoActions";
import {getMaquinas} from "../../actions/mdf/maquinaActions";
import {getOperacoes} from "../../actions/mdf/operacoesActions";
import {getTiposMaquina} from "../../actions/mdf/tiposMaquinaActions";
import {getPlanosFabrico} from "../../actions/mdp/planoFabricoActions";
import {getProdutos} from "../../actions/mdp/produtoActions";

class Loading extends Component {
	componentDidMount() {
		this.props.loadUser();

		if (this.props.auth.user) {
			if (this.props.auth.user.type === "Admin") {
				//MDF
				this.props.getLinhasProducao();
				this.props.getMaquinas();
				this.props.getOperacoes();
				this.props.getTiposMaquina();
				//MDP

				this.props.getPlanosFabrico();
			}
			this.props.getProdutos();
			//GE
			this.props.getEncomendas();
		}
	}

	render() {
		if (!this.props.auth.isAuthenticated) {
			return (<h1>Loading...</h1>);
		} else {
			const {type} = this.props.auth.user;

			if (type === "Admin") {
				return <Redirect to={"/dashboard"}/>;
			} else {
				return <Redirect to={"/ge"}/>
			}
		}
	}
}

Loading.propTypes = {};

function mapStateToProps(state) {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps, {
	loadUser, getProdutos, getPlanosFabrico, getMaquinas,
	getLinhasProducao, getOperacoes, getTiposMaquina,
	getEncomendas
})(Loading);
