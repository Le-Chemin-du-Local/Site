import {MouseEventHandler, ReactNode} from 'react';
import Loading from '../loading';

interface OutlinedButtonProps {
	icon? : ReactNode
	label : string
	onClick? : MouseEventHandler<HTMLButtonElement>
	isDisabled? : boolean
	isLoading? : boolean
	color? : 'primary' | 'secondary'
	loadingColor? : string
	isSubmitButton? : boolean
}

/**
 * Les boutons avec bordure
 * @param {OutlinedButtonProps} options Les options du bouton
 * @return {JSX.Element} Le bouton
 */
export default function OutlinedButton(options: OutlinedButtonProps): JSX.Element {
	const colors = {
		text: 'text-primary-color',
		icon: 'fill-primary-color',
		border: 'border-primary-color',
	};

	// On doit définir la couleur en fonction du type
	if (!!options.isDisabled) {
		colors.text = 'text-light-grey-3';
		colors.icon = 'fill-light-grey-3';
		colors.border = 'bg-light-grey-2';
	} else {
		switch (options.color) {
		case 'primary':
			colors.text = 'text-primary-color';
			colors.icon = 'fill-primary-color';
			colors.border = 'border-primary-color';
			break;
		case 'secondary':
			colors.text = 'text-white';
			colors.icon = 'fill-white';
			colors.border = 'border-secondary-color';
			break;
		}
	}

	return (
		<button
			type={options.isSubmitButton ? 'submit' : 'button'}
			onClick={options.onClick}
			className={
				'p-2 px-4 rounded-[8px] border ' +
				(!!options.isDisabled && 'cursor-default pointer-events-none') + ' ' +
				(colors.border) + ' border-1 ' + (colors.text)
			}
		>
			{!!options.isLoading ? (
				// Si le bouton affiche un chargement
				<div className='flex items-center justify-center'>
					<Loading
						color='primary-color'
						size={20}
					/>
					<span className='ml-3'>Chargement...</span>
				</div>
			) : (
				// Le contenue normal du bouton
				<div className='flex items-center justify-center'>
					{options.icon && (
						<div className={`h-4 w-4 ${colors.icon}`}>
							{options.icon}
						</div>
					)}
					<span className={options.icon ? 'ml-2' : ''}>{options.label}</span>
				</div>
			)}

		</button>
	);
}
