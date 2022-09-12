import {gql} from '@apollo/client';
import {GetServerSideProps} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import client from '../../apollo/client';
import Card from '../../components/atoms/card';
import Layout from '../../components/organisms/layout';
import Pagination from '../../components/organisms/pagination';
import slugify from '../../helpers/slugify';
import {CommerceConnection} from '../../interfaces/commerce';

const NB_COMMERCES_PER_PAGES = 1;

// eslint-disable-next-line require-jsdoc
export const getServerSideProps: GetServerSideProps = async (context) => {
	const page = parseInt((context.params?.page ?? '1') as string) - 1;
	const cursorString = 'offset:' + (page * NB_COMMERCES_PER_PAGES).toString();
	const cursor = btoa(cursorString);

	const {data} = await client.query({
		query:
		gql`
			query commerces($first: Int, $after: String) {
				commerces(first: $first, after: $after) {
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
export default function listCommerces(options: ListCommercesProps): JSX.Element {
	const {totalCount, commerces, currentPage} = options;

	return (
		<Layout title={'Commerce - page ' + (currentPage + 1)}>
			<div className='w-full h-full'>
				<div className='w-full h-full grid grid-cols-2 gap-1'>
					<div className='w-full h-full flex flex-col items-center'>
						<div className='flex-grow w-full'>
							{commerces.edges.map((commerce) => (
								<Link
									key={commerce.node.id}
									href={`
									/commerce/${encodeURIComponent(commerce.node.id ?? '')}/${encodeURIComponent(slugify(commerce.node.storekeeperWord ?? ''))}
									`}
								>
									<a className='block w-full max-w-7xl'>
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
							uri={'/commerces/'} />
					</div>
					<div className='relative'>
						<Image src="/temps_map.png" alt="L'image de la carte des commerces" layout='fill' objectFit='cover'/>
					</div>
				</div>
			</div>
		</Layout>
	);
}
