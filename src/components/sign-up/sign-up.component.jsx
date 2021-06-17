import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth, createUserProfileDocument} from '../../firebase/firebase-utils';
import './sign-up.styles.scss';

class SignUp extends React.Component {
	constructor() {
		super();
		this.state = {
			displayName: '',
			email: '',
			password: '',
			confirmPassword: ''
		};
	}

	handleSubmit = async event => {
		event.preventDefault();
		const {displayName, email, password, confirmPassword} = this.state;
		if (password !== confirmPassword) {
			alert("password don't match");
			return;
		}
		try {
			const {user} = await auth.createUserWithEmailAndPassword(email, password);
			await createUserProfileDocument(user, {displayName});

			this.state = {
				displayName: '',
				email: '',
				password: '',
				confirmPassword: ''
			};
		} catch (error) {
			console.log(error);
		}
	};

	handleChange = event => {
		const {name, value} = event.target;
		this.setState({[name]: value});
	};

	render() {
		const {displayName, email, password, confirmPassword} = this.state;
		return (
			<div className='sign-up'>
				<h2 className='title'>I do not have a acoount</h2>
				<span>Sign up with your email and password</span>
				<form className='sign-up-form' onSubmit={this.handleSubmit}>
					<FormInput
						type='text'
						name='displayName'
						value={displayName}
						label='displayName'
						onChange={this.handleChange}
						required
					/>
					<FormInput
						type='text'
						name='email'
						value={email}
						label='email'
						onChange={this.handleChange}
						required
					/>
					<FormInput
						type='text'
						name='password'
						value={password}
						label='password'
						onChange={this.handleChange}
						required
					/>
					<FormInput
						type='text'
						name='confirmPassword'
						value={confirmPassword}
						label='confirmPassword'
						onChange={this.handleChange}
						required
					/>
					<CustomButton type='Submit'>SIGN UP</CustomButton>
				</form>
			</div>
		);
	}
}

export default SignUp;
