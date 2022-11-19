import {ChangeEvent, FocusEventHandler, MouseEvent, Fragment, useState, FormEvent} from 'react';
import {BACKEND_URL} from '../../../constants/config';
import {v4 as uuidv4} from 'uuid';
import Image from 'next/image';
import {Search} from '@mui/icons-material';
import Router from 'next/router';

interface AddressInputProps {
	inputName: string;
	initialValue?: string;
	inputType?: string;
	placeholder?: string;
	label?: string;
	isRequired?: boolean;
	onFocus?: FocusEventHandler<HTMLInputElement>
}

/**
 * Le champ pour rentrer une adresse
 * @param {AddressInputProps} options Les infos du champs
 * @return {JSX.Element} Le champ pour rentrer une adresse
 */
export default function AddressInput(options: AddressInputProps) {
	const {inputName, initialValue, inputType, placeholder, label, isRequired, onFocus} = options;

	const [filteredSuggestions, setFilteredSuggestions] = useState(['']);
	const [userInput, setUserInput] = useState(initialValue ?? '');
	const [showSuggestions, setShowSuggestions] = useState(false);

	const [sessiontoken, setSessiontoken] = useState('');

	const onSearchForCommerce = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		Router.push(`/commerces/page/1?location=${encodeURIComponent(event.currentTarget.city.value)}`);
	};

	const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const input = event.currentTarget.value as string;
		setUserInput(input);

		const sessionTokenString = sessiontoken.length > 0 ? `&sessiontoken=${sessiontoken}` : '';

		const autocompleteResponse = await fetch(`${BACKEND_URL}/maps/autocomplete`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				'input': encodeURIComponent(input),
				'sessiontoken': sessionTokenString,
			}),
		});

		console.log('Hello World !');
		console.log(sessiontoken);

		if (autocompleteResponse.ok) {
			const responseData = await autocompleteResponse.json();

			console.log(responseData);

			const suggestions = [];
			if (responseData.status == 'OK') {
				for (let index = 0; index < responseData.predictions.length; index++) {
					const prediction = responseData.predictions[index];

					suggestions.push(prediction.description);
				}
			}

			setFilteredSuggestions(suggestions);
			setShowSuggestions(true);
		}
	};

	const onClick = (event: MouseEvent<HTMLLIElement, globalThis.MouseEvent>) => {
		setFilteredSuggestions([]);
		setShowSuggestions(false);
		setUserInput(event.currentTarget.innerText);
	};

	return (
		<div className='flex flex-col my-2 w-full'>
			{label &&
				<label className='text-dark-grey' htmlFor={inputName}>{label}</label>}
			<form onSubmit={onSearchForCommerce}>
				<div className='
					relative bg-white border border-gray-300 border-solid outline-none p-2 rounded-full w-full flex flex-row
					focus:border-2 focus:border-primary-color
				'>
					<Image src="/images/map_pointer.png" width={24} height={24} alt="Pointeur location" />
					<div className='w-4' />

					<input
						id={inputName}
						name={inputName}
						autoComplete="off"
						onFocus={(event) => {
							setSessiontoken(uuidv4());
							if (onFocus != undefined) {
								onFocus(event);
							}
						}}
						onChange={onChange}
						type={inputType}
						placeholder={placeholder}
						value={userInput}
						required={isRequired}
						className="font-light w-full border-none focus:border-none outline-0 focus:outline-0"
					/>

					<Search className='text-primary-color w-[24px] h-[24px]' />

					{(showSuggestions && userInput.length > 0) && (
						<>
							{(filteredSuggestions.length > 0) ? (
								<ul className='z-10 bg-white border border-[#999] max-h-40 overflow-y-auto absolute top-[40px] w-full'>
									{filteredSuggestions.map((suggestion) => {
										return (
											<li
												key={suggestion}
												className='p-2 cursor-pointer hover:bg-secondary-color hover:text-white'
												onClick={onClick}
											>{suggestion}</li>
										);
									})}
								</ul>
							) : (
								<div className='z-10 bg-white border border-[#999] max-h-40 overflow-y-auto absolute top-[40px] w-full'>
									<p className='p-2'>Votre adresse n&apos;a pas été trouvée...</p>
								</div>
							)}
						</>
					)}
				</div>
			</form>
		</div>
	);
}
