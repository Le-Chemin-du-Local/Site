import Image from 'next/image';
import {Address} from '../../../interfaces/address';

interface InformationsCardProps {
	email: string;
	phone: string;
	address: Address;
}

/**
 * Les informations du commerce
 * @param {InformationsCardProps} options Les informations du commerce
 * @return {JSX.Element} Les informations du commerce
 */
export default function InformationsCard(options: InformationsCardProps): JSX.Element {
	const {email, phone, address} = options;

	return (
		<div className="grid grid-cols-2 gap-4">
			<div className='relative h-[100px] col-[1/3]'>
				<Image
					src="/temps_map.png"
					alt="Carte de la localisation du commerce"
					className="w-full rounded-2xl"
					layout='fill' objectFit='cover' />
			</div>
			<div className='flex flex-col'>
				<h2 className='font-medium'>Coordonnées</h2>
				<span>{email}</span>
				<span>{phone}</span>
			</div>
			<div className='flex flex-col'>
				<h2 className='font-medium'>Adresse</h2>
				<span>{address.number} {address.route}</span>
				<span>{address.postalCode}, {address.city}</span>
			</div>
		</div>
	);
}
