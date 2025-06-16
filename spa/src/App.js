import React, {Component} from 'react';
import {connect} from "react-redux";
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import {loadUser} from "./actions/authActions";
import {Authorization} from "./components/Auth/Authorization";
import Loading from "./components/Auth/Loading";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/Auth/user/Profile";
import ClientesDashboard from "./components/Dashboard/Admin/ClientesDashboard";
import Dashboard from "./components/Dashboard/Dashboard";
import EncomendasDashboard from "./components/Dashboard/GE/Encomendas/EncomendasDashboard";
import GestaoEncomendasDashboard from "./components/Dashboard/GE/GestaoEncomendasDashboard";
import DashboardMdf from "./components/Dashboard/MDF/DashboardMdf";
import LinhasProducaoDashboard from "./components/Dashboard/MDF/LinhasProducao/LinhasProducaoDashboard";
import MaquinasDashboard from "./components/Dashboard/MDF/Maquinas/MaquinasDashboard";
import OperacoesDashboard from "./components/Dashboard/MDF/Operacoes/OperacoesDashboard";
import TiposMaquinaDashboard from './components/Dashboard/MDF/TiposMaquina/TiposMaquinaDashboard';

import DashboardMdp from "./components/Dashboard/MDP/DashboardMdp";
import PlanosDeFabricoDashboard from "./components/Dashboard/MDP/PlanosDeFabrico/PlanosDeFabricoDashboard";
import ProdutosDashboard from "./components/Dashboard/MDP/Produtos/ProdutosDashboard";

import AppNavbar from "./components/Surrounding/AppNavbar";
import Footer from "./components/Surrounding/Footer";

export let Customer;
export let Admin;

export class App extends Component {
	state = {};

	componentDidMount() {
		this.props.loadUser();
	}

	render() {
		Admin = Authorization(["Admin"], this.props.auth.user);
		Customer = Authorization(["Admin", "Customer"], this.props.auth.user);

		return <BrowserRouter>
			<AppNavbar/>
			<div className={"auth"}>
				<Route exact path="/login" component={Login}/>
				<Route exact path="/register" component={Register}/>
			</div>

			<div className={"d-block mx-auto"}>
				{
					!this.props.auth.isAuthenticated ? <Redirect to={"/login"}/> : <Redirect to={"/loading"}/>
				}
				<Route exact path="/loading" component={Loading}/>

				<div className="dashboard col-md-10 ml-sm-auto col-lg-10">
					<Route exact path="/profile" component={Customer(Profile)}/>

					<Route exact path="/dashboard" component={Admin(Dashboard)}/>

					<Route exact path="/mdf" component={Admin(DashboardMdf)}/>
					<Route exact path="/mdf/maquinas" component={Admin(MaquinasDashboard)}/>
					<Route exact path="/mdf/linhas_producao" component={Admin(LinhasProducaoDashboard)}/>
					<Route exact path="/mdf/tipos_maquina" component={Admin(TiposMaquinaDashboard)}/>
					<Route exact path="/mdf/operacoes" component={Admin(OperacoesDashboard)}/>

					<Route exact path="/mdp" component={Admin(DashboardMdp)}/>
					<Route exact path="/mdp/produtos" component={Admin(ProdutosDashboard)}/>
					<Route exact path="/mdp/planos_fabrico" component={Admin(PlanosDeFabricoDashboard)}/>

					<Route exact path="/ge" component={Customer(GestaoEncomendasDashboard)}/>
					<Route exact path="/ge/encomendas" component={Customer(EncomendasDashboard)}/>

					<Route exact path={"/customers"} component={Admin(ClientesDashboard)}/>
				</div>
			</div>
			<Footer/>
		</BrowserRouter>
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps, {loadUser})(App)
