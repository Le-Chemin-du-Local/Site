import {ChangeEvent, FocusEventHandler, MouseEvent, Fragment, useState} from 'react';

interface AddressInputProps {
	inputName: string;
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
	const {inputName, inputType, placeholder, label, isRequired, onFocus} = options;

	const [filteredSuggestions, setFilteredSuggestions] = useState(['']);
	const [userInput, setUserInput] = useState('');
	const [showSuggestions, setShowSuggestions] = useState(false);

	const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const input = event.currentTarget.value as string;

		// TEMPS
		const suggestions = ['Paris', 'Penmarch', 'Patata1', 'Patata1', 'Patata1', 'Patata1', 'Patata1', 'Patata1', 'Patata1', 'Patata1', 'Patata1', 'Rennes', 'Nantes'];

		const filteredSuggestionsVar = suggestions.filter((suggestion) => suggestion.toLowerCase().indexOf(input.toLowerCase()) > -1);
		setFilteredSuggestions(filteredSuggestionsVar);
		setShowSuggestions(true);
		setUserInput(input);
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
			<div className='relative'>
				<input
					id={inputName}
					name={inputName}
					onFocus={onFocus}
					onChange={onChange}
					type={inputType}
					placeholder={placeholder}
					value={userInput}
					required={isRequired}
					className='border border-gray-300 border-solid outline-none p-2 rounded-lg w-full'
				/>
				{(showSuggestions && userInput.length > 0) && (
					<>
						{(filteredSuggestions.length > 0) ? (
							<ul className='bg-white border border-[#999] max-h-40 overflow-y-auto absolute top-[40px] w-full'>
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
							<div>
								<p>Il n&apos;y a pas d&apos;adresses suggérées</p>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}
