import {useEffect, useState} from 'react';
import ElevatedButton from '../../components/atoms/buttons/elevated_button';
import BasketCommerceSchedule from '../../components/organisms/basket/schedules/basket_commerce_schedule';
import Layout from '../../components/organisms/layout';
import {Basket, basketUpdatePickupDateToLocal} from '../../interfaces/basket';

/**
 * La page de choix des horaires de Click&Collect
 * @return {JSX.Element} La page de choix des horaires de retrait
 */
export default function HorairesPage(): JSX.Element {
	const [basket, setBasket] = useState({commerces: []} as Basket);
	const [currentCommerceIndex, setCurrentCommerceIndex] = useState(0);
	const [currentDateIndex, setCurrentDateIndex] = useState(-1);

	useEffect(() => {
		if (localStorage.getItem('basket') != undefined) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const localBasket = JSON.parse(localStorage.getItem('basket')!);
			if (localBasket) setBasket(localBasket);
		}
	}, []);

	return (
		<Layout title="Choisir les horaires">
			<div className='w-full h-full flex items-start justify-center mt-8'>
				{basket.commerces.length > 0 ? (
					<div
						className='w-full max-w-[900px] mx-4 lg:mx-16'
					>
						<BasketCommerceSchedule
							basketCommerce={basket.commerces[currentCommerceIndex]}
							selectedIndex={currentDateIndex}
							onScheduleChoosed={(index, date) => {
								setCurrentDateIndex(index);
								// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
								basketUpdatePickupDateToLocal(basket.commerces[currentCommerceIndex]!.commerceID!, date);
							}}
						/>
						<div className='flex flex-row justify-center my-4'>
							<ElevatedButton
								label='Précédent'
								onClick={() => {
									setCurrentCommerceIndex(currentCommerceIndex - 1);
								}}
								isDisabled={currentCommerceIndex == 0} />
							<div className='w-4' />
							{currentCommerceIndex == basket.commerces.length - 1 ? (
								<ElevatedButton
									isDisabled={currentDateIndex == -1}
									label='Payer' />
							) : (
								<ElevatedButton
									isDisabled={currentDateIndex == -1}
									label='Suivant'
									onClick={() => {
										setCurrentDateIndex(-1);
										setCurrentCommerceIndex(currentCommerceIndex + 1);
									}}
								/>
							)

							}
						</div>
					</div>
				) : (
					<p>Il n&apos;y a rien dans votre panier... Vous avez du vous perdre.</p>
				)}
			</div>
		</Layout>
	);
}
