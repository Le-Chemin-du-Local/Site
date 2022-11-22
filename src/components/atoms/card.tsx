import {ReactNode} from 'react';

interface CardProps {
	children: ReactNode
	className?: string;
}

/**
 * Le composant pour les cartes
 * @param {CardProps} options Les paramètres des cartes
 * @return {JSX.Element} La carte
 */
export default function Card(options: CardProps): JSX.Element {
	const {children, className} = options;

	return (
		<div className={'p-3 bg-white rounded-xl h-fit overflow-hidden shadow-[0px_4px_20px_5px_rgba(0,0,0,0.05)] ' + className}>
			{children}
		</div>
	);
}
