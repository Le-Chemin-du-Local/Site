import {ArrowForward} from '@mui/icons-material';
import Image from 'next/image';
import {HeartBretagneSVG} from '../assets/icons';
import ElevatedButton from '../components/atoms/buttons/elevated_button';
import BigCTA from '../components/organisms/big_cta';
import Footer from '../components/organisms/footer';
import HomeHeader from '../components/organisms/home_header';

/**
 * La page qui sommes nous
 * @return {JSX.Element} La page qui sommes nous
 */
export default function QuiSommesNousPage(): JSX.Element {
	return (
		<>
			<HomeHeader />
			<main className="flex flex-col items-center grow w-full px-8 py-4 mt-20">
				{/* Le header */}
				<div className='bg-qui-sommes-nous-header-pattern bg-cover bg-center w-full flex rounded-xl font-bold'>
					<div className='px-16 py-24 lg:py-[216px] md:w-1/2'>
						<h1 className='text-6xl text-white leading-[121%]'>
							C&apos;est l’histoire de trois amis qui ont la Bretagne dans
							leur <HeartBretagneSVG style={{
								display: 'inline',
							}}/>
						</h1>
					</div>
				</div>
				<div className='h-8' />

				<div className='w-full max-w-max-content'>
					{/* Première section */}
					<div className='w-full flex flex-col justify-between md:flex-row'>
						<div className='w-full pr-4'>
							<h2 className='text-2xl font-bold'>
								Passionnés par les bons produits (et les bonnes bières 😋),
								avides de rencontres et de discussions autour du circuit court
							</h2>
							<div className='h-2'/>
							<p>
								Nous sommes persuadés que l’avenir sera plus local, que les
								commerçants du coin sont les commerçants de demain
							</p>
							<div className='h-4'/>
							<p className='text-xl font-bold text-primary-color'>
								C’est cet état d’esprit précis qui nous a mené au Chemin du Local.
							</p>
						</div>
						<div className='w-full relative rounded-md overflow-hidden'>
							<Image
								src="/images/qui-sommes-nous/1.webp" alt="Photo personne"
								fill style={{
									objectFit: 'cover',
								}} />
						</div>
					</div>
					<div className='h-6' />

					{/* Seconde section */}
					<div className='w-full flex flex-col md:flex-row'>
						<div className='w-full relative rounded-md overflow-hidden'>
							<Image
								src="/images/qui-sommes-nous/2.webp" alt="Photo personne"
								fill style={{
									objectFit: 'cover',
								}} />
						</div>
						<div className='w-full pl-4'>
							<h2 className='text-2xl font-bold'>
								Un long chemin rempli de commerçants, producteurs et artisans en
								tout genre qui ont toutes et tous une sensibilité pour le manger mieux
							</h2>
							<div className='h-2'/>
							<p>
								Vous l&apos;avez compris,<br/>
								Le Chemin du Local c’est avant tout une entreprise 100% bretonne au
								service des bretons eux-mêmes et pour tous les commerçants qui animent
								nos centres-villes et font de la région Bretagne une des plus belles
								régions de terroir en France.
							</p>
							<div className='h-2'/>
							<p>
								Nous souhaitons faciliter la consommation locale et rendre plus accessible
								le circuit court. Et sur le long terme, amener à repenser les façons de
								consommer pour, par exemple, passer des grandes surfaces aux commerçants de
								proximité 🙄
							</p>
						</div>
					</div>

					<div className='w-full flex flex-col items-center my-8'>
						<h2 className='text-2xl font-bold'>Intéressé.e d’en savoir plus sur nos convictions ?</h2>
						<div className='h-2' />
						<ElevatedButton
							label='Découvrez le monde de Breizhine l’Hermine'
							iconRight={<ArrowForward />}
							href="/le-monde-de-breizhine-l-hermine/" />
					</div>

					<BigCTA />
					<div className='h-2' />
				</div>
			</main>
			<Footer />
		</>
	);
}
