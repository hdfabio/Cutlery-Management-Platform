import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import uuid from "uuid";
import {getLinhasProducao} from "../../../actions/mdf/linhaProducaoActions";
import {getMaquinas} from "../../../actions/mdf/maquinaActions";
import {getOperacoes} from "../../../actions/mdf/operacoesActions";
import {getTiposMaquina} from "../../../actions/mdf/tiposMaquinaActions";
import LinhasProducaoItem from "./LinhasProducao/LinhasProducaoItem";
import MaquinaItem from "./Maquinas/MaquinaItem";
import SelecionarTipoMaquina from "./Maquinas/SelecionarTipoMaquina";

class DashboardMdf extends Component {
	state = {};

	render() {
		const {linhasProducao, loading} = this.props.linhas;
		const {maquinas, loading: loading1} = this.props.maquinas;

		return <div>
			<div className="row m-auto">
				<div className="col">
					<Link to={"/mdf/maquinas"}>
						<h2>Máquinas</h2>
					</Link>
					{
						!loading1 && maquinas.length !== 0 ?
						<div>
							<br/>
							<h6 className={"p-2"}>Count: {maquinas.length}</h6>
							<div className={"px-1"}>
								<SelecionarTipoMaquina stm={this.props.maquina}/>
							</div>
							<hr/>
							<div className={"list-group maquinas-list-group"}>
								{
									maquinas.map(m => (<MaquinaItem key={uuid()} maquina={m} details={false} delete={false}/>))
								}
							</div>
						</div> : <h5 className={"text-danger"}>Não existem maquinas</h5>
					}
				</div>
				<div className={"col"}>
					<Link to={"/mdf/linhas_producao"}>
						<h2>Linhas de Produção</h2>
					</Link>
					{
						!loading && linhasProducao.length !== 0 ?
						<div>
							<br/>
							<h6 className={"p-2"}>Count: {linhasProducao.length}</h6>
							<hr/>
							<div className={"list-group"}>
								{
									linhasProducao.map(
										m => (<LinhasProducaoItem key={uuid()} linha={m} details={false} delete={false}/>)
									)
								}
							</div>
						</div> : <h5 className={"text-danger"}>Não existem linhas de produção</h5>
					}
				</div>
			</div>
		</div>
	}
}

function mapStateToProps(state) {
	return {
		maquinas: state.maquinas,
		linhas: state.linhasProducao,
	};
}

export default connect(
	mapStateToProps,
	{getMaquinas, getLinhasProducao, getOperacoes, getTiposMaquina}
)(DashboardMdf);
