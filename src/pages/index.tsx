import {gql} from '@apollo/client';
import {ArrowForward} from '@mui/icons-material';
import {GetServerSideProps} from 'next';
import Image from 'next/image';
import client from '../apollo/client';
import ElevatedButton from '../components/atoms/buttons/elevated_button';
import Card from '../components/atoms/card';
import AddressInput from '../components/molecule/inputs/address_input';
import BigCTA from '../components/organisms/big_cta';
import CommerceCard from '../components/organisms/commerce/commerce_card';
import Footer from '../components/organisms/footer';
import HomeHeader from '../components/organisms/home_header';
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
		<>
			<HomeHeader />
			<main className="flex flex-col grow w-full px-8 py-4 mt-20">
				{/* Le header */}
				<div className='bg-hero-pattern bg-cover bg-center w-full flex rounded-xl font-bold'>
					<div className='px-16 py-24 lg:py-[216px] lg:w-1/2'>
						<h1 className='text-6xl text-white leading-[121%]'>Les produits locaux bretons à portée de main</h1>
						<div className='h-8' />
						<AddressInput
							isRequired
							inputName='city'
							placeholder='Où êtes vous en ce moment ?'
						/>
					</div>
				</div>

				{/* La liste des commerces */}
				<div className='flex flex-col items-center my-12'>
					<div className='text-center max-w-[700px]'>
						<h2 className='font-bold text-3xl'>Vos commerçants vous attendent</h2>
						<div className='h-4' />
						<p>
							Maraîchers, ostréiculteurs, éleveurs, épiciers, apiculteurs et bien d’autres !
							Ils sont tous là pour vous partager leur savoir-faire et leurs bons produits
						</p>
					</div>
					<div className='w-full flex flex-col lg:flex-row justify-center items-center'>
						{commerces.edges.map((edge) => (
							<Card
								className='w-full lg:w-1/4 m-4'
								key={edge.node.id}
							>
								<CommerceCard commerce={edge.node} />
							</Card>
						))}
					</div>
					<div className='h-6' />
					<ElevatedButton
						label='Voir tous les commerces'
						iconRight={<ArrowForward />}
						href="/commerces/" />
				</div>

				{/* Le monde de Beizhy l'hermine */}
				<div className='flex flex-col items-center my-12'>
					<h2 className='font-bold text-3xl'>Consommez mieux, consommez local</h2>
					<div className='h-12' />
					<div className='w-full flex flex-col sm:flex-row justify-center items-center'>
						{/* Etape 1 */}
						<Card className='flex flex-col justify-center items-center max-w-[316px] px-8 py-10 text-center'>
							<Image
								src="/images/hermines/bof.png" alt="Hermine étape 1"
								width={100} height={100} objectFit="contain" />
							<div className='h-4' />

							<h3 className='font-bold text-xl'>Etape 1</h3>
							<div className='h-4' />

							<p>
								Indiquez votre adresse et profitez de la liste des commerçants
								locaux proches de votre emplacement
							</p>
						</Card>
						<div className='w-[60px] h-4 lg:h-2 bg-primary-color' />

						<Card className='flex flex-col justify-center items-center max-w-[316px] px-8 py-10 text-center'>
							<Image
								src="/images/hermines/contente.png" alt="Hermine étape 2"
								width={100} height={100} objectFit="contain" />
							<div className='h-4' />

							<h3 className='font-bold text-xl'>Etape 2</h3>
							<div className='h-4' />

							<p>
								Indiquez votre adresse et profitez de la liste des commerçants
								locaux proches de votre emplacement
							</p>
						</Card>
						<div className='w-[60px] h-4 lg:h-2 bg-primary-color' />

						<Card className='flex flex-col justify-center items-center max-w-[316px] px-8 py-10 text-center'>
							<Image
								src="/images/hermines/amour.png" alt="Hermine étape 3"
								width={100} height={100} objectFit="contain" />
							<div className='h-4' />

							<h3 className='font-bold text-xl'>Etape 3</h3>
							<div className='h-4' />

							<p>
								Indiquez votre adresse et profitez de la liste des commerçants
								locaux proches de votre emplacement
							</p>
						</Card>
					</div>
					<div className='h-8' />

					<ElevatedButton
						label='Découvrez le monde de Breizhine l’Hermine'
						iconRight={<ArrowForward />}
						href="/le-monde-de-breizhine-l-hermine/" />
				</div>

				<div className='flex flex-col items-center my-12'>
					<BigCTA />
				</div>

			</main>
			<Footer />
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
		</>
	);
}
