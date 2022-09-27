import {gql} from '@apollo/client';
import {Search} from '@mui/icons-material';
import {GetServerSideProps} from 'next';
import Router from 'next/router';
import Link from 'next/link';
import {FormEvent} from 'react';
import GoogleMapReact from 'google-map-react';
import client from '../../../apollo/client';
import ElevatedButton from '../../../components/atoms/buttons/elevated_button';
import Card from '../../../components/atoms/card';
import AddressInput from '../../../components/molecule/inputs/address_input';
import Layout from '../../../components/organisms/layout';
import Pagination from '../../../components/organisms/pagination';
import {BACKEND_URL} from '../../../constants/config';
import slugify from '../../../helpers/slugify';
import {CommerceConnection} from '../../../interfaces/commerce';
import MapMarker from '../../../components/atoms/map_marker';

const NB_COMMERCES_PER_PAGES = 1;

// eslint-disable-next-line require-jsdoc
export const getServerSideProps: GetServerSideProps = async (context) => {
	const page = parseInt((context.params?.page ?? '1') as string) - 1;
	const cursorString = 'offset:' + (page * NB_COMMERCES_PER_PAGES).toString();
	const cursor = btoa(cursorString);

	const location = context.query?.location as string;
	let latitude = undefined;
	let longitude = undefined;

	if (location != undefined) {
		const autocompleteResponse = await fetch(`${BACKEND_URL}/maps/autocomplete`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				'input': encodeURIComponent(location),
			}),
		});

		if (autocompleteResponse.ok) {
			const detailledLocations = await autocompleteResponse.json();

			if (detailledLocations.status == 'OK') {
				const locationDetailsResponse = await fetch(`${BACKEND_URL}/maps/details`, {
					method: 'POST',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						'placeID': detailledLocations.predictions[0].place_id,
					}),
				});

				if (locationDetailsResponse.ok) {
					const locationDetails = await locationDetailsResponse.json();

					if (locationDetails.status == 'OK') {
						latitude = locationDetails.result.geometry.location.lat,
						longitude = locationDetails.result.geometry.location.lng;
					}
				}
			}
		}
	}

	const {data} = await client.query({
		query:
		gql`
			query commerces($first: Int, $after: String, $filter: CommerceFilter) {
				commerces(first: $first, after: $after, filter: $filter) {
					totalCount
					edges {
						node {
							id
							name
							latitude
							longitude
							description
							storekeeperWord
						}
					}
				}
			}
		`,
		variables: {
			first: NB_COMMERCES_PER_PAGES,
			after: cursor,
			filter: latitude == undefined ? undefined : {
				nearLatitude: latitude,
				nearLongitude: longitude,
			},
		},
	});

	if (data.commerces.edges.length === 0) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			totalCount: data.commerces.totalCount,
			initialAddress: location ?? null,
			initialLat: latitude ?? null,
			initialLong: longitude ?? null,
			commerces: data.commerces,
			currentPage: page,
		},
	};
};

interface ListCommercesProps {
	totalCount: number
	initialAddress?: string
	initialLat?: number,
	initialLong?: number,
	commerces: CommerceConnection
	currentPage: number
}

/**
 * La liste des commerces
 * @param {ListCommercesProps} options Les propriétés de la page
 * @return {JSX.Element} La page de la liste des commerces
 */
export default function ListCommerces(options: ListCommercesProps): JSX.Element {
	const {totalCount, initialAddress, initialLat, initialLong, commerces, currentPage} = options;

	const defaultMapProps = {
		center: {
			lat: initialLat ?? 48.1173,
			lng: initialLong ?? -1.6778,
		},
		zoom: 11,
	};

	const onSearchForCommerce = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		Router.push(`/commerces/page/1?location=${encodeURIComponent(event.currentTarget.address.value)}`);
	};

	return (
		<Layout title={'Commerce - page ' + (currentPage + 1)}>
			<div className='w-full h-full'>
				<div className='w-full h-full grid grid-cols-2 gap-1'>
					<div className='w-full h-full flex flex-col items-center pt-4'>
						<div className='flex-grow justify-center w-full'>
							<form className='flex flex-row px-8 pt-2 pb-4' onSubmit={onSearchForCommerce}>
								<AddressInput
									isRequired
									initialValue={initialAddress}
									inputName='address'
									placeholder='Où êtes vous en ce moment ?'
								/>
								<div className='w-4' />
								<ElevatedButton
									color='secondary'
									label=''
									icon={<Search />}
									isSubmitButton
								/>
							</form>
							{commerces.edges.map((commerce) => (
								<Link
									key={commerce.node.id}
									href={`
									/commerces/${encodeURIComponent(commerce.node.id ?? '')}/
									${encodeURIComponent(slugify(commerce.node.storekeeperWord ?? ''))}
									`}
								>
									<a className='block w-full px-8'>
										<Card className='mb-0'>
											<h2 className='text-2xl'>{commerce.node.name ?? 'Nom inconnu'}</h2>
											<span>{commerce.node.storekeeperWord ?? 'Le commerce n\'a pas d\'informations'}</span>
										</Card>
									</a>
								</Link>
							))}
						</div>
						<Pagination
							currentPage={currentPage + 1}
							nbPage={totalCount / NB_COMMERCES_PER_PAGES}
							uri={'/commerces/page/'} />
					</div>
					<div className='relative h-full'>
						<GoogleMapReact
							bootstrapURLKeys={{key: ''}}
							defaultCenter={defaultMapProps.center}
							defaultZoom={defaultMapProps.zoom}
						>
							{commerces.edges.map((commerce) => (
								<MapMarker
									key={commerce.node.id}
									lat={commerce.node.latitude ?? 48.1173}
									lng={commerce.node.longitude ?? -1.6778} />
							))}
						</GoogleMapReact>
					</div>
				</div>
			</div>
		</Layout>
	);
}
