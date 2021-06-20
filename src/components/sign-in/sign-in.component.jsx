import React from 'react';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import {auth, signInWithGoogle} from '../../firebase/firebase-utils';
import './sign-in.style.scss';

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
	}
	handleSubmit = async event => {
		event.preventDefault();
		const {email, password} = this.state;

		try {
			await auth.signInWithEmailAndPassword(email, password);
			//limpiamos el form despues de que se aprieta el boton de signin
			this.setState({
				email: '',
				password: ''
			});
		} catch (error) {
			console.log(error);
		}
	};

	handleChange = event => {
		const {value, name} = event.target;
		this.setState({
			[name]: value
		});
	};
	render() {
		return (
			<div className='sign-in'>
				{' '}
				<h2>I already have an account</h2>
				<span>Sign in with your email and password</span>
				<form onSubmit={this.handleSubmit}>
					<FormInput
						label='Email'
						name='email'
						handleChange={this.handleChange}
						type='email'
						value={this.state.email}
						required
					/>
					<FormInput
						label='Password'
						name='password'
						handleChange={this.handleChange}
						type='password'
						value={this.state.password}
						required
					/>
					<div className='buttons'>
						<CustomButton type='submit'>Sign In</CustomButton>
						<CustomButton
							type='button'
							onClick={signInWithGoogle}
							isGoogleSignIn
						>
							Sign In With Google
						</CustomButton>
					</div>
				</form>
			</div>
		);
	}
}

export default SignIn;
