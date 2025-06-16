import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from "react-redux";
import Header from "../../../Utils/Header";
import AdicionarLinhaProducao from "./AdicionarLinhaProducao";
import LinhasProducaoItem from "./LinhasProducaoItem";

export class LinhaProducaoDashboard extends Component {
	state = {
		linhas: []
	};

	render() {
		const {linhasProducao} = this.props.linhasProducao;
		return (
			<div className={"entity"}>
				<Header title={"Linhas de Produção"}/>
				<div className={"main"}>
					<div className={"search"}>
						<AdicionarLinhaProducao/>
					</div>
					<div className={"list-group pt-3"}>
						{
							linhasProducao.length !== 0 ? linhasProducao.map((linha) => (
								                            <LinhasProducaoItem key={linha.id} linha={linha} details={true} delete={true}/>))
							                            : <h6 className={"text-danger"}>Não existem linhas de produção</h6>
						}
					</div>
				</div>
			</div>
		);
	}
}

// PropTypes
LinhaProducaoDashboard.propTypes = {
	linhas: PropTypes.object
};

function mapStateToProps(state) {
	return {
		linhasProducao: state.linhasProducao
	};
}

export default connect(
	mapStateToProps,
	{}
)(LinhaProducaoDashboard);
