import {gql} from '@apollo/client';
import {useEffect, useState} from 'react';
import client from '../../../../apollo/client';
import {BasketCommerce} from '../../../../interfaces/basket';
import {Commerce} from '../../../../interfaces/commerce';

interface BasketConfirmationCommerceProps {
	basketCommerce: BasketCommerce;
}

/**
 * Les infos basique d'un commerce pour la page de confirmation
 * @param {BasketConfirmationCommerceProps} options Le commerce en question
 * @return {JSX.Element} Les infos basique d'un commerce
 */
export default function BasketConfirmationCommerce(options: BasketConfirmationCommerceProps): JSX.Element {
	const {basketCommerce} = options;

	const [commerceData, setCommerceData] = useState(undefined);

	useEffect(() => {
		// On a besoin de récupérer les informations du commerce
		const fetchCommerce = async () => {
			const {data} = await client.query({
				query:
				gql`			
					query commerce($id: ID!) {
						commerce(id: $id) {
							id
							name
							address {
								id
								number
								route
								optionalRoute
								postalCode
								city
							}
						}
					}
				`,
				variables: {
					id: basketCommerce.commerceID,
				},
			});

			if (data != undefined) {
				setCommerceData(data.commerce);
			}
		};

		fetchCommerce();
	});

	if (commerceData == undefined) {
		return (
			<p>Chargement...</p>
		);
	}

	const commerce = commerceData as Commerce;

	return (
		<div className='w-full flex flex-col'>
			<h2 className='font-bold'>{commerce.name}</h2>
			<div className='h-1' />

			<p>{`${commerce.address?.number} ${commerce.address?.route}`}</p>
			<p>{`${commerce.address?.postalCode} ${commerce.address?.city}`}</p>
		</div>
	);
}
