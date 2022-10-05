import {gql} from '@apollo/client';
import Image from 'next/image';
import Router from 'next/router';
import {useEffect, useState} from 'react';
import clientWithHeader from '../../apollo/client_with_header';
import {MenuSVG} from '../../assets/svg';
import useUser from '../../helpers/useUser';
import {User} from '../../interfaces/user';
import ElevatedButton from '../atoms/buttons/elevated_button';
import Aside from './aside';

/**
 * Le menu de la page d'accueil
 * @return {JSX.Element} Le menu de la page d'accueil
 */
export default function HomeHeader(): JSX.Element {
	const [isAsideOpened, setAsideOpen] = useState(false);
	const [user, setUser] = useState({} as User);

	const {login, mutateLogin} = useUser();

	// On a besoin de récupérer l'utilisateur si il est connecté
	useEffect(() => {
		/**
		 * Permet de récupérer les infos de l'utilisateur
		 */
		async function getUser() {
			const {data} = await clientWithHeader.query({
				query: gql`
					query getUser {
						user {
							id
							email
							firstName
							lastName
						}
					}
				`,
				context: {accessToken: login.jwt},
			});

			setUser(data.user);
		}

		if (login && login.jwt) {
			getUser();
		}
	}, [login]);

	return (
		<header className='w-full p-2 px-8 flex justify-between items-center z-50 fixed top-0 h-24'>
			<div className='flex items-center'>
				<button
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					onClick={(_) => setAsideOpen(true)}
				><div className='w-6 h-6'><MenuSVG /></div></button>
				{isAsideOpened && (
					<Aside
						isOpen={isAsideOpened}
						setOpen={setAsideOpen}
					/>
				)}
				<div className='relative flex justify-center ml-6'>
					<Image src="/logo.png" alt="Le logo du Chemin du Local" height={77} width={173} />
				</div>
			</div>
			<div>
				{login && login.jwt ? (
					<>
						<span className='mr-3'>{user.firstName}</span>
						<ElevatedButton
							label='Se déconnecter'
							onClick={async () => {
								mutateLogin(
									await fetch('/api/logout', {
										method: 'POST',
									})
								);
							}} />
					</>
				) : (
					<ElevatedButton
						label='Se connecter'
						color='secondary'
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						onClick={(_) => {
							Router.push('/login');
						}} />
				)}
			</div>
		</header>
	);
}
