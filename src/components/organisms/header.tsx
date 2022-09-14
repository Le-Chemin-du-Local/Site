import Router from 'next/router';
import {useEffect, useState} from 'react';
import {MenuSVG} from '../../assets/svg';
import ElevatedButton from '../atoms/buttons/elevated_button';
import Aside from './aside';
import useUser from '../../helpers/useUser';
import {User} from '../../interfaces/user';
import clientWithHeader from '../../apollo/client_with_header';
import {gql} from '@apollo/client';

interface HeaderProps {
    title? : string;
}

/**
 * Le Header des pages du Chemin du Local
 * @param {HeaderProps} options Les informations à mettre dans le header
 * @return {JSX.Element} Un header
 */
export default function Header(options: HeaderProps): JSX.Element {
	const {title} = options;

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
		<header className='w-full p-2 bg-white shadow-md flex justify-between items-center z-50 fixed top-0 h-16'>
			<div className='flex items-center'>
				<ElevatedButton
					label="Menu"
					icon={<MenuSVG />}
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					onClick={(_) => setAsideOpen(true)}
				/>
				{isAsideOpened && (
					<Aside
						isOpen={isAsideOpened}
						setOpen={setAsideOpen}
					/>
				)}
				<p className='ml-4'>{title}</p>
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
