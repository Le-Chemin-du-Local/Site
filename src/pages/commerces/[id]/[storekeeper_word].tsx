import {gql} from '@apollo/client';
import {GetServerSideProps} from 'next';
import Image from 'next/image';
import client from '../../../apollo/client';
import Card from '../../../components/atoms/card';
import BusinessHoursCard from '../../../components/atoms/commerce/business_hours_card';
import InformationsCard from '../../../components/atoms/commerce/informations_card';
import Layout from '../../../components/organisms/layout';
import {BACKEND_URL} from '../../../constants/config';
import {Commerce} from '../../../interfaces/commerce';

interface CommercePageProps {
	commerce: Commerce;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const commerceID = context.params?.id as string;

	if (commerceID.length == 0) {
		return {
			notFound: true,
		};
	}

	const {data} = await client.query({
		query: gql`
		query commerce($id: ID!) {
			commerce(id: $id) {
				id
				name
				email
				phone
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
				businessHours {
					monday {
						opening
						closing
					}
					tuesday {
						opening
						closing
					}
					wednesday {
						opening
						closing
					}
					thursday {
						opening
						closing
					}
					friday {
						opening
						closing
					}
					saturday {
						opening
						closing
					}
					sunday {
						opening
						closing
					}
				}
			}
		}
		`,
		variables: {
			id: commerceID,
		},
	});

	return {
		props: {
			commerce: data.commerce,
		},
	};
};

/**
 * La page d'un commerçant
 * @param {CommercePageProps} options Les infos du commerce
 * @return {JSX.Element} La page du commerçant
 */
export default function CommercePage(options: CommercePageProps) {
	const {commerce} = options;

	return (
		<Layout title={`Commerce : ${commerce.name}`}>
			{/* Bannière du profil */}
			<div
				className={'w-full h-[416px] fixed top-0 flex items-center justify-center z-0'}
			>
				<Image
					className="h-[416px] mb-5 z-0"
					src={`${BACKEND_URL}/static/commerces/${commerce.id}/header.jpg`}
					alt="logo de base d'une image"
					layout='fill' objectFit='cover'
				/>

				<div className='w-full h-[416px] bg-gradient-to-b from-transparent to-[#000]  z-0'/>
				{/* Icône de profil et	*/}
				<div className="absolute bottom-8 left-12 flex items-center">
					<div className="h-24 w-24 bg-[#fafafe] rounded-full relative flex items-center justify-center">
						<Image
							className="h-2/4 rounded-full"
							src={`${BACKEND_URL}/static/commerces/${commerce.id}/profile.jpg`}
							alt="logo de base d'une image"
							layout='fill' objectFit='cover'
						/>
					</div>
					<h1 className="ml-8 text-white text-xl">{commerce.storekeeperWord}</h1>
				</div>
			</div>

			{/* Détails du commerce*/}
			<div className='z-10 mt-[370px] bg-[#fafafa] h-full grid gap-x-4 px-4 lg:px-16'>
				<div className='translate-y-[-60px] lg:col-start-1 lg:row-start-1 col-start-1 row-start-2'>
					<Card>
						<p>{commerce.description}</p>
					</Card>
					<div className='h-4' />
					<Card>
						<p className='text-3xl'>
							Produits Produits Produits Produits Produits Produits Produits Produits Produits Produits Produits
							Produits Produits Produits Produits Produits Produits Produits Produits Produits Produits Produits
							Produits Produits Produits Produits Produits Produits Produits Produits Produits Produits Produits
							Produits Produits Produits Produits Produits Produits Produits Produits Produits Produits Produits
							Produits Produits Produits Produits Produits Produits Produits Produits Produits Produits Produits
							Produits Produits Produits Produits Produits Produits Produits Produits Produits Produits Produits
							Produits Produits Produits Produits Produits Produits Produits Produits Produits Produits Produits
							Produits Produits Produits Produits Produits Produits Produits Produits Produits Produits Produits
							Produits Produits Produits Produits Produits Produits Produits Produits Produits Produits Produits
							Produits Produits Produits Produits Produits Produits Produits Produits Produits Produits Produits
						</p>
					</Card>
				</div>
				<div className='translate-y-[-60px] lg:w-[400px] lg:col-start-2 col-start-1 row-start-1'>
					<Card>
						{commerce.businessHours ?
							<BusinessHoursCard businessHours={commerce.businessHours} /> :
							<p>Le commerce n&apos;a pas encore d&apos;horaires</p>
						}
					</Card>
					<div className='h-4' />
					<Card>
						<InformationsCard
							email={commerce.email ?? ''}
							phone={commerce.phone ?? ''}
							address={commerce.address!} />
					</Card>
				</div>
			</div>
		</Layout>
	);
}
