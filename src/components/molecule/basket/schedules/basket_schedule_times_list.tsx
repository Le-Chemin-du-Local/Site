import {format, isBefore} from 'date-fns';
import {Schedule} from '../../../../interfaces/commerce';

interface BasketScheduleTimesListProps {
	onDateSelected: (index: number, date: Date) => void
	selectedIndex: number
	clickAndCollectHours: Array<Schedule>
	day: Date
}

/**
 * La liste des horaires pour la journée donnée
 * @param {BasketScheduleTimesListProps} options Les horaires
 * @return {JSX.Element} La liste des horaires pour la journée donnée
 */
export default function BasketScheduleTimesList(options: BasketScheduleTimesListProps): JSX.Element {
	const {onDateSelected, selectedIndex, clickAndCollectHours, day} = options;

	const halfHours = [] as Array<Date>;

	clickAndCollectHours.forEach((schedule) => {
		halfHours.push(...getHalfHours(schedule, day));
	});

	const halfHoursSliced = halfHours.slice(0, -2);
	return (
		<div className='h-full w-full my-4'>
			{halfHoursSliced.map((halfHour, index) => (
				<button
					key={halfHour.toString()}
					onClick={() => {
						onDateSelected(index, halfHour);
					}}
					className={`flex justify-between w-full px-4 py-2 border border-gray-300 ${index == selectedIndex ?
						'bg-secondary-color text-white' :
						'bg-white'}`}
				>
					<p className='font-bold'>{
						`${format(halfHour, 'HH:mm')}-${format(halfHours[index + 1], 'HH:mm')}`
					}</p>
					{index == selectedIndex ? (
						<p className='font-bold'>Séléctionné</p>
					) : (
						<p className='text-secondary-color'>Choisir ce créneau</p>
					)
					}
				</button>
			))

			}
		</div>
	);
}

/**
 * Retourne des dates découpé par demi-heures
 * @param {Schedule} schedule Les horaires à convertire en demi-heures
 * @param {Date} day La date qu'on regarde
 * @return {Array<Date>} Les demi-heures
 */
function getHalfHours(schedule: Schedule, day: Date): Array<Date> {
	const dayString = format(day, 'yyyy-MM-dd');

	const openingDate = new Date(Date.parse(`${dayString} ${schedule.opening}:00`));
	const closingDate = new Date(Date.parse(`${dayString} ${schedule.closing}:00`));

	const result = [] as Array<Date>;

	while (isBefore((result.length > 0 ? result[result.length - 1] : openingDate), closingDate)) {
		if (result.length < 1) {
			result.push(openingDate);
		} else {
			const lastDate = result[result.length - 1];
			result.push(new Date(lastDate.getTime() + 30*60000));
		}

		const lastDate = result[result.length - 1];
		result.push(new Date(lastDate.getTime() + 30*60000));
	}

	return result;
}
