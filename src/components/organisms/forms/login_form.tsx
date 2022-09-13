import {gql, useMutation} from '@apollo/client';
import Router from 'next/router';
import {useState} from 'react';
import ElevatedButton from '../../atoms/buttons/elevated_button';
import StatusMessage from '../../atoms/status_message';
import TextInput from '../../molecule/inputs/text_input';

interface LoginFormProps {
	redirect: string;
	callbackSuccess?: () => void;
}

/**
 * Le formulaire de connexion
 * @param {LoginFormProps} options Les infos du formulaire de connexion
 * @return {JSX.Element} Le code du formulaire de connexion
 */
export default function LoginForm(options: LoginFormProps) {
	const {redirect, callbackSuccess} = options;

	const [runLoginMutation] = useMutation(
		gql`
			mutation login($input: Login!) {
				login(input: $input)
			}
		`, {
			onCompleted: async (data) => {
				if (data) {
					const response = await fetch('/api/login', {
						method: 'POST',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify({jwt: data.login}),
					});

					if (response.ok) {
						if (callbackSuccess) callbackSuccess();
						Router.push(redirect);

						setLoading(false);
					} else {
						setLoading(false);
						setError('Impossible de retenir la session');
					}
				}
			},
			onError: async (error) => {
				setLoading(false);
				setError(error.message);
			},
		}
	);

	const [isLoading, setLoading] = useState(false);
	const [errorMessage, setError] = useState('');

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				setLoading(true);

				runLoginMutation({
					variables: {
						input: {
							email: e.currentTarget.email.value,
							password: e.currentTarget.password.value,
						},
					},
				});
			}}
			className="flex flex-col items-center justify-between"
		>
			{(errorMessage.length > 0) &&
				<StatusMessage message={errorMessage} />
			}

			<TextInput
				inputName="email"
				label="Email"
				inputType='email'
				isRequired={true}
				placeholder='moi@gmail.com' />

			<TextInput
				inputName='password'
				label='Mot de Passe'
				inputType='password'
				isRequired={true}
				placeholder='******' />

			<ElevatedButton
				label='Connexion'
				isLoading={isLoading}
				isSubmitButton={true} />
		</form>
	);
}
