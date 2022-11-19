import {ArrowForward} from '@mui/icons-material';
import Image from 'next/image';
import ElevatedButton from '../atoms/buttons/elevated_button';
import AppStoreButton from '../atoms/buttons/stores/appstore_button';
import PlayStoreButton from '../atoms/buttons/stores/playstore_button';

/**
 * Un bloc invitant a  devenir commerçant ou télécharger l'application
 * @return {JSX.Element} Un bloc invitant a  devenir commerçant ou télécharger l'application
 */
export default function BigCTA(): JSX.Element {
	return (
		<div className="flex flex-col rounded-xl overflow-hidden">
			{/* Devenir commerçant */}
			<div className="px-8 lg:px-16 bg-hero2 bg-cover bg-center py-[70px]">
				<div className="flex flex-col items-start w-full lg:w-2/3">
					<h2 className="text-white text-4xl font-bold leading-[150%]">
						Vous êtes commerçant en Bretagne ?
						Rejoignez Le Chemin du Local
						en quelques clics !
					</h2>
					<div className='h-4' />
					<ElevatedButton
						label='Je crée ma page gratuitement'
						iconRight={<ArrowForward />}
						href="/commercant/register" />
				</div>
			</div>

			{/* Télécharger l'application */}
			<div className="flex flex-rowitems-end bg-dark-grey p-0 lg:mb-[-168px]">
				<div className="flex flex-col items-start w-full px-8 lg:px-16 py-[70px]">
					<h2 className="text-white text-4xl font-bold leading-[150%]">
						Commandez dès maintenant
						les produits et paniers
						de vos commerçants favoris !
					</h2>
					<div className='h-4' />
					<div className='flex flex-row items-center'>
						<PlayStoreButton />
						<div className='w-4' />
						<AppStoreButton />
					</div>
				</div>
				{/* <div className='translate-y-[-100px]'> */}
				<div className='w-full lg:flex justify-center hidden'>
					<Image
						className='block z-10 translate-y-[-168px]'
						src="/images/mockup.png" alt="Application du Chemin du Local"
						width={445} height={561} />
				</div>
				{/* </div> */}
			</div>
		</div>
	);
}
