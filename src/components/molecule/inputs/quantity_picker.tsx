interface QuantityPickerProps {
	alignment?: string;
    quantity: number;
	minimumQuantity?: number;
	maximumQuantity?: number;
	onPlus: () => void;
	onLess: () => void;
}

/**
 * Un selecteur qui permet d'augmenter ou diminuer une quantité
 * @param {QuantityPickerProps} options Les infos du sélécteur
 * @return {JSX.Element} Le selecteur
 */
export default function QuantityPicker(options: QuantityPickerProps): JSX.Element {
	const {alignment, quantity, minimumQuantity, maximumQuantity, onPlus, onLess} = options;

	return (
		<div className={'flex flex-row items-center ' + alignment}>
			<button
				className={(quantity > (minimumQuantity ?? 1) ? 'bg-secondary-color' : 'bg-[#aeaeae]') + ' rounded-full h-6 w-6 text-center text-white p-0 m-0'}
				onClick={() => {
					if (quantity > (minimumQuantity ?? 1)) {
						onLess();
					}
				}}
			>
				-
			</button>

			<div className="w-2"/>
			<p>{quantity}</p>
			<div className="w-2"/>

			<button
				className={(quantity < (maximumQuantity ?? 10000) ?
					'bg-secondary-color' :
					'bg-[#aeaeae]') +
					' rounded-full h-6 w-6 text-center text-white p-0 m-0'}
				onClick={() => {
					if (quantity < (maximumQuantity ?? 10000)) {
						onPlus();
					}
				}}
			>
				+
			</button>
		</div>
	);
}
