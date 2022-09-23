import {gql} from '@apollo/client';
import {GetServerSideProps} from 'next';
import Image from 'next/image';
import client from '../apollo/client';
import {ClickAndCollectSVG, PanierFlashSVG} from '../assets/icons';
import ElevatedButton from '../components/atoms/buttons/elevated_button';
import Card from '../components/atoms/card';
import TextInput from '../components/molecule/inputs/text_input';
import CommerceCard from '../components/organisms/commerce/commerce_card';
import Layout from '../components/organisms/layout';
import {CommerceConnection} from '../interfaces/commerce';

// eslint-disable-next-line require-jsdoc
export const getServerSideProps: GetServerSideProps = async () => {
	const {data} = await client.query({
		query:
		gql`
			query commerces($first: Int) {
				commerces(first: $first) {
					totalCount
					edges {
						node {
							id
							name
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
			first: 4,
		},
	});

	return {
		props: {
			commerces: data.commerces,
		},
	};
};

interface HomePagePropsProps {
	commerces: CommerceConnection
}

/**
 * La page d'accueil du Chemin du Local
 * @param {HomePagePropsProps} options Les informations à afficher sur la page d'accueil
 * @return {JSX.Element} Le code de la page
 */
export default function Main(options: HomePagePropsProps): JSX.Element {
	const {commerces} = options;

	return (
		<Layout title='Bienvenue sur le Chemin du Local'>
			<div className='
				bg-illustration-click-and-collect bg-fixed bg-cover bg-center min-h-[94vh] w-full flex
			'>
				<div className='px-8 lg:px-24 pt-[18vh] pb-8'>
					<Image
						className='z-10'
						src='/images/hermine.png'
						alt="l'hermine du Chemin du Local"
						width={131} height={104}
					/>
					<Card className='mt-[-23px]'>
						<h1 className='text-2xl'>Retrouvez des commerces locaux autours de chez vous ! 👋</h1>
						<TextInput
							inputName='city'
							placeholder='Où êtes vous en ce moment ?'
						/>
					</Card>
					<div className='h-4' />
					<div className='flex flex-col sm:flex-row items-center w-full '>
						{/* Carte pour les commerçant */}
						<Card className='flex flex-col items-center w-full'>
							<div className='w-32 h-32'>
								<PanierFlashSVG />
							</div>
							<h2 className='text-xl'>Je suis commerçant</h2>
							<ElevatedButton label='Vendre' />
						</Card>

						<div className='h-8 w-8' />

						{/* Carte pour les clients */}
						<Card className='flex flex-col items-center w-full'>
							<div className='w-32 h-32'>
								<ClickAndCollectSVG />
							</div>
							<h2 className='text-xl'>Je suis client</h2>
							<ElevatedButton
								label='Acheter'
								href='/commerces/page/1'
							/>
						</Card>
					</div>
				</div>
			</div>
			<div className='bg w-full pb-4'>
				<div className='px-8 lg:px-24 mt-[-32px] lg:mt-[-124px] w-full flex flex-col lg:flex-row items-center'>
					{commerces.edges.map((edge) => (
						<Card
							className='w-full lg:w-1/4 m-4'
							key={edge.node.id}
						>
							<CommerceCard commerce={edge.node} />
						</Card>
					))

					}
				</div>
			</div>
			<div className='py-10 px-8 lg:px-24 w-full'>
				<h2 className='w-full text-3xl'>Bienvenue sur le Chemin du Local ?</h2>
				<div className='h-4' />
				<p>
					Le Chemin du Local, c’est la rencontre entre la magnifique région bretonne et les
					bons produits du terroir. Avec Le Chemin du Local, il n’a jamais été aussi simple
					de passer commande en ligne chez vos commerçants de proximité.
				</p>
				<div className='h-2' />
				<p>
					Retrouvez tous vos commerçants locaux et passez commande chez eux dès maintenant
					pour dégustrer les meilleurs produits de la région et aussi les plus gourmands...
					N’oublions pas que la Bretagne est reconnue pour ses spécialités comme le célèbre
					Kouign Amann 😋 Décrouvez ou redécouvrez une région pleine de savoir faire à travers
					tous les commerçants qui y travaillent. Épiciers, poissonniers, bouchers, ostréiculteurs,
					apiculteurs, boulangers... Ils vous attendent tous sur le Chemin du Local.
				</p>
				<div className='h-2' />
				<p>
					Choisissez vos produits chez différents commerçants, passez commande et allez récupérer
					vos produits en passant chez les commerçants les uns après les autres : une bonne occasion
					pour apprendre à les connaître !
				</p>
			</div>
			{/* <div className='w-full px-16 items-center'>
				<div>
					<h1 className='text-4xl'>Bienvenue sur le Chemin du Local</h1>
					<h2 className='text-3xl'>Je suis un header medium</h2>
					<h3 className='text-2xl'>Et moi un header petit</h3>
					<h4 className='text-xl'>Et moi un titre medium</h4>

					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eleifend augue nec neque semper,
						at condimentum urna eleifend. In ullamcorper diam orci, eget dictum ante vehicula eu. Nulla quis
						sodales diam. In efficitur mi et efficitur placerat. Suspendisse tincidunt sem auctor pretium rutrum.
						Aenean laoreet sem non leo rhoncus ultrices. Cras volutpat quam non nisl semper sagittis. Nam lacinia
						erat at ante pulvinar tristique. Sed ac arcu vitae nulla elementum tristique non imperdiet diam.
						Vivamus fringilla eleifend ex a faucibus. Nunc nec interdum lacus, et auctor urna. In vehicula accumsan
						ante, vitae consequat magna ultrices vel. Curabitur id feugiat odio. Praesent sit amet sollicitudin nibh.
						Fusce auctor et dolor in tincidunt.
					</p>
				</div>
				<div className='h-6' />
				<div className='grow'>
					<ElevatedButton
						color='primary'
						label="Hello World"
					/>

					<OutlinedButton
						color='primary'
						isDisabled={false}
						label="Hello Outlined"
					/>
				</div>
			</div> */}
		</Layout>
	);
}
