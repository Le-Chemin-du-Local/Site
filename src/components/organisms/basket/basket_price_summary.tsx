import {gql} from '@apollo/client';
import {useEffect, useState} from 'react';
import client from '../../../apollo/client';
import {CCProduct} from '../../../interfaces/product';

interface BasketPriceSummaryProps {
	ccProducts: Array<CCProduct>;
	remise: number;
}

/**
 * Retourn le prix total des produits
 * @param {BasketPriceSummaryProps} options Les produits
 * @return {JSX.Element} Le prix des produits
 */
export default function BasketPriceSummary(options: BasketPriceSummaryProps): JSX.Element {
	const {ccProducts, remise} = options;

	const [totalePrice, setTotalePrice] = useState(-1);
	const [quantity, setQuantity] = useState(0);

	useEffect(() => {
		const fetchTotal = async () => {
			let totale = 0;
			let totaleQuantity = 0;

			for (const ccProduct of ccProducts) {
				const {data} = await client.query({
					query:
					gql`
						query product($id: ID!) {
							product(id: $id) {
								id
								name
								price
								unit
							}
						}

					`,
					variables: {
						id: ccProduct.productID,
					},
				});

				if (data != undefined) {
					totale += data.product.price * ccProduct.quantity;
					totaleQuantity += ccProduct.quantity;
				}
			}

			setTotalePrice(totale);
			setQuantity(totaleQuantity);
		};

		fetchTotal();
	}, [ccProducts]);

	if (totalePrice == -1) {
		return (
			<p>Chargement du totale...</p>
		);
	}

	const articlesString = quantity > 1 ? 'articles' : 'article';

	return (
		<div className='flex flex-col w-full my-5'>
			<div className='flex justify-between text-lg font-semibold'>
				<span>Sous-total ({quantity} {articlesString})</span>
				<span className='place-self-end'>{totalePrice.toFixed(2)}€</span>
			</div>
			<div className='flex justify-between text-lg'>
				<span>Remise</span>
				<span className='place-self-end'>-{remise.toFixed(2)}€</span>
			</div>
			<div className='flex justify-between text-xl text-secondary-color font-semibold'>
				<span>Total</span>
				<span className='place-self-end'>{(totalePrice - remise).toFixed(2)}€</span>
			</div>
		</div>
	);
}
