import {gql} from '@apollo/client';
import {useEffect, useState} from 'react';
import client from '../../../apollo/client';
import {BACKEND_URL} from '../../../constants/config';
import getUnitLabel from '../../../helpers/get_unit_label';
import {basketAddProductToLocal, basketDeleteProductToLocal, basketRemoveProductToLocal} from '../../../interfaces/basket';
import {CCProduct, Product} from '../../../interfaces/product';
import ElevatedButton from '../../atoms/buttons/elevated_button';
import ImageFallback from '../../atoms/image_fallback';
import QuantityPicker from '../../molecule/inputs/quantity_picker';

interface BasketProductItemProps {
	onLocalBasketUpdated: () => void;
	commerceID: string;
	ccProdcut: CCProduct;
}

/**
 * Les infos du produits sur le panier
 * @param {BasketProductItemProps} options Les infos du produits
 * @return {JSX.Element} Les infos du produit sur le panier
 */
export default function BasketProductItem(options: BasketProductItemProps): JSX.Element {
	const {onLocalBasketUpdated, commerceID, ccProdcut} = options;

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
					id: ccProdcut.productID,
				},
			});

			if (data != undefined) {
				setProductData(data.product);
			}
		};

		fetchProduct();
	}, [ccProdcut]);

	if (productData == undefined) {
		return (
			<p>Chargement...</p>
		);
	}

	const product = productData as Product;

	return (
		<div className='my-2 grid grid-cols-[auto_1fr_auto] grid-rows-2'>
			{/* L'image du produit */}
			<div className='relative h-24 w-24 rounded-xl row-[1/3] mr-4'>
				<ImageFallback
					className='rounded-xl'
					src={`${BACKEND_URL}/static/products/${product.id}.jpg`}
					fallbackSrc='/images/placeholder.webp'
					alt={`Image du produit ${product.name}`}
					layout='fill' objectFit='cover'
				/>
			</div>

			{/* Le nom du produit */}
			<p className='self-center text-2xl'>{product.name}</p>

			{/* Le bouton de suppression */}
			<ElevatedButton
				label='Supprimer'
				onClick={() => {
					basketDeleteProductToLocal(commerceID, ccProdcut.productID);
					onLocalBasketUpdated();
				}}
			/>

			{/* Le prix et l'unité */}
			<p className='self-center text-2xl'>
				<strong className='text-secondary-color'>{product.price}€</strong>
				<span className='text-sm'> /{getUnitLabel(product.unit)}</span>
			</p>

			{/* Le modificateur de quantité */}
			<div className='self-end'>
				<QuantityPicker
					onPlus={() => {
						basketAddProductToLocal(commerceID, ccProdcut.productID);
						onLocalBasketUpdated();
					}}
					onLess={() => {
						basketRemoveProductToLocal(commerceID, ccProdcut.productID);
						onLocalBasketUpdated();
					}}
					quantity={ccProdcut.quantity}
				/>
			</div>
		</div>
	);
}
