import {gql} from '@apollo/client';
import {useEffect, useState} from 'react';
import client from '../../../apollo/client';
import {BasketCommerce} from '../../../interfaces/basket';
import {Commerce} from '../../../interfaces/commerce';
import BasketProductItem from './basket_product_item';

interface BasketCommerceBasketProps {
	basketCommerce: BasketCommerce;
	onLocalBasketUpdate: () => void;
}

/**
 * Les informations du commerce affiché sur le panier
 * @param {BasketCommerceBasketProps} options Les infos du commerce
 * @return {JSX.Element} Les informations du commerce à afficher sur le panier
 */
export default function BasketCommerceBasket(options: BasketCommerceBasketProps): JSX.Element {
	const {basketCommerce, onLocalBasketUpdate} = options;

	const [commerceData, setCommerceData] = useState(undefined);
	const [productQuantity, setProductQuantity] = useState(0);

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

		let productCounter = 0;
		basketCommerce.products?.forEach((basketProduct) => {
			productCounter += basketProduct.quantity;
		});

		setProductQuantity(productCounter);
	}, [basketCommerce]);

	if (commerceData == undefined) {
		return (
			<p>Chargement...</p>
		);
	}

	const commerce = commerceData as Commerce;

	return (
		<div className='mb-4'>
			<div className='bg-secondary-color-lightened px-2 rounded text-lg flex items-center justify-betweend'>
				<p className='w-full'>{commerce.name}</p>
				<div className='bg-white text-sm w-5 h-5 rounded-full flex items-center justify-center'>
					{productQuantity}
				</div>
			</div>
			{basketCommerce.products?.map((ccProduct) => (
				<BasketProductItem
					key={ccProduct.productID}
					onLocalBasketUpdated={onLocalBasketUpdate}
					commerceID={commerce.id}
					ccProdcut={ccProduct}
				/>
			))

			}
		</div>
	);
}
