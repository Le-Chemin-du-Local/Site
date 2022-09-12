import {useState} from 'react';
import {MenuSVG} from '../../assets/svg';
import ElevatedButton from '../atoms/buttons/elevated_button';
import Aside from './aside';

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
		</header>
	);
}
