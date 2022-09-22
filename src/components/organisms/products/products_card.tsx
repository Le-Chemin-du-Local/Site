import {DrapeauBretonSVG} from '../../../assets/icons';
import {BACKEND_URL} from '../../../constants/config';
import getUnitLabel from '../../../helpers/get_unit_label';
import {Product} from '../../../interfaces/product';
import ImageFallback from '../../atoms/image_fallback';

interface ProductCardProps {
	product: Product
}

/**
 * La carte pour visualiser un produit
 * @param {ProductCardProps} options Les informations du produit
 * @return {JSX.Element} La carte pour afficher le produit
 */
export default function ProductCard(options: ProductCardProps) {
	const {product} = options;

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
			{product.isBreton ? (
				<>
					<div className='h-2' />
					<div className='h-8 w-8'>
						<DrapeauBretonSVG />
					</div>
				</>
			) : (
				<div className='h-10' />
			)}
		</>
	);
}
