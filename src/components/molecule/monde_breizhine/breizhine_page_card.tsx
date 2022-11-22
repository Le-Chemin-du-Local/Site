import {ReactNode} from 'react';

interface BreizhinePageCardProps {
    icon: ReactNode,
	title: string,
	description: string,
	children?: ReactNode
}

/**
 * Les carte de la page du monde de Breizhine
 * @param {BreizhinePageCardProps} options Les informations à afficher sur la carte
 * @return {JSX.Element} Une carte sur la page du monde de Breizhine
 */
export default function BreizhinePageCard(options: BreizhinePageCardProps): JSX.Element {
	const {icon, title, description, children} = options;
	return (
		<div className='bg-white border border-light-grey-2 rounded-xl overflow-hidden'>
			{/* Le titre et la description */}
			<div className='w-full flex flex-row items-center px-4 md:px-8 py-8'>
				<div className='h-16 w-16 flex justify-center items-center'>{icon}</div>
				<div className='w-full flex flex-col justify-center ml-4'>
					<h2 className='text-2xl font-bold'>{title}</h2>
					<p className='whitespace-pre-line'>{description}</p>
				</div>
			</div>
			<div>
				{children}
			</div>
		</div>
	);
}
