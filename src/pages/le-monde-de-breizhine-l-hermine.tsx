/* eslint-disable max-len */
import {BieresCidresSVG, BioSVG, DrapeauBretonSVG, EpicerieSVG, OstreiculteurSVG, PoissonnerieSVG} from '../assets/icons';
import BreizhinePageCard from '../components/molecule/monde_breizhine/breizhine_page_card';
import HomeHeader from '../components/organisms/home_header';
import {Diversity3, Sailing, SpaOutlined} from '@mui/icons-material';
import Image from 'next/image';
import BigCTA from '../components/organisms/big_cta';
import Footer from '../components/organisms/footer';
import CategoryCard from '../components/molecule/product/category_card';
/**
 * La page du monde de Breizhine l'hermine
 * @return {JSX.Element} La page du monde de Breizhine l'hermin
 */
export default function BreizhinePage(): JSX.Element {
	return (
		<>
			<HomeHeader />
			<main className="flex flex-col items-center grow w-full px-8 py-4 mt-20">
				{/* Le header */}
				<div className='bg-breizhine-header-pattern bg-cover bg-center w-full flex rounded-xl font-bold'>
					<div className='px-16 py-24 lg:py-[216px] md:w-1/2 lg:w-1/3'>
						<h1 className='text-6xl text-white leading-[121%]'>Le monde de Breizhine l&apos;Hermine est un monde de...</h1>
					</div>
				</div>
				<div className='h-8' />

				<div className='max-w-max-content'>
					<BreizhinePageCard
						icon={<DrapeauBretonSVG />}
						title="Proximité"
						description={`Commerçants, producteurs, artisans.
						Ils sont tout près de chez vous et vous proposent les produits de votre quotidien, toujours avec le sourire 😃
						`}
					>
						<div className='w-full grid grid-cols-2 md:grid-cols-3 lg:flex gap-4 items-center justify-center pb-8 px-4'>
							<div className='md:w-[205px]'>
								<CategoryCard icon={<BioSVG width="100%" height="100%" />} title="Agriculteur" />
							</div>
							<div className='md:w-[205px]'>
								<CategoryCard icon={<PoissonnerieSVG width="100%" height="100%" />} title="Poisonniers" />
							</div>
							<div className='md:w-[205px]'>
								<CategoryCard icon={<EpicerieSVG width="100%" height="100%" />} title="Epiciers" />
							</div>
							<div className='md:w-[205px]'>
								<CategoryCard icon={<OstreiculteurSVG width="100%" height="100%" />} title="Ostréiculteurs" />
							</div>
							<div className='md:w-[205px]'>
								<CategoryCard icon={<BieresCidresSVG width="100%" height="100%" />} title="Micro-brasseurs" />
							</div>
						</div>
					</BreizhinePageCard>
					<div className='h-8' />

					<BreizhinePageCard
						icon={<SpaOutlined className='w-16 h-16' />}
						title="Savoir-faire et spécialités"
						description={`C’est avec une passion débordante pour leurs produits que les commerçants, producteurs et artisans vous font décrouvrir leur univers.
						Besoin de conseils avisés ? Ce sont les meilleurs ambassadeurs du bien manger !
						`}
					>
						<div className='w-full flex flex-row justify-center items-center'>
							<div className='grow relative h-[148px] md:h-[398px]'>
								<Image src="/images/monde-breizhine/1.webp" alt="Image 1" fill objectFit='cover' />
							</div>
							<div className='grow relative h-[148px] md:h-[398px]'>
								<Image src="/images/monde-breizhine/2.webp" alt="Image 2" fill objectFit='cover' />
							</div>
							<div className='grow relative h-[148px] md:h-[398px]'>
								<Image src="/images/monde-breizhine/3.webp" alt="Image 3" fill objectFit='cover' />
							</div>
						</div>
					</BreizhinePageCard>
					<div className='h-8' />

					<BreizhinePageCard
						icon={<Diversity3 className='w-16 h-16' />}
						title="Valeurs"
						description={`De valeurs humaines, de valeurs sociales et... de valeurs nutrionnelles.
						Toutes ces valeurs se reflètent par leur engagement au quotidien pour la promotion du circuit court et de tous les bons produits qui en ressortent 🤩
						`}
					>
						<div className='w-full flex flex-row justify-center items-center'>
							<div className='grow relative h-[148px] md:h-[398px]'>
								<Image src="/images/monde-breizhine/4.webp" alt="Image 4" fill objectFit='cover' />
							</div>
							<div className='grow relative h-[148px] md:h-[398px]'>
								<Image src="/images/monde-breizhine/5.webp" alt="Image 5" fill objectFit='cover' />
							</div>
							<div className='grow relative h-[148px] md:h-[398px]'>
								<Image src="/images/monde-breizhine/6.webp" alt="Image 6" fill objectFit='cover' />
							</div>
						</div>
					</BreizhinePageCard>
					<div className='h-8' />

					<BreizhinePageCard
						icon={<Sailing className='w-16 h-16' />}
						title="Terroir"
						// eslint-disable-next-line max-len
						description={`Entre terre et mer, la Bretagne est une région de terroir.
						De Rennes à Brest, de Lorient à Saint-Brieuc, découvrez les villes et villages bretons par celles et ceux qui les font vivre au quotidien.`}
					>
						<div className='w-full flex justify-center px-8'>
							<Image src="/images/monde-breizhine/bretagne.webp" width={864} height={630} alt="Carte de la Bretagne" style={{
								width: 'auto',
							}} />
						</div>
					</BreizhinePageCard>
					<div className='h-8' />

					<BigCTA />
					<div className='h-8' />
				</div>
			</main>
			<Footer />
		</>
	);
}
