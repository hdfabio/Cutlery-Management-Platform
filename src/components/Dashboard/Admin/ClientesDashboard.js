import PropTypes from "prop-types";
import React, {Component} from 'react';
import {connect} from "react-redux";
import uuid from 'uuid'
import {getCustomers} from "../../../actions/authActions";
import Header from "../../Utils/Header";
import ClienteItem from "./ClienteItem";

export class ClientesDashboard extends Component {
	state = {
		users: [],
		isSelected: false,
		user: null
	};

	componentDidMount() {
		this.refresh();
	}

	refresh = () => {
		this.props.getCustomers().then(res => this.setState({users: res}));
	};

	render() {
		return (
			<div>
				<Header title={"Clientes"}/>
				<div className={"d-block"}>
					<button className={"btn btn-outline-light float-right"} onClick={this.refresh}>Refresh</button>
					<div className={"list-group"}>
						{
							this.state.users.map(user => <ClienteItem key={uuid()} user={user} refresh={this.refresh}/>)
						}
					</div>
				</div>
			</div>
		);
	}
}

ClientesDashboard.propTypes = {
	getCustomers: PropTypes.func
};

export default connect(null, {getCustomers})(ClientesDashboard);
