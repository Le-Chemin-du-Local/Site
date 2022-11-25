import {Facebook, Instagram, Twitter} from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import AppStoreButton from '../atoms/buttons/stores/appstore_button';
import PlayStoreButton from '../atoms/buttons/stores/playstore_button';

/**
 * Le footer du site
 * @return {JSX.Element} Le footer du site
 */
export default function Footer(): JSX.Element {
	return (
		<div className="bg-dark-grey text-white flex justify-center w-full px-8 lg:px-16 pt-16 pb-4">
			<div className='max-w-max-content w-full flex flex-col justify-between'>
				<div className='flex flex-col lg:flex-row justify-between'>
					{/* Les icones */}
					<div className='py-2 max-w-[260px]'>
						<Image
							src="/images/logo_white.png"
							alt="Logo du Chemin du Local"
							width="882" height="354"
							style={{
								width: '75%',
								height: 'auto',
							}}/>
						<div className='h-4' />

						<div className='flex flex-row md:flex-col'>
							<PlayStoreButton />
							<div className='h-4 w-4' />
							<AppStoreButton />
						</div>
					</div>

					{/* Le Chemin du Local */}
					<div className='py-2'>
						<h2 className='text-primary-color text-2xl font-bold uppercase'>Le Chemin du Local</h2>
						<div className='h-2' />
						<Link className='block my-1' href='/le-monde-de-breizhine-l-hermine'>
							Découvrir le monde de Breizhine l’Hermine
						</Link>
						<a className='block my-1' href="#">Notre blog 100% Circuit Court</a>
					</div>

					{/* A Propos */}
					<div className='py-2'>
						<h2 className='text-primary-color text-2xl font-bold uppercase'>à propos</h2>
						<div className='h-2' />
						<Link className='block my-1' href='/qui-sommes-nous'>Qui sommes nous ?</Link>
						<Link className='block my-1' href='/devenir-commercant'>Devenir commerçant</Link>
						<a className='block my-1' href='mailto:contact@chemin-du-local.bzh'>Nous contacter</a>
					</div>

					<div className='py-2'>
						<h2 className='text-primary-color text-2xl font-bold uppercase'>Mentions légales</h2>
						<div className='h-2' />
						<a className='block my-2' href='/cgu'>Conditions Générales d&apos;Utilisation</a>
						<a className='block my-2' href='/cgv'>Conditions Générales de Vente</a>
						<a className='block my-2' href='/confidentialite'>Politique de confidentialité</a>
					</div>
				</div>

				<div className='h-8' />
				<div className='w-full h-1 bg-white' />
				<div className='h-8' />

				<div className='flex flex-col md:flex-row'>
					<div className='grow flex flex-col items-start justify-center'>
						<p className='text-xl'>&copy; Le Chemin du Local 2022</p>
						<div className='h-2' />
						<p className='text-sm max-w-[775px]'>
							Pour votre santé, mangez au moins cinq fruits et légumes par jour, plus d’infos sur www.mangerbouger.fr
							L&apos;abus d’alcool est dangereux pour la santé. À consommer avec modération
						</p>
					</div>

					<div className='h-2 md:hidden' />

					<div className='flex items-center'>
						<h2 className='text-xl pr-2'>Suivez nous</h2>
						<a className='px-2 text-primary-color' href="https://facebook.com" target="_blank" rel="noreferrer">
							<Facebook className='w-10 h-10' />
						</a>
						<a className='px-2 text-primary-color' href="https://twitter.com" target="_blank" rel="noreferrer">
							<Twitter className='w-10 h-10' />
						</a>
						<a className='pl-2 text-primary-color' href="https://instagram.com" target="_blank" rel="noreferrer">
							<Instagram className='w-10 h-10' />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
