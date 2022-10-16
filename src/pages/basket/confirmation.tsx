import {useEffect, useState} from 'react';
import ElevatedButton from '../../components/atoms/buttons/elevated_button';
import Card from '../../components/atoms/card';
import StatusMessage from '../../components/atoms/status_message';
import BasketConfirmationCommerce from '../../components/molecule/basket/confirmation/basket_confirmation_commerce';
import BasketConfirmationProduct from '../../components/molecule/basket/confirmation/basket_confirmation_product';
import Timer from '../../components/molecule/timer';
import Layout from '../../components/organisms/layout';
import {BACKEND_URL} from '../../constants/config';
import useUser from '../../helpers/useUser';
import {Basket} from '../../interfaces/basket';

/**
 * La page de confirmation de la commande
 * @return {JSX.Element} La page de confirmation de la commande
 */
export default function ConfirmationPage(): JSX.Element {
	const [basket, setBasket] = useState({commerces: []} as Basket);
	const [isSuccessful, setIsSuccessfull] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const {login} = useUser();

	useEffect(() => {
		if (localStorage.getItem('basket') != undefined) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const localBasket = JSON.parse(localStorage.getItem('basket')!);
			if (localBasket) setBasket(localBasket);
		}
	}, []);

	const handleOrder = async () => {
		const createOrder = async (paymentMethod: string) => {
			const response = await fetch(`${BACKEND_URL}/create-order`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${login.jwt}`,
				},
				body: JSON.stringify({
					PaymentMethodID: paymentMethod,
					basket: basket,
				}),
			});

			if (!response.ok) {
				setErrorMessage(`Nous n'avons pas pu finaliser l'achat...`);
			} else {
				localStorage.removeItem('basket');
				setIsSuccessfull(true);
			}
		};

		const paymentMethod = new URLSearchParams(window.location.search).get('paymentMethodID');

		if (!paymentMethod) return;

		if (login && login.jwt) {
			createOrder(paymentMethod);
		}
	};

	if (isSuccessful) {
		return (
			<Layout title='Votre commande est terminée'>
				<p>Bravo, votre commande a été passée.</p>
			</Layout>
		);
	}

	if (basket.commerces.length <= 0) {
		return (
			<Layout title='Confirmation de la commande'>
				<p>Chargement des informations...</p>
			</Layout>
		);
	}

	return (
		<Layout title='Confirmation de la commande'>
			<div className='h-4' />
			{errorMessage == '' ? (
				<Timer size={64} time={7} callback={handleOrder} />
			) : (
				<div className='w-full max-w-[1200px] px-4 lg:px-16'>
					<StatusMessage message={errorMessage} type='error' />
				</div>
			)}
			<div className='h-4' />

			<div className='w-full flex flex-col lg:flex-row max-w-[1200px] px-4 lg:px-16'>
				{/* Le résumé des commerces */}
				<Card className='w-full'>
					<h1 className='text-2xl'>Commerces de la commande</h1>
					<div className='h-4' />

					{basket.commerces.map((basketCommerce) => (
						<div key={basketCommerce.commerceID}>
							<BasketConfirmationCommerce basketCommerce={basketCommerce} />
							<div className='h-4' />
						</div>
					))
					}
				</Card>
				<div className='h-4 w-4' />

				{/* Le résumé des p                       roduits */}
				<Card className='w-full max-w-[400px]'>
					<h2 className='text-xl'>Récapitulatif de commande</h2>
					<div className='h-4' />

					{basket.commerces.map((basketCommerce) => (
						<div key={basketCommerce.commerceID}>
							{basketCommerce.products?.map((ccProduct) => (
								<div key={ccProduct.productID} className='w-full flex justify-between'>
									<div>
										<BasketConfirmationProduct
											ccProduct={ccProduct}
										/>
									</div>
									<p className='font-bold'>X{ccProduct.quantity}</p>
								</div>
							))}
						</div>
					))}
				</Card>
			</div>
			<div className='h-4' />
			<ElevatedButton
				label='Annuler'
				href='/basket/informations'
			/>
		</Layout>
	);
}
