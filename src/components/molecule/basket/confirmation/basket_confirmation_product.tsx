import {gql} from '@apollo/client';
import {useEffect, useState} from 'react';
import client from '../../../../apollo/client';
import {CCProduct, Product} from '../../../../interfaces/product';

interface BasketConfirmationProductProps {
	ccProduct: CCProduct;
}

/**
 * Les infos du produit sur la page de confirmation
 * @param {BasketConfirmationProductProps} options Le produit
 * @return {JSX.Element} Les infos du produit sur la page de confirmation
 */
export default function BasketConfirmationProduct(options: BasketConfirmationProductProps): JSX.Element {
	const {ccProduct} = options;

	const [productData, setProductData] = useState(undefined);

	useEffect(() => {
		const fetchProduct = async () => {
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
				setProductData(data.product);
			}
		};

		fetchProduct();
	});


	if (productData == undefined) {
		return (
			<>Chargement</>
		);
	}

	const product = productData as Product;

	return (
		<p className='font-bold'>
			{product.name}
		</p>
	);
}
