import {ShoppingBasketOutlined} from '@mui/icons-material';
import {useEffect, useState} from 'react';
import {DrapeauBretonSVG} from '../../../assets/icons';
import {BACKEND_URL} from '../../../constants/config';
import getUnitLabel from '../../../helpers/get_unit_label';
import {basketAddProductToLocal, Basket, basketRemoveProductToLocal} from '../../../interfaces/basket';
import {Product} from '../../../interfaces/product';
import ImageFallback from '../../atoms/image_fallback';
import QuantityPicker from '../../molecule/inputs/quantity_picker';

interface ProductCardProps {
	commerceID: string;
	product: Product;
	isAvailableForClickAndCollect?: boolean;
}

/**
 * La carte pour visualiser un produit
 * @param {ProductCardProps} options Les informations du produit
 * @return {JSX.Element} La carte pour afficher le produit
 */
export default function ProductCard(options: ProductCardProps): JSX.Element {
	const {commerceID, product, isAvailableForClickAndCollect} = options;

	const [basket, setBasket] = useState({commerces: []} as Basket);

	// On doit récupérer les informations du basket
	useEffect(() => {
		if (localStorage.getItem('basket') != undefined) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const localBasket = JSON.parse(localStorage.getItem('basket')!);
			setBasket(localBasket);
		}
	}, []);

	let basketProductQuantity = 0;

	basket.commerces.forEach((commerce) => {
		if (commerce.commerceID == commerceID) {
			commerce.products?.forEach((ccProduct) => {
				if (ccProduct.productID == product.id) basketProductQuantity = ccProduct.quantity;
			});
		}
	});

	return (
		<>
			<div className='relative h-[214px] rounded-2xl'>
				<ImageFallback
					className='rounded-2xl'
					src={`${BACKEND_URL}/static/products/${product.id}.jpg`}
					fallbackSrc='/images/placeholder.webp'
					alt={`Image du produit ${product.name}`}
					layout='fill' objectFit='cover'
				/>
				<span className='absolute right-0 bottom-0 text-white px-4 py-2 bg-secondary-color rounded-tl-md rounded-br-2xl text-xs'>
					{product.price}€/{getUnitLabel(product.unit)}
				</span>
			</div>
			<div className='h-2' />
			<p className='text-lg'>
				{product.name}
			</p>
			<div className='h-2' />
			<div className='flex flex-row items-center justify-center'>
				{product.isBreton && (
					<div className='h-8 w-8'>
						<DrapeauBretonSVG />
					</div>
				)}
				{isAvailableForClickAndCollect ? (
					<div className='h-8 grow'>
						{basketProductQuantity > 0 ? (
							<QuantityPicker
								alignment='justify-end'
								minimumQuantity={0}
								onLess={() => {
									const newBasket = basketRemoveProductToLocal(commerceID, product.id ?? '');
									setBasket(newBasket);
								}}
								onPlus={() => {
									const newBasket = basketAddProductToLocal(commerceID, product.id ?? '');
									setBasket(newBasket);
								}}
								quantity={basketProductQuantity}
							/>
						) : (
							<div className='text-end'>
								<button
									className='bg-secondary-color rounded-full h-8 w-8 text-white'
									onClick={() => {
										const newBasket = basketAddProductToLocal(commerceID, product.id ?? '');
										setBasket(newBasket);
									}}
								>
									<ShoppingBasketOutlined className='w-6 h-6' />
								</button>
							</div>
						)

						}
					</div>
				) : (
					<div className='h-8 grow' />
				)}
			</div>
		</>
	);
}
