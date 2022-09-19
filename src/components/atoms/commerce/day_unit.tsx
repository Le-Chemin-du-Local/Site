import {Schedule} from '../../../interfaces/commerce';

interface DayUnitProps{
	label : string,
	day : Array<Schedule>
}

/**
 * Retourne les horaire d'une journée
 * @param {DayUnitProps} options Les horaires à afficher
 * @return {JSX.Element} Les horaires de la journée sous un format humain
 */
export default function DayUnit(options : DayUnitProps): JSX.Element {
	const {label, day} = options;
	let text = '';

	if (day && day.length) {
		text = day.map((e) => e.opening + ' - ' + e.closing).join(' . ');
	} else {
		text = 'Fermé';
	}

	return (
		<div className="grid grid-cols-[150px_1fr]">
			<span className="font-semibold">{label}</span>
			<span>{text}</span>
		</div>
	);
}
