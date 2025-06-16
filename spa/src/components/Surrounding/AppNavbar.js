import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {logout} from "../../actions/authActions";

class AppNavbar extends Component {

	render() {
		const {user, isAuthenticated} = this.props.auth;

		const sidebar = () => {
			if (user.type === "Admin") {
				return <div>
					<div>{costumers}</div>
					<div>{mdf}</div>
					<div>{mdp}</div>
					<div>{ge}</div>
				</div>;
			} else {
				return ge;
			}
		};

		const mdf = (<Fragment>
			<h6
				className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
				<Link className="d-flex align-items-center text-muted" id={"linkToMdf"} to="/mdf">
					<span>Master Data Fabrica</span>
				</Link>
			</h6>
			<ul className="nav flex-column mb-2">
				<li className="nav-item">
					<Link className="nav-link" id={"linkToLinhasProducao"} to="/mdf/linhas_producao">
										<span data-feather="file-text">
											Linhas de Produção
										</span>
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" id={"linkToMaquina"} to="/mdf/maquinas">
						<span data-feather="file-text">Máquinas</span>
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" id={"linkToTipoMaquina"} to="/mdf/tipos_maquina">
						<span data-feather="file-text">Tipos de Máquina</span>
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" id={"linkToOperacoes"} to="/mdf/operacoes">
						<span data-feather="file-text">Operações</span>
					</Link>
				</li>
			</ul>
		</Fragment>);

		const mdp = (<Fragment><h6
			className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
			<Link className="d-flex align-items-center text-muted" id={"linkToMdp"} to="/mdp">
				<span>Master Data Producao</span>
			</Link>
		</h6>
			<ul className="nav flex-column mb-2">
				<li className="nav-item">
					<Link className="nav-link" id={"linkToProdutos"} to="/mdp/produtos">
						<span data-feather="file-text">Produtos</span>
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" id={"linkToPlanosFabrico"} to="/mdp/planos_fabrico">
						<span data-feather="file-text">Planos de Fabrico</span>
					</Link>
				</li>
			</ul>
		</Fragment>);

		const ge = (<Fragment>
			<h6
				className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
				<Link className="d-flex align-items-center text-muted" id={"linkToGe"} to="/ge">
					<span>Gestão de Encomendas</span>
				</Link>
			</h6>
			<ul className="nav flex-column mb-2">
				<li className="nav-item">
					<Link className="nav-link" id={"linkToEncomendas"} to="/ge/encomendas">
						<span data-feather="file-text">Encomendas</span>
					</Link>
				</li>
			</ul>
		</Fragment>);

		const costumers = (
			<Fragment>
				<h6
					className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
					<Link className="d-flex align-items-center text-muted" id={"linkToClientes"} to="/customers">
						<span>Clientes</span>
					</Link>
				</h6>
				<ul className="nav flex-column mb-2">
					<li className="nav-item">
						<Link className="nav-link" id={"linkToEncomendas"} to="/customers">
							<span data-feather="file-text">Clientes</span>
						</Link>
					</li>
				</ul>
			</Fragment>
		);

		const brand_link = () => {
			if (isAuthenticated === true) {
				if (user.type === "Admin") return "/dashboard";
				return "/ge"
			} else {
				return "/login";
			}
		};

		return (
			<div>
				<nav className='navbar navbar-expand-md navbar-dark sticky-top'>
					<Link to={brand_link()} className="navbar-brand">MyOwnCuttlery</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse"
					        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
					        aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"/>
					</button>

					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav ml-auto">
							{
								this.props.isAuthenticated ? <Fragment>
									<li className="nav-item dropdown">
										<div className={user.type} id="navbarDropdown" role="button"
										     data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
											<img src={user.avatar}
											     alt='User Avatar'/>
										</div>
										<div className="dropdown-menu dropdown-menu-right">
											<Link to={"/profile"}>
												<button className="dropdown-item" type="button">Profile</button>
											</Link>
											<div className="dropdown-divider"/>
											<button className="dropdown-item" type="button" onClick={this.props.logout}>Logout</button>
										</div>
									</li>
								</Fragment> : null
							}
						</ul>
					</div>
				</nav>
				{
					this.props.isAuthenticated ?
					<nav className="col-md-2 d-none d-md-block bg-light sidebar">
						<div className="sidebar-sticky">
							{sidebar()}
						</div>
					</nav> : null
				}
			</div>
		);
	}
}

export default connect((state) => {
	return {
		auth: state.auth,
		isAuthenticated: state.auth.isAuthenticated
	}
}, {logout})(AppNavbar);
