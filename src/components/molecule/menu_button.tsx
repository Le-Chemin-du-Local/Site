import {ReactNode} from 'react';

interface MenuButtonProps {
	icon?: ReactNode
	label?: string
	href?: string
}

/**
 * Les boutons du menu
 * @param {MenuButtonProps} options Les info du bouton
 * @return {JSX.Element} Le code du bouton
 */
export default function MenuButton(options: MenuButtonProps): JSX.Element {
	const {icon, label, href} = options;

	return (
		<a
			href={href}
			className="p-2 block hover:text-secondary-color hover:fill-secondary-color"
		>
			<div className='flex items-center'>
				{icon && (
					<div className='h-8 w-8'>
						{options.icon}
					</div>
				)}
				<span className='ml-4 w-full grow'>{label}</span>
			</div>
		</a>
	);
}
