import PropTypes from 'prop-types'
import React, {Component} from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

class Confirm extends Component {
	state = {
		isOpen: false
	};

	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		})
	};

	render() {
		return (
			<div>
				<button className={"btn btn-danger"} id={"delButton"} onClick={this.toggle}>
					<i className="fa fa-trash"/>
				</button>
				<Modal isOpen={this.state.isOpen} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Deleting!</ModalHeader>
					<ModalBody>
						Are you sure you want to delete it?
					</ModalBody>
					<ModalFooter>
						<button className={"btn btn-danger"} onClick={() => {
							this.props.onConfirm();
							this.toggle();
						}}>Yes
						</button>
						<button className={"btn btn-warning"} onClick={this.toggle}>No</button>
					</ModalFooter>
				</Modal>
			</div>

		);
	}
}

Confirm.propTypes = {
	onConfirm: PropTypes.func.isRequired
};

export default Confirm;
