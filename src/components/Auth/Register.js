import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {Alert} from 'reactstrap';
import uuid from 'uuid';

import {register} from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';
import {REGISTER_FAIL} from '../../actions/types';

class Register extends Component {
	state = {
		name: '',
		email: '',
		password_1: '',
		password_2: '',
		address: '',

		msg: null
	};

	componentDidUpdate(previousProps) {
		const {error} = this.props;

		if (error !== previousProps.error) {
			if (error.id === REGISTER_FAIL) {
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

		const {name, email, password_1, password_2, address} = this.state;

		if (password_1 === password_2) {
			//Create User OBject
			const newUser = {
				name,
				email,
				password: password_1,
				address
			};

			//Attempt to register
			this.props.register(newUser);
		} else {
			this.setState({msg: [{msg: 'Passwords must match!'}]});
		}
	};

	render() {
		const {name, email, password_1, password_2, address} = this.state;

		if (this.props.isAuthenticated) {
			return <Redirect to={"/loading"}/>;
		}

		return (
			<div className='auth mt-5 register'>
				{this.state.msg ? this.state.msg.map(err => (<Alert key={uuid()} color='danger'>
					{err.msg}
				</Alert>)) : null}

				<form>
					<div className='form-group'>
						<div className='row'>
							<div className='col'>
								<label>Name*</label>
								<input
									type='text'
									name='name'
									id='name'
									placeholder='Enter your name'
									onChange={this.onChange}
									className='form-control'
								/>
							</div>
							<div className='col'>
								<label>Email*</label>
								<input
									type='email'
									name='email'
									id='email'
									placeholder='Enter your email*'
									onChange={this.onChange}
									className='form-control'
								/>
							</div>
						</div>
						<br/>
						<div className={"row"}>
							<div className='col'>
								<label>Address*</label>
								<input
									type='address'
									name='address'
									id='address'
									placeholder='Enter your Address*'
									onChange={this.onChange}
									className='form-control'
								/>
							</div>
						</div>
						<br/>
						<div className='row'>
							<div className='col'>
								<label>Password*</label>
								<input
									type='password'
									name='password_1'
									id='password_1'
									placeholder='Enter your password*'
									onChange={this.onChange}
									className='form-control'
								/>
							</div>
							<div className='col'>
								<label>Confirm Password*</label>
								<input
									type='password'
									name='password_2'
									id='password_2'
									placeholder='Confirm your password*'
									onChange={this.onChange}
									className='form-control'
								/>
							</div>
						</div>
						<br/>
						<p className={"text-muted"}>Ao registar está a aceitar que as suas informações fornecidadas sejam guardadas
							e geridas pela MyOwnCutlery®, apenas para uso interno.
							As mesmas serão guardadas e tratadas pela MyOwnCuttlery®, sem possibilidade de passagem a
							terceiros de acordo com o Art.º 12º do Regulamento Geral de Proteção de Dados.
							No momento de anulação da sua conta, todos os dados pessoais serão apagados, não havendo possibilidade de
							recuperação, de acordo com o Art.º 17º do Regulamento Geral de Proteção de Dados de 14 de Abril de 2016.
							Em conformidade com o Art.º 15º poderá consultar os seus dados na página de perfil.
							Concluindo o registo aceita os termos acima dispostos.</p>
						<button
							className='btn btn-outline-light login-btn'
							type='button'
							onClick={this.onSubmit}
							disabled={!(
								name !== '' &&
								email !== '' &&
								password_1 !== '' &&
								password_2 !== '' &&
								address !== ""
							)}>
							Sign Up
						</button>
					</div>
				</form>
				<p>
					Already registered? Sign In, <Link to='/login'>Here!</Link>
				</p>
			</div>
		)
			;
	}
}

Register.propTypes = {
	isAuthenticated: PropTypes.bool,
	error: PropTypes.object,
	register: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	auth: state.auth,
	error: state.error
});

export default connect(
	mapStateToProps,
	{register, clearErrors}
)(Register);
