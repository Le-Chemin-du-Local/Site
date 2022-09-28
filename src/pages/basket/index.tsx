import Router from 'next/router';
import {useEffect, useState} from 'react';
import ElevatedButton from '../../components/atoms/buttons/elevated_button';
import Card from '../../components/atoms/card';
import BasketCommerceBasket from '../../components/organisms/basket/basket_commerce_basket';
import BasketPriceSummary from '../../components/organisms/basket/basket_price_summary';
import Layout from '../../components/organisms/layout';
import LoginPopUp from '../../components/organisms/popups/login_popup';
import useUser from '../../helpers/useUser';
import {Basket} from '../../interfaces/basket';
import {CCProduct} from '../../interfaces/product';

/**
 * La page du panier
 * @return {JSX.Element} Le panier du client
 */
export default function BasketPage(): JSX.Element {
	const [basket, setBasket] = useState({commerces: []} as Basket);

	const [showLoginPopup, setShowLoginPopup] = useState(false);
	const {login} = useUser();

	useEffect(() => {
		if (localStorage.getItem('basket') != undefined) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const localBasket = JSON.parse(localStorage.getItem('basket')!);
			if (localBasket) setBasket(localBasket);
		}
	}, []);

	const onLocalBasketUpdate = () => {
		if (localStorage.getItem('basket') != undefined) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const localBasket = JSON.parse(localStorage.getItem('basket')!);
			if (localBasket) setBasket(localBasket);
		}
	};

	let ccProducts = [] as Array<CCProduct>;
	basket.commerces.forEach((basketCommerce) => {
		console.log(basketCommerce.products);
		if (basketCommerce.products != undefined) {
			ccProducts = ccProducts.concat(basketCommerce.products);
		}
	});


	return (
		<Layout title="Mon panier">
			{/* On affiche le dialog de connexion/inscription si besoin */}
			{login && !login.jwt && showLoginPopup &&
				<LoginPopUp onSuccess={() => Router.push('/basket/horaires')} />
			}

			<div className='h-8 w-full' />
			<div className='flex lg:flex-row flex-col w-full items-center lg:items-start justify-start lg:justify-center px-6 lg:px-16'>
				<Card className='w-full lg:max-w-[700px] p-4'>
					{/* Le Titre */}
					<div className='flex'>
						<h1 className='text-xl'>Vos articles</h1>
					</div>
					<div className='h-4' />

					{/* Les commerces */}
					{basket.commerces.map((basketCommerce) => (
						<BasketCommerceBasket
							key={basketCommerce.commerceID}
							basketCommerce={basketCommerce}
							onLocalBasketUpdate={onLocalBasketUpdate}
						/>
					))

					}
				</Card>

				<div className='hidden lg:block w-5' />
				<div className='lg:hidden h-4' />

				<div className='lg:max-w-[300px] w-full'>
					<BasketPriceSummary ccProducts={ccProducts} remise={0} />
					<div className='h-4' />
					<div className='w-full flex flex-col'>
						<ElevatedButton
							isDisabled={basket.commerces.length === 0}
							label="Passer ma commande"
							onClick={() => {
								if (login && !login.jwt) {
									setShowLoginPopup(true);
								} else {
									Router.push('/basket/horaires');
								}
							}} />
					</div>
				</div>
			</div>
		</Layout>
	);
}
