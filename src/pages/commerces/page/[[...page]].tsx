import {gql} from '@apollo/client';
import {GetServerSideProps} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import client from '../../../apollo/client';
import Card from '../../../components/atoms/card';
import Layout from '../../../components/organisms/layout';
import Pagination from '../../../components/organisms/pagination';
import {BACKEND_URL} from '../../../constants/config';
import slugify from '../../../helpers/slugify';
import {CommerceConnection} from '../../../interfaces/commerce';

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
			commerces: data.commerces,
			currentPage: page,
		},
	};
};

interface ListCommercesProps {
	totalCount: number
	commerces: CommerceConnection
	currentPage: number
}

/**
 * La liste des commerces
 * @param {ListCommercesProps} options Les propriétés de la page
 * @return {JSX.Element} La page de la liste des commerces
 */
export default function ListCommerces(options: ListCommercesProps): JSX.Element {
	const {totalCount, commerces, currentPage} = options;

	return (
		<Layout title={'Commerce - page ' + (currentPage + 1)}>
			<div className='w-full h-full'>
				<div className='w-full h-full grid grid-cols-2 gap-1'>
					<div className='w-full h-full flex flex-col items-center pt-4'>
						<div className='flex-grow justify-center w-full'>
							{commerces.edges.map((commerce) => (
								<Link
									key={commerce.node.id}
									href={`
									/commerces/${encodeURIComponent(commerce.node.id ?? '')}/${encodeURIComponent(slugify(commerce.node.storekeeperWord ?? ''))}
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
					<div className='relative'>
						<Image src="/temps_map.png" alt="L'image de la carte des commerces" layout='fill' objectFit='cover'/>
					</div>
				</div>
			</div>
		</Layout>
	);
}
