import {gql} from '@apollo/client';
import {KeyboardArrowLeft, KeyboardArrowRight} from '@mui/icons-material';
import {format, isAfter} from 'date-fns';
import {useEffect, useState} from 'react';
import client from '../../../../apollo/client';
import {BasketCommerce} from '../../../../interfaces/basket';
import {isBusinessHoursEmpty, Commerce, isOpenOnBusinessHours} from '../../../../interfaces/commerce';
import ElevatedButton from '../../../atoms/buttons/elevated_button';
import BasketScheduleTimesList from '../../../molecule/basket/schedules/basket_schedule_times_list';

interface BasketCommerceScheduleProps {
	basketCommerce: BasketCommerce;
	selectedIndex: number;
	onScheduleChoosed: (index: number, date?: Date) => void;
}

/**
 * Le bloc de choix de l'horaire du click and collect
 * @param {BasketCommerceScheduleProps} options Les infos du commerce
 * @return {JSX.Element} Le bloc de choix de l'horaire du click and collect
 */
export default function BasketCommerceSchedule(options: BasketCommerceScheduleProps): JSX.Element {
	const {basketCommerce, selectedIndex, onScheduleChoosed} = options;

	const [commerceData, setCommerceData] = useState(undefined);
	const [currentDate, setCurrentDate] = useState(new Date());
	const [firstDate, setFirstDate] = useState(new Date());

	useEffect(() => {
		// On a besoin de récupérer les informations du commerce
		const fetchCommerce = async () => {
			const {data} = await client.query({
				query:
				gql`			
					query commerce($id: ID!) {
						commerce(id: $id) {
							id
							name
							clickAndCollectHours {
								monday {
									opening
									closing
								}
								tuesday {
									opening
									closing
								}
								wednesday {
									opening
									closing
								}
								thursday {
									opening
									closing
								}
								friday {
									opening
									closing
								}
								saturday {
									opening
									closing
								}
								sunday {
									opening
									closing
								}
							}
						}
					}
				`,
				variables: {
					id: basketCommerce.commerceID,
				},
			});

			if (data != undefined) {
				setCommerceData(data.commerce);

				const commerce = data.commerce as Commerce;

				if (commerce.clickAndCollectHours != undefined && !isBusinessHoursEmpty(commerce.clickAndCollectHours)) {
					let isOpen = false;
					const day = new Date();
					do {
						day.setDate(day.getDate() + 1);

						isOpen = isOpenOnBusinessHours(day, commerce.clickAndCollectHours);
					} while (!isOpen);

					setCurrentDate(day);
					setFirstDate(day);
				}
			}
		};

		fetchCommerce();
	}, [basketCommerce]);

	if (commerceData == undefined) {
		return (
			<p>Chargement...</p>
		);
	}

	/**
	 * Permet de se positionner sur le jour suivant
	 */
	function goOnNextDay() {
		const nextOpenedDay = new Date(currentDate.getTime());
		let isOpen = false;

		do {
			nextOpenedDay.setDate(nextOpenedDay.getDate() + 1);
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			isOpen = isOpenOnBusinessHours(nextOpenedDay, commerce.clickAndCollectHours!);
		} while (!isOpen);

		setCurrentDate(nextOpenedDay);
		onScheduleChoosed(-1, undefined);
	}

	/**
	 * Permet de se positionner sur le jour précédent
	 */
	function goOnPreviousDay() {
		const previousOpenedDay = new Date(currentDate.getTime());
		let isOpen = false;

		do {
			previousOpenedDay.setDate(previousOpenedDay.getDate() - 1);
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			isOpen = isOpenOnBusinessHours(previousOpenedDay, commerce.clickAndCollectHours!);
		} while (!isOpen);

		setCurrentDate(previousOpenedDay);
		onScheduleChoosed(-1, undefined);
	}

	const commerce = commerceData as Commerce;


	if (commerce.clickAndCollectHours == undefined || isBusinessHoursEmpty(commerce.clickAndCollectHours)) {
		return (
			<p>Ce commerce ne propose pas d&apos;horraires de Click and Collect...</p>
		);
	}

	let clickAndCollectHours = commerce.clickAndCollectHours.monday;

	switch (currentDate.getDay()) {
	case 0:
		clickAndCollectHours = commerce.clickAndCollectHours.sunday;
		break;
	case 1:
		clickAndCollectHours = commerce.clickAndCollectHours.monday;
		break;
	case 2:
		clickAndCollectHours = commerce.clickAndCollectHours.tuesday;
		break;
	case 3:
		clickAndCollectHours = commerce.clickAndCollectHours.wednesday;
		break;
	case 4:
		clickAndCollectHours = commerce.clickAndCollectHours.thursday;
		break;
	case 5:
		clickAndCollectHours = commerce.clickAndCollectHours.friday;
		break;
	case 6:
		clickAndCollectHours = commerce.clickAndCollectHours.saturday;
		break;
	default:
		break;
	}

	return (
		<div>
			<h1 className='text-xl text-center'>Choix du créneau de retrait pour <strong>{commerce.name}</strong></h1>
			<div className='flex justify-between'>
				<div className='h-10 flex'>
					<button
						className={
							`w-10 h-10 flex items-center justify-center border border-gray-300 ${
								isAfter(currentDate, firstDate) ? 'bg-white' : 'pointer-events-none bg-light-grey-2'
							}`
						}
						onClick={goOnPreviousDay}
					><KeyboardArrowLeft/></button>
					<button
						className='w-10 h-10 flex items-center justify-center border border-gray-300 bg-white'
						onClick={goOnNextDay}
					><KeyboardArrowRight/></button>
				</div>
				<ElevatedButton
					color='secondary'
					onClick={() => {
						console.log('Show Date picker');
					}}
					label={format(currentDate, 'dd/MM/yyyy')} />
			</div>
			<BasketScheduleTimesList
				clickAndCollectHours={clickAndCollectHours}
				selectedIndex={selectedIndex}
				onDateSelected={onScheduleChoosed}
				day={currentDate}
			/>
		</div>
	);
}
