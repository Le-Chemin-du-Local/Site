import {Google} from '@mui/icons-material';

/**
 * Le bouton qui redirige sur le Play Store
 * @return {JSX.Element} Le bouton qui redirige sur le Play Store
 */
export default function PlayStoreButton(): JSX.Element {
	return (
		<a
			className="flex flex-row items-center bg-primary-color rounded-full p-2 text-white"
			href="https://play.google.com"
			target="_blank" rel="noreferrer"
		>
			<Google className="w-12 h-12" />
			<div className="w-2" />
			<p>Télécharger<br/>dans le Play Store</p>
		</a>
	);
}
