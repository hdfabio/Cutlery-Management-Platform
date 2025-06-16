import 'date-fns';
import moment from "moment";
import React, {Component} from "react";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import uuid from "uuid"
import {addEncomenda} from "../../../../actions/ge/encomendaActions";
import DatePicker from "../../../Utils/DatePicker";
import SingleSelect from "../../../Utils/SingleSelect";

class AdicionarEncomenda extends Component {
	state = {
		product: null,
		due_date: moment(moment.now()).format("YYYY-MM-DD"),
		quantity: 0,
		encomendas: [],
		toggle: false
	};

	toggle = () => {
		this.setState({toggle: !this.state.toggle})
	};

	onChange = e => {
		this.setState({[e.target.name]: e.target.value});
	};

	handleSubmit = (event) => {
		event.preventDefault();

		const {encomendas} = this.state;

		for (let encomenda of encomendas) {
			this.props.addEncomenda(encomenda);
		}
		this.toggle();
	};

	handleDateChange = date => {
		this.setState({
			due_date: date
		})
	};

	handleProductChange = info => {
		this.setState({
			product: info
		})
	};

	options = () => {
		const {produtos} = this.props.produtos;

		let opts = [];

		produtos.map(p => opts.push({value: p.id, label: p.descricao.value}));
		return opts;
	};

	onAddEncomendaQueue = (e) => {
		e.preventDefault();

		const {product, due_date, quantity} = this.state;

		console.log(this.state);

		if (product && due_date && quantity > 0) {
			this.setState({
				encomendas: [...this.state.encomendas, {
					product,
					due_date,
					quantity
				}]
			});

			this.setState({
				product: null,
				due_date: null,
				quantity: 0
			})
		}
	};

	productName = (id) => {
		return this.props.produtos.produtos.filter(p => {
				return p.id === id ? p : null
			}
		)
	};

	render() {
		const {produtos} = this.props.produtos;
		return (
			<div>
				<button className={"btn btn-outline-primary"} onClick={this.toggle}>
					Adicionar Encomenda
				</button>
				<Modal
					size="lg"
					aria-labelledby="Adicionar Encomenda"
					onHide={this.toggle} show={this.state.toggle}>

					<div className={"modal-header"}>
						<h5 className={"modal-title"} id="contained-modal-title-vcenter">
							Criar Encomenda
						</h5>
					</div>

					<div className={"modal-body"}>
						<div className="container">
							<form onSubmit={this.handleSubmit} id="adicionarEncomendaForm">
								<div className={"pickers"}>
									<DatePicker label={"Prazo de Entrega"} myCallback={this.handleDateChange}/>
									{
										produtos.length !== 0 ?
										<div className={"item"}>
											<SingleSelect callback={this.handleProductChange} label={"Produto"}
											              options={this.options()}/>
										</div>
										                      :
										<h6 className={"text-danger"} id="error">Não existem produtos</h6>
									}
								</div>
								<div className={"d-flex mt-3"}>
									<input className={"form-control"} type={"number"} name={"quantity"} value={this.state.quantity}
									       onChange={this.onChange} min={"1"}/>

									<button className="btn btn-info ml-3" onClick={this.onAddEncomendaQueue}>
										<i className={"fa fa-plus"}/>
									</button>
								</div>
							</form>
							<hr/>
							{
								this.state.encomendas.length !== 0 ? <div className={"list-item-group m-auto"}>
									{
										this.state.encomendas.map(e => {
											const prodInfo = this.productName(e.product)[0];

											return <li key={uuid()} className={"list-group-item"}>
												<div className={"row"}>
													<div className={"col-11"}>
														<div className={"row"}>
															<p className={"col"}>{prodInfo.descricao.value}</p>
															<p className={"col"}>{e.quantity}</p>
															<p className={"col"}>{moment(e.due_date).format("DD-MM-YYYY")}</p>
														</div>
													</div>
												</div>
											</li>
										})
									}
								</div> : null
							}
						</div>
					</div>

					<div className={"modal-footer"}>
						<button className={"btn btn-success"} onClick={this.handleSubmit}
						        disabled={this.state.encomendas.length === 0}>Adicionar Encomenda
						</button>
						<button className={"btn btn-danger"} onClick={this.toggle}>Cancelar</button>
					</div>
				</Modal>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		produtos: state.produtos
	};
}

export default connect(
	mapStateToProps,
	{addEncomenda},
)(AdicionarEncomenda);


