import {ReactNode, useEffect, useState} from 'react';
import {loadStripe, Appearance, StripeElementsOptions} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import {STRIPE_PUBLIC_KEY} from '../../../constants/app';
import useUser from '../../../helpers/useUser';
import {BACKEND_URL} from '../../../constants/config';

interface StripeElementProps {
	children: ReactNode;
}
/**
 * Le Wrapper autours des éléments Stripe qui permet notamment
 * de récupérer la clé d'API
 * @param {StripeElementProps} options Les éléments de Striope
 * @return {JSX.Element} Le wrapper autours des éléments Stripe
 */
export default function StripeElement(options: StripeElementProps): JSX.Element {
	const {children} = options;

	const [stripePromise] = useState(() => loadStripe(STRIPE_PUBLIC_KEY ?? ''));
	const [clientSecret, setClientSecret] = useState('');

	const {login} = useUser();

	// On a besoin de récupérer le secret côté serveur dès le chargement
	// de la page
	useEffect(() => {
		if (login && login.jwt) {
			const fetchSecret = async () => {
				const response = await fetch(`${BACKEND_URL}/create-setup-intent`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${login.jwt}`,
					},
					body: JSON.stringify({
						UseStripeSDK: false,
						PaymentMethodID: null,
					}),
				});
				const data = await response.json();

				setClientSecret(data.clientSecret);
			};

			fetchSecret();
		}
	});

	const appearance = {
		theme: 'stripe',
	} as Appearance;

	const stripeOptions = {
		clientSecret,
		appearance,
	} as StripeElementsOptions;

	if (!clientSecret) {
		return (
			<p>Chargement...</p>
		);
	}

	return (
		<Elements options={stripeOptions} stripe={stripePromise}>
			{children}
		</Elements>
	);
}
