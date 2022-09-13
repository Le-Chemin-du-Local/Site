import Image from 'next/image';
import Card from '../components/atoms/card';
import LoginForm from '../components/organisms/forms/login_form';
import Layout from '../components/organisms/layout';

/**
 * Page de connexion
 * @return {JSX.Element} Le code de la page de connexion
 */
export default function Login(): JSX.Element {
	return (
		<Layout title='Connexion'>
			<Image className='z-10' src='/images/hermine.png' alt="Image d'une hermine" width={131} height={104} />
			<Card className='absolute top-[166px] pt-5 w-full max-w-[400px]'>
				<LoginForm redirect='/' />
			</Card>
		</Layout>
	);
}
