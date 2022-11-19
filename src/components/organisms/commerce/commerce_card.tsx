import {LocationOnOutlined} from '@mui/icons-material';
import {BACKEND_URL} from '../../../constants/config';
import slugify from '../../../helpers/slugify';
import {Commerce} from '../../../interfaces/commerce';
import ImageFallback from '../../atoms/image_fallback';

interface CommerceCardProps {
	commerce: Commerce
}

/**
 * La carte pour visualiser un produit
 * @param {CommerceCardProps} options Les informations du produit
 * @return {JSX.Element} La carte pour afficher le produit
 */
export default function CommerceCard(options: CommerceCardProps): JSX.Element {
	const {commerce} = options;

	return (
		<a href={`/commerces/${encodeURIComponent(commerce.id ?? '')}/${encodeURIComponent(slugify(commerce.storekeeperWord ?? ''))}`}>
			<div className='relative h-[214px] rounded-2xl'>
				<ImageFallback
					className='rounded-2xl'
					src={`${BACKEND_URL}/static/commerces/${commerce.id}/header.jpg`}
					fallbackSrc='/images/placeholder.webp'
					alt={`Image du commerce ${commerce.name}`}
					layout='fill' objectFit='cover'
				/>
				<span className='absolute right-0 bottom-0 text-white px-4 py-2 bg-secondary-color rounded-tl-md rounded-br-2xl text-lg'>
					{commerce.name}
				</span>
			</div>
			<div className='h-2' />
			<div className='flex justify-between items-center'>
				<p>
					<LocationOnOutlined className='w-6 h-6 mr-2 text-secondary-color' />
					<strong>{commerce.address?.postalCode} - {commerce.address?.city}</strong>
				</p>
				<p className='px-4 py-2 rounded-full bg-secondary-color text-white font-bold'>
					à 1,5km
				</p>
			</div>
			<div className='h-2' />
		</a>
	);
}
