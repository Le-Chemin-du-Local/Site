import Card from '../../atoms/card';
import PopUp from '../../atoms/popup';
import LoginForm from '../forms/login_form';

interface LoginPopUpProps {
	onSuccess?: () => void;
}

/**
 * Le popup de connexion
 * @param {LoginPopUpProps} options Les infos du popup de connexion
 * @return {JSX.Element} Le popup de connexion
 */
export default function LoginPopUp(options: LoginPopUpProps): JSX.Element {
	const {onSuccess} = options;

	return (
		<PopUp>
			<Card className='flex flex-col lg:p-8'>
				<p className='text-2xl'>Connexion</p>
				<LoginForm
					callbackSuccess={onSuccess}
					redirect='' />
			</Card>
		</PopUp>
	);
}
