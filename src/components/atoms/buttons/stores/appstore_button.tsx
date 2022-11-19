import {Apple} from '@mui/icons-material';

/**
 * Le bouton qui redirige sur l'AppStore
 * @return {JSX.Element} Le bouton qui redirige sur l'AppStore
 */
export default function AppStoreButton(): JSX.Element {
	return (
		<a
			className="flex flex-row items-center bg-primary-color rounded-full p-2 text-white"
			href="https://apple.com"
			target="_blank" rel="noreferrer"
		>
			<Apple className="w-12 h-12" />
			<div className="w-2" />
			<p>Télécharger<br/>dans l’App Store</p>
		</a>
	);
}
