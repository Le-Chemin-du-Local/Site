import {BusinessHours} from '../../../interfaces/commerce';
import DayUnit from './day_unit';

interface BusinessHoursCardProps {
	businessHours: BusinessHours;
}

/**
 * Les horaires du commerce
 * @param {BusinessHoursCardProps} options Les horaires du commerce
 * @return {JSX.Element} Les horaires du commerce
 */
export default function BusinessHoursCard(options: BusinessHoursCardProps): JSX.Element {
	const {businessHours} = options;

	return (
		<div>
			<DayUnit label="Lundi" day={businessHours.monday}/>
			<DayUnit label="Mardi" day={businessHours.tuesday}/>
			<DayUnit label="Mercredi" day={businessHours.wednesday}/>
			<DayUnit label="Jeudi" day={businessHours.thursday}/>
			<DayUnit label="Vendredi" day={businessHours.friday}/>
			<DayUnit label="Samedi" day={businessHours.saturday}/>
			<DayUnit label="Dimanche" day={businessHours.sunday}/>
		</div>
	);
}

