import GoogleMapReact from 'google-map-react';
import {Address} from '../../../interfaces/address';
import MapMarker from '../../atoms/map_marker';

interface InformationsCardProps {
	email: string;
	phone: string;
	latitude?: number;
	longitude?: number;
	address: Address;
}

/**
 * Les informations du commerce
 * @param {InformationsCardProps} options Les informations du commerce
 * @return {JSX.Element} Les informations du commerce
 */
export default function InformationsCard(options: InformationsCardProps): JSX.Element {
	const {email, phone, latitude, longitude, address} = options;

	const defaultMapProps = {
		center: {
			lat: latitude ?? 48.1173,
			lng: longitude ?? -1.6778,
		},
		zoom: 12,
	};

	return (
		<div className="grid grid-cols-2 gap-4">
			<div className='relative h-[200px] col-[1/3]'>
				<GoogleMapReact
					defaultCenter={defaultMapProps.center}
					defaultZoom={defaultMapProps.zoom}
				>
					{(latitude && longitude) && (
						<MapMarker
							lat={latitude} lng={longitude} />
					)}
				</GoogleMapReact>
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
