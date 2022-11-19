import {Facebook, Instagram, Twitter} from '@mui/icons-material';
import AppStoreButton from '../atoms/buttons/stores/appstore_button';
import PlayStoreButton from '../atoms/buttons/stores/playstore_button';

/**
 * Le footer du site
 * @return {JSX.Element} Le footer du site
 */
export default function Footer(): JSX.Element {
	return (
		<div className="bg-dark-grey text-white flex flex-col justify-between w-full px-8 lg:px-16 pt-16 pb-4">
			<div className='flex flex-col lg:flex-row justify-between'>
				{/* Le Chemin du Local */}
				<div className='text-center'>
					<h2 className='text-primary-color text-2xl uppercase'>Le Chemin du Local</h2>
					<a className='block my-1' href='/commerces'>Découvrir le monde de Breizhine l’Hermine</a>
				</div>

				{/* A Propos */}
				<div className='text-center'>
					<h2 className='text-primary-color text-2xl uppercase'>à propos</h2>
					<div className='h-2' />
					<a className='block my-2' href='/commerces'>Qui sommes nous ?</a>
					<a className='block my-2' href='/commerces'>Devenir commerçant</a>
					<a className='block my-2' href='/contact'>Nous contacter</a>
				</div>

				<div className='text-center'>
					<h2 className='text-primary-color text-2xl uppercase'>Mentions légales</h2>
					<div className='h-2' />
					<a className='block my-2' href='/cgu'>Conditions Générales d&apos;Utilisation</a>
					<a className='block my-2' href='/cgv'>Conditions Générales de Vente</a>
					<a className='block my-2' href='/confidentialite'>Politique de confidentialité</a>
				</div>
			</div>
			<div className='h-6' />

			<div className='w-full flex items-center justify-center'>
				<PlayStoreButton />
				<div className='w-4' />
				<AppStoreButton />
			</div>
			<div className='h-6' />

			<div className='w-full flex flex-col items-center justify-center text-center text-primary-color'>
				<h2 className='text-2xl uppercase'>Suivez nous</h2>
				<div className='h-2' />
				<div className='w-full flex items-center justify-center'>
					<a className='px-2' href="https://facebook.com" target="_blank" rel="noreferrer">
						<Facebook className='w-10 h-10' />
					</a>
					<a className='px-2' href="https://twitter.com" target="_blank" rel="noreferrer">
						<Twitter className='w-10 h-10' />
					</a>
					<a className='px-2' href="https://instagram.com" target="_blank" rel="noreferrer">
						<Instagram className='w-10 h-10' />
					</a>
				</div>
			</div>
			<div className='h-8' />

			<div className='w-full flex flex-col items-center justify-center text-center'>
				<p>&copy; Le Chemin du Local 2022</p>
				<div className='h-4' />
				<p className='text-sm max-w-[475px]'>
					Pour votre santé, mangez au moins cinq fruits et légumes par jour, plus d’infos sur www.mangerbouger.fr
					L&apos;abus d’alcool est dangereux pour la santé. À consommer avec modération
				</p>
			</div>
		</div>
	);
}
