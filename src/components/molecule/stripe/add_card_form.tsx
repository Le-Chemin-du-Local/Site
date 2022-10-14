import {PaymentElement, useStripe, useElements} from '@stripe/react-stripe-js';
import React, {useState} from 'react';
import ElevatedButton from '../../atoms/buttons/elevated_button';
import OutlinedButton from '../../atoms/buttons/outlined_button';
import StatusMessage from '../../atoms/status_message';

interface AddCardFormProps {
	returnUrl: string;
	buttonText?: string;
	onCancel?: () => void;
}

/**
 * Un formulaire de paiement
 * @param {AddCardFormProps} options Les infos du formulaire
 * @return {JSX.Element} Le formulaire de paiement
 */
export default function AddCardForm(options: AddCardFormProps): JSX.Element {
	const {returnUrl, buttonText, onCancel} = options;

	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setIsLoading(true);

		const {error} = await stripe.confirmSetup({
			elements,
			confirmParams: {
				return_url: returnUrl,
			},
		});

		if (error.type === 'card_error' || error.type === 'validation_error') {
			setErrorMessage(`Une erreur s'est produite : ${error.message}`);
		} else {
			setErrorMessage('Une erreur inconnue s\'est produite.');
		}

		setIsLoading(false);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='w-full'
		>
			{errorMessage != '' && (
				<div className='mb-4'>
					<StatusMessage
						type='error'
						message={errorMessage} />
				</div>
			)}
			<PaymentElement />
			<div className='h-4' />
			<div className='flex flex-row justify-center w-full'>
				<OutlinedButton
					label='Annuler'
					onClick={onCancel}
					isDisabled={isLoading}
				/>
				<div className='w-4' />
				<ElevatedButton
					label={buttonText ?? 'Ajouter la carte'}
					isSubmitButton={true}
					isDisabled={!stripe}
					isLoading={isLoading}
				/>
			</div>
		</form>
	);
}
