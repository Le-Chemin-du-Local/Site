import {useState} from 'react';
import {RegisteredPaymentMethod} from '../../../../interfaces/user';
import ElevatedButton from '../../../atoms/buttons/elevated_button';
import Card from '../../../atoms/card';
import AddCardForm from '../../../molecule/stripe/add_card_form';
import Radio from '../../../molecule/inputs/radio';
import StripeElement from '../../../molecule/stripe/stripe_element';
import {APP_URL} from '../../../../constants/config';
import OutlinedButton from '../../../atoms/buttons/outlined_button';

interface BasketCardsListProps {
	cards: Array<RegisteredPaymentMethod>;
	onChoosedCard: (choosedPaymentMethod: RegisteredPaymentMethod) => void;
}

/**
 * La liste des cartes bancaire de l'utilisateur
 * @param {BasketCardsListProps} options Les infos à afficher
 * @return {JSX.Element} La liste des cartes
 */
export default function BasketCardList(options: BasketCardsListProps): JSX.Element {
	const {cards, onChoosedCard} = options;

	const [currentStripID, setCurrentStripID] = useState('');

	const [isAddingCard, setIsAddingCard] = useState(false);

	if (isAddingCard) {
		return (
			<div className='w-full max-w-[900px] mx-4 lg:mx-16'>
				<StripeElement>
					<AddCardForm
						returnUrl={`${APP_URL}/basket/informations`}
						onCancel={() => setIsAddingCard(false)}
					/>
				</StripeElement>
			</div>
		);
	}

	return (
		<div className='w-full max-w-[900px] mx-4 lg:mx-16'>
			{cards.map((card) => (
				<Card key={card.stripeID} className='w-full p-2 flex items-center cursor-pointer mb-4'>
					<div className='px-4'>
						<Radio
							size={24}
							name='stripeID'
							value={card.stripeID}
							currentValue={currentStripID}
							onChange={() => setCurrentStripID(card.stripeID ?? '')}
						/>
					</div>
					<div className='flex flex-col'>
						<div className='flex'>
							<h2 className='font-bold text-xl'>{card.cardBrand} ****-{card.cardLast4Digits}</h2>
						</div>
						<div className='h-4' />
						<h3>Prénom NOM</h3>
						<h3>Expire le --/--/----</h3>
					</div>
				</Card>
			))}
			<div className='flex flex-row w-full justify-center'>
				<OutlinedButton
					label='Choisir cette carte'
					isDisabled={currentStripID == ''}
					onClick={() => {
						const paymentMethodIndex = cards.findIndex((card) => card.stripeID == currentStripID);

						if (paymentMethodIndex >= 0) {
							onChoosedCard(cards[paymentMethodIndex]);
						}
					}}
				/>
				<div className='w-4' />
				<ElevatedButton
					label='Ajouter une carte'
					onClick={() => setIsAddingCard(true)}
				/>
			</div>
		</div>
	);
}
