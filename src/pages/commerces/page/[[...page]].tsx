import {gql} from '@apollo/client';
import {GetServerSideProps} from 'next';
import GoogleMapReact from 'google-map-react';
import client from '../../../apollo/client';
import Card from '../../../components/atoms/card';
import Layout from '../../../components/organisms/layout';
import Pagination from '../../../components/organisms/pagination';
import {BACKEND_URL} from '../../../constants/config';
import {CommerceConnection} from '../../../interfaces/commerce';
import MapMarker from '../../../components/atoms/map_marker';
import CommerceCard from '../../../components/organisms/commerce/commerce_card';

const NB_COMMERCES_PER_PAGES = 2;

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
							address{
								id
								number
								route
								optionalRoute
								postalCode
								city
							}
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

	return (
		<Layout title={'Commerce - page ' + (currentPage + 1)} initialAddress={initialAddress}>
			<div className='w-full h-full'>
				<div className='w-full h-full grid grid-cols-2 gap-1'>
					<div className='w-full h-full flex flex-col items-center pt-4'>
						<div className='justify-center px-8 w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4'>
							{commerces.edges.map((commerce) => (
								<Card
									key={commerce.node.id}
								>
									<CommerceCard commerce={commerce.node} />
								</Card>
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
