import {ReactNode} from 'react';
import Card from '../../atoms/card';

interface CategoryCardProps {
	icon: ReactNode
	title: string
}

/**
 * La carte des catégorie de produits
 * @param {CategoryCardProps} options Les infos sur la catégorie
 * @return {JSX.Element} La carte correspondant à la catégorie
 */
export default function CategoryCard(options: CategoryCardProps): JSX.Element {
	const {icon, title} = options;

	return (
		<Card className='max-w-[205px] p-0'>
			<div className='bg-secondary-color-lightened h-[140px] px-4 py-6'>
				<div className='h-full relative fill-secondary-color'>{icon}</div>
			</div>
			<p className='w-full pt-2 pb-8 text-secondary-color text-center'>
				{title}
			</p>
		</Card>
	);
}
