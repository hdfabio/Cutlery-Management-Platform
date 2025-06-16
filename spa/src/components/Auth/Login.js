import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link, Redirect} from 'react-router-dom';
import {Alert} from 'reactstrap';
import uuid from 'uuid';
import {login} from "../../actions/authActions";
import {clearErrors} from "../../actions/errorActions";
import {LOGIN_FAIL} from '../../actions/types';

/**
 * Login Component
 */
class Login extends Component {
	state = {
		email: '',
		password: '',
		msg: null
	};

	componentDidUpdate(previousProps) {
		const {error} = this.props;

		if (error !== previousProps.error) {
			if (error.id === LOGIN_FAIL) {
				this.setState({msg: error.msg.errors});
			} else {
				this.setState({msg: null});
			}
		}
	}

	onChange = e => {
		this.setState({[e.target.name]: e.target.value});
	};

	onSubmit = e => {
		e.preventDefault();

		let {email, password} = this.state;
		let user = {
			email,
			password
		};

		//Attempt to login
		user = this.props.login(user);
		this.setState({
			auth: {
				user
			}
		});
	};

	render() {
		const {msg} = this.state;

		if (this.props.isAuthenticated) {
			return <Redirect to={"/loading"}/>;
		}

		return <div className='auth mt-5 login'>
			{msg
			 ? msg.map(item => (
					<Alert key={uuid()} color='danger'>
						{item.msg}
					</Alert>
				))
			 : null}

			<form className={"form-signin"}>
				<div className='form-group'>
					<div className='form-group d-flex'>
						<input
							type='email'
							name='email'
							id='email'
							placeholder='Enter your email'
							onChange={this.onChange}
							className='form-control'
						/>
					</div>
					<div className='form-group d-flex'>
						<input
							type='password'
							name='password'
							id='password'
							placeholder='Enter your password'
							onChange={this.onChange}
							className='form-control'
						/>
					</div>
					<button
						type='submit'
						onClick={this.onSubmit}
						className='btn btn-outline-light login-btn'>
						Log In
					</button>
				</div>

				<p>
					Are you not registered? Sign Up, <Link
					to='/register'>Here!</Link>
				</p>
			</form>
		</div>;
	}
}

/**
 * Prop Types
 */
Login.propTypes = {
	isAuthenticated: PropTypes.bool,
	error: PropTypes.object,
	login: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired
};

const
	mapStateToProps = state => ({
		isAuthenticated: state.auth.isAuthenticated,
		error: state.error,
		auth: state.auth
	});

export default connect(
	mapStateToProps,
	{login, clearErrors}
)(Login);
