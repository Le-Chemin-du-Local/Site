import {gql} from '@apollo/client';
import {ArrowForwardIos} from '@mui/icons-material';
import {useEffect, useState} from 'react';
import clientWithHeader from '../../apollo/client_with_header';
import ElevatedButton from '../../components/atoms/buttons/elevated_button';
import Card from '../../components/atoms/card';
import BasketPriceSummary from '../../components/organisms/basket/basket_price_summary';
import BasketCardList from '../../components/organisms/basket/informations/basket_cards_list';
import Layout from '../../components/organisms/layout';
import useUser from '../../helpers/useUser';
import {Basket} from '../../interfaces/basket';
import {CCProduct} from '../../interfaces/product';
import {RegisteredPaymentMethod, User} from '../../interfaces/user';

/**
 * La page d'information avant l'achat
 * @return {JSX.Element} La page d'informations avant l'achat
 */
export default function InformationsPage(): JSX.Element {
	const [page, setPage] = useState(0);

	const [basket, setBasket] = useState({commerces: []} as Basket);
	const [user, setUser] = useState({} as User);
	const [paymentMethod, setPaymentMethod] = useState(undefined as RegisteredPaymentMethod | undefined);

	const {login} = useUser();

	useEffect(() => {
		const fetchUser = async () => {
			const {data} = await clientWithHeader.query({
				query: gql`
					query getUser {
						user {
							id
							email
							firstName
							lastName
							registeredPaymentMethods {
								name
								stripeID
								cardBrand
								cardLast4Digits
							}
							defaultPaymentMethod {
								name
								stripeID
								cardBrand
								cardLast4Digits
							}
						}
					}
				`,
				context: {accessToken: login.jwt},
			});

			setUser(data.user);
			setPaymentMethod(data.user.defaultPaymentMethod);

			if (localStorage.getItem('basket') != undefined) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const localBasket = JSON.parse(localStorage.getItem('basket')!);
				if (localBasket) setBasket(localBasket);
			}
		};

		if (login && login.jwt) {
			fetchUser();
		}
	}, [login]);

	// Si on reviens de l'ajout de carte, il faut la définir comme moyen de paiement
	useEffect(() => {
		const fetchUser = async () => {
			const {data} = await clientWithHeader.query({
				query: gql`
					query getUser {
						user {
							id
							email
							firstName
							lastName
							registeredPaymentMethods {
								name
								stripeID
								cardBrand
								cardLast4Digits
							}
							defaultPaymentMethod {
								name
								stripeID
								cardBrand
								cardLast4Digits
							}
						}
					}
				`,
				context: {accessToken: login.jwt},
			});

			setUser(data.user);
			setPaymentMethod(data.user.registeredPaymentMethods[0]);
		};

		const setupSecret = new URLSearchParams(window.location.search).get('setup_intent_client_secret');
		const redirectStatus = new URLSearchParams(window.location.search).get('redirect_status');

		if (!setupSecret || !redirectStatus) return;

		if (login && login.jwt && redirectStatus == 'succeeded') {
			fetchUser();
		}
	}, [login]);

	if (!login || !login.jwt) {
		return (
			<Layout title='Vos informations'>
				<p>Chargement des informations...</p>
			</Layout>
		);
	}

	let ccProducts = [] as Array<CCProduct>;
	basket.commerces.forEach((basketCommerce) => {
		console.log(basketCommerce.products);
		if (basketCommerce.products != undefined) {
			ccProducts = ccProducts.concat(basketCommerce.products);
		}
	});

	return (
		<Layout title='Vos informations'>
			<div className='flex min-w-full w-full items-start overflow-hidden'>
				<div
					className='min-w-full h-full flex flex-col items-center mt-8 transition'
					style={{transform: 'translateX(-' + (page * 100).toString() + '%)'}}
				>
					{/* Le récapitulatif de la commande */}
					<Card className='w-full max-w-[900px] mx-4 lg:mx-16'>
						<h1 className='text-2xl'>Récapitulatif de commande</h1>
						<BasketPriceSummary ccProducts={ccProducts} remise={0} />
					</Card>
					<div className='h-4' />

					{/* Les informations de paiements */}
					<Card className='w-full max-w-[900px] mx-4 lg:mx-16 cursor-pointer'>
						<div onClick={() => setPage(1)}>
							<div className='flex justify-between items-center'>
								<h2 className='text-xl'>Infos de paiement</h2>
								<ArrowForwardIos />
							</div>
							<div className='h-4' />
							{paymentMethod ? (
								<div>
									<p className='font-bold'>Carte {paymentMethod.cardBrand}</p>
									<p>{paymentMethod.cardBrand} ****-{paymentMethod.cardLast4Digits}</p>
								</div>
							) : (
								<div>
									<p className='font-bold'>Aucun moyen de paiement</p>
									<p>Renseigner un moyen de paiement</p>
								</div>
							)}
						</div>
					</Card>
					<div className='h-4' />

					{/* Le bouton pour payer */}
					<div className='w-full max-w-[900px] mx-4 lg:mx-16 flex justify-end'>
						<ElevatedButton
							label='Payer'
							isDisabled={paymentMethod == undefined}
							href={`/basket/confirmation?paymentMethodID=${encodeURIComponent(paymentMethod?.stripeID ?? '')}`}
						/>
					</div>
				</div>

				{/* La page pour choisir une carte banquaire */}
				<div
					className='min-w-full h-full flex flex-col items-center justify-start mt-8 transition'
					style={{transform: 'translateX(-' + (page * 100).toString() + '%)'}}
				>
					<BasketCardList
						cards={user.registeredPaymentMethods ?? []}
						onChoosedCard={(card) => {
							setPaymentMethod(card);
							setPage(0);
						}}
					/>
				</div>
			</div>
		</Layout>
	);
}
