import ElevatedButton from '../components/atoms/buttons/elevated_button';
import OutlinedButton from '../components/atoms/buttons/outlined_button';

/**
 * La page d'accueil du Chemin du Local
 * @return {JSX.Element} Le code de la page
 */
export default function Main() {
	return (
		<div>
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
	);
}
