import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Modal} from "react-bootstrap";
import {connect} from 'react-redux';
import {updateUser} from "../../../actions/authActions";

class EditProfile extends Component {
	state = {
		name: '',
		email: '',
		password_1: '',
		password_2: '',
		changeName: false,
		changeEmail: false,
		changePassword: false,
		toggle: false
	};

	toggle = () => {
		this.setState({toggle: !this.state.toggle})
	};

	onChange = e => {
		this.setState({[e.target.name]: e.target.value});
	};

	componentDidMount() {
		const {user} = this.props.auth;

		this.setState({
			name: user.name,
			email: user.email
		});
	}

	onSubmit = () => {
		let updates = [];

		if (this.state.changePassword) {
			if (this.state.password_1 === this.state.password_2) {
				updates.push({field: 'password', info: this.state.password_1});
			} else {
				alert('Passwords must match!');
			}
		}

		if (this.state.changeName) {
			if (this.state.name !== this.props.auth.user.name) {
				updates.push({field: 'name', info: this.state.name});
			}
		}

		if (this.state.changeEmail) {
			if (this.state.email !== this.props.auth.user.email) {
				updates.push({field: 'email', info: this.state.email});
			}
		}

		this.props.updateUser(updates);
		this.toggle();
	};

	render() {
		return (
			<div>
				<button
					type='button'
					className='btn btn-outline-warning'
					onClick={this.toggle}
				>
					Edit Profile
				</button>
				<Modal onHide={this.toggle} show={this.state.toggle}>
					<div className='modal-content'>
						<div className='modal-header'>
							<h4 className='modal-title'>Edit Profile</h4>
							<button
								type='button'
								className='close'
								data-dismiss='modal'
								aria-label='Close'
							>
								<span aria-hidden='true'>&times;</span>
							</button>
						</div>
						<div className='modal-body'>
							<div className='modal-form'>
								<div className='form-group'>
									<label>Name</label>
									<input
										type='text'
										className='form-control'
										name='name'
										id='name'
										value={this.state.name}
										onChange={this.onChange}
										onClick={() => {
											this.setState({
												changeName: true
											});
										}}
									/>
								</div>
								<div className='form-group'>
									<label>Email</label>
									<input
										type='text'
										className='form-control'
										name='email'
										id='email'
										value={this.state.email}
										onChange={this.onChange}
										onClick={() => {
											this.setState({
												changeEmail: true
											});
										}}
									/>
								</div>
								<div className='d-inline-flex flex-fill'>
									<div className='form-group col'>
										<label>Password</label>
										<input
											type='password'
											className='form-control'
											name='password_1'
											id='password_1'
											value={this.state.password_1}
											onChange={this.onChange}
											onClick={() => {
												this.setState({
													changePassword: true
												});
											}}
										/>
									</div>
									<div className='form-group col'>
										<label>Confirm Password</label>
										<input
											type='password'
											className='form-control'
											name='password_2'
											id='password_2'
											value={this.state.password_2}
											onChange={this.onChange}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className='modal-footer'>
							<button
								className='btn btn-outline-light'
								type='button'
								onClick={this.toggle}
							>
								Close
							</button>
							<button
								className='btn btn-outline-success'
								type='button'
								data-dismiss='modal'
								onClick={this.onSubmit}
							>
								Submit
							</button>
						</div>
					</div>
				</Modal>
			</div>
		);
	}
}

EditProfile.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default EditProfile = connect(
	mapStateToProps,
	{updateUser}
)(EditProfile);
