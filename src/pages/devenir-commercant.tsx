import {ArrowForward} from '@mui/icons-material';
import Image from 'next/image';
import ElevatedButton from '../components/atoms/buttons/elevated_button';
import WhyBlock from '../components/molecule/devenir_commercant/why_block';
import Footer from '../components/organisms/footer';
import HomeHeader from '../components/organisms/home_header';

/**
 * La page pour inviter à devenir commerçant sur le Chemin du Local
 * @return {JSX.Element} La page pour inviter à devenir commerçant
 */
export default function DevenirCommercant(): JSX.Element {
	return (
		<>
			<HomeHeader />
			<main className="flex flex-col items-center grow w-full px-8 py-4 mt-20">
				{/* Le header */}
				<div className='bg-devenir-commercant-header-pattern bg-cover bg-center w-full flex rounded-xl font-bold'>
					<div className='px-16 py-24 lg:py-[216px] md:w-1/2'>
						<h1 className='text-4xl md:text-6xl text-white leading-[121%]'>
							La Bretagne et les commerçants qui l’a font vivre  réunis
							sur une seule plateforme : Le Chemin du Local
						</h1>
					</div>
				</div>
				<div className='h-8' />

				<div className='w-full flex flex-col justify-center max-w-max-content'>
					{/* Texte d'introduction */}
					<div className='text-center'>
						<h2 className='font-bold text-2xl'>Au Chemin du Local, nous souhaitons développer votre présence digital.</h2>
						<p className='text-xl'>
							Le circuit court est encore trop morselé, nous avons décidé de réunir tous
							les acteurs de ce modèle d’avenir sur une seule plateforme.
						</p>
					</div>

					{/* L'hermine du pourquoi */}
					<div className='my-8'>
						<h2 className='text-center font-bold text-2xl'>Pourquoi Le Chemin du Local ?</h2>
						<div className='block md:hidden h-8' />
						<Image
							src="/images/devenircommercant/why.webp" alt="Pourquoi devenir commerçant"
							className='hidden md:block px-16 lg:p-32 py-16'
							width="2002" height="1246"
							style={{
								width: '100%',
								height: 'auto',
							}}
						/>
						<div className='w-full block md:hidden'>
							<Image
								src="/images/devenircommercant/hermine.webp" alt="Breizhine l'hermine"
								width="1038" height="1246"
								style={{
									width: '100%',
									height: 'auto',
								}}
							/>
							<div className='h-2' />
							<WhyBlock
								title="Indépendance"
								// eslint-disable-next-line max-len
								content="Entreprise 100% bretonne, 100% indépendante et 100% investie dans une cause qui nous ait chère : la promotion du circuit court."
							/>
							<div className='h-6' />
							<WhyBlock
								title="Ecoute"
								// eslint-disable-next-line max-len
								content="Une assistance personnalisée avec un suivi régulier pour améliorer continuellement nos services et comprendre vos besoins."
							/>
							<div className='h-6' />
							<WhyBlock
								title="Transparence"
								content="Tous nos tarifs sont affichés sans petites étoiles. Chacun de nos services est proposé au mois ou à la consommation."
							/>
							<div className='h-6' />
							<WhyBlock
								title="Avenir"
								// eslint-disable-next-line max-len
								content="Une plateforme créée pour les commerçants et... par les commerçants eux-mêmes. Chaque service est pensée par rapport à vos problématiques."
							/>
							<div className='h-6' />
						</div>

						<div className='w-full flex justify-center'>
							<ElevatedButton
								label='Découvrez nos convictions'
								iconRight={<ArrowForward />}
								href="/le-monde-de-breizhine-l-hermine/" />
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
