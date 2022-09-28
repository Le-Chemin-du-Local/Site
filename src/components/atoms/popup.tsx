import {ReactNode} from 'react';

interface PopUpProps {
	children: ReactNode
}

/**
 * Affiche un popup
 * @param {PopUpProps} options Le contenu du popup
 * @return {JSX.Element} Le popup
 */
export default function PopUp(options: PopUpProps): JSX.Element {
	const {children} = options;

	return (
		<div
			className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex
						items-center justify-center z-50'
		>
			{children}
		</div>
	);
}
