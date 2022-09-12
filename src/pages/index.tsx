import ElevatedButton from '../components/atoms/buttons/elevated_button';
import OutlinedButton from '../components/atoms/buttons/outlined_button';
import Layout from '../components/organisms/layout';

/**
 * La page d'accueil du Chemin du Local
 * @return {JSX.Element} Le code de la page
 */
export default function Main(): JSX.Element {
	return (
		<Layout title='Accueil'>
			<div className='w-full px-16 items-center'>
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
			</div>
		</Layout>
	);
}
